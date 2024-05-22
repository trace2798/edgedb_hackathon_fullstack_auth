import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import e, { createClient } from "@/dbschema/edgeql-js";
import { format, parseISO } from "date-fns";
import { CircleDotDashed } from "lucide-react";
import { Member } from "../../members/_components/members/column";
import AddIssueButton from "../_components/add-issue-button";
import AddTaskButtonFooter from "../_components/add-task-button-footer";
import CommandMenuStatus from "../_components/command-menu-issue";
import CommandMenuPriority from "../_components/command-menu-priority";
import DeleteTaskButton from "../_components/delete-issue-button";
import { buttonVariants } from "@/components/ui/button";
import ChangeDueDate from "../_components/change-due-date";

const client = createClient();

const ActivePage = async ({ params }: { params: { workspaceId: string } }) => {
  const members = await e
    .select(e.WorkspaceMember, (workspaceMember) => ({
      id: true,
      githubUsername: true,
      memberRole: true,
      userId: true,
      created: true,
      filter: e.op(
        workspaceMember.workspaceId,
        "=",
        e.uuid(params.workspaceId)
      ),
      order_by: {
        expression: workspaceMember.created,
        direction: e.DESC,
      },
    }))
    .run(client);
  console.log(members);
  const tasks = await e
    .select(e.Task, (task) => ({
      id: true,
      title: true,
      status: true,
      priority: true,
      created: true,
      updated: true,
      duedate: true,
      filter: e.op(
        e.op(task.workspaceId, "=", e.uuid(params.workspaceId)),
        "and",
        e.op(task.status, "=", e.str("future"))
      ),
      order_by: {
        expression: task.created,
        direction: e.DESC,
      },
    }))
    .run(client);
  console.log(tasks);
  return (
    <>
      <div className="pt-[50px] lg:pt-0 lg:mt-0 dark:bg-[#0f1011] min-h-screen flex-flex-col rounded-2xl">
        <div className="px-5 py-2 border border-secondary text-sm flex justify-between">
          <h1>Future Tasks</h1>
          <AddIssueButton
            members={members as Member[]}
            defaultStatus="future"
            title="Future"
          />
        </div>
        <div>
          {tasks.length === 0 && (
            <div className="h-screen flex flex-col items-center justify-center ">
              <Card className="bg-secondary max-w-lg">
                <CardHeader className="space-y-5">
                  <CardTitle className="flex flex-col items-start space-y-3">
                    <CircleDotDashed className="w-9 h-9" />
                  </CardTitle>
                  <CardTitle>Future Tasks</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-muted-foreground">
                  <p>
                    Future tasks are those assignments that are slated for a
                    later date. They represent the work that is on the horizon
                    but has not yet begun.
                  </p>
                  <p>
                    These tasks are crucial for long-term planning and help in
                    maintaining a clear vision of the team’s future workload.
                    They provide a roadmap for what lies ahead and allow you to
                    prepare and plan their time and resources effectively.
                  </p>
                </CardContent>
                <CardFooter>
                  {" "}
                  <AddTaskButtonFooter
                    members={members as Member[]}
                    defaultStatus="future"
                    title="Add Future Task"
                  />
                </CardFooter>
              </Card>
            </div>
          )}
          {tasks.map((task, index) => {
            return (
              <div
                key={index}
                className="px-5 py-2 border border-secondary text-sm flex justify-between dark:bg-zinc-950 items-center dark:hover:bg-zinc-800 hover:cursor-pointer"
              >
                <div className="flex  justify-between items-center">
                  <div className="flex space-x-3 w-18 mr-5">
                    {" "}
                    <DeleteTaskButton taskId={task.id as string} />
                    <CommandMenuPriority
                      id={task.id as string}
                      currentPriority={task.priority as string}
                    />
                    <CommandMenuStatus
                      id={task.id as string}
                      currentStatus={task.status as string}
                    />
                  </div>
                  <div className="line-clamp-1">{task.title}</div>
                </div>

                <div className="space-x-3 hidden lg:flex">
                  <ChangeDueDate
                    id={task.id as string}
                    currentDueDate={task.duedate as Date | null}
                  />
                  {/* <div>
                    {task.duedate ? (
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <h1 className="w-[60px] px-1">
                            {format(
                              parseISO(task.duedate.toString()),
                              "MMM dd"
                            )}
                          </h1>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-fit text-sm py-1 px-2">
                          Due on:{" "}
                          {format(
                            parseISO(task.duedate.toString()),
                            "MMM dd, yyyy"
                          )}
                        </HoverCardContent>
                      </HoverCard>
                    ) : (
                      <h1 className="w-[60px] px-1"></h1>
                    )}
                  </div> */}
                  <div className="hidden lg:flex">
                    {task.updated ? (
                      <HoverCard>
                        <HoverCardTrigger
                          asChild
                          className={buttonVariants({
                            variant: "sidebar",
                            size: "sidebar",
                          })}
                        >
                          <h1 className="w-[60px] px-1">
                            {format(
                              parseISO(task?.updated.toString()),
                              "MMM dd"
                            )}
                          </h1>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-fit text-sm py-1 px-2">
                          Updated on:{" "}
                          {format(
                            parseISO(task?.updated.toString()),
                            "MMM dd, yyyy"
                          )}
                        </HoverCardContent>
                      </HoverCard>
                    ) : (
                      <h1 className="w-[60px] px-1"></h1>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default ActivePage;
