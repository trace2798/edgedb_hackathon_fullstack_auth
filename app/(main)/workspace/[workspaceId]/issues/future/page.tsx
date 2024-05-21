import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import e, { createClient } from "@/dbschema/edgeql-js";
import { format } from "date-fns";
import { CircleDotDashed } from "lucide-react";
import { Member } from "../../members/_components/members/column";
import AddIssueButton from "../_components/add-issue-button";
import AddTaskButtonFooter from "../_components/add-task-button-footer";
import CommandMenuStatus from "../_components/command-menu-issue";
import CommandMenuPriority from "../_components/command-menu-priority";
import DeleteIssueButton from "../_components/delete-issue-button";

const client = createClient();

const ActivePage = async ({ params }: { params: { workspaceId: string } }) => {
  const members = await e
    .select(e.WorkspaceMember, (workspaceMember) => ({
      id: true,
      name: true,
      email: true,
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
  const issues = await e
    .select(e.Issue, (issue) => ({
      id: true,
      title: true,
      status: true,
      priority: true,
      created: true,
      updated: true,
      filter: e.op(
        e.op(issue.workspaceId, "=", e.uuid(params.workspaceId)),
        "and",
        e.op(issue.status, "=", e.str("future"))
      ),
      order_by: {
        expression: issue.created,
        direction: e.DESC,
      },
    }))
    .run(client);
  console.log(issues);
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
          {issues.length === 0 && (
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
          {issues.map((issue, index) => {
            return (
              <div
                key={index}
                className="px-5 py-2 border border-secondary text-sm flex justify-between dark:bg-zinc-950 items-center dark:hover:bg-zinc-800 hover:cursor-pointer"
              >
                <div className="flex  justify-between items-center">
                  <div className="flex space-x-3 w-18 mr-5">
                    {" "}
                    <DeleteIssueButton issueId={issue.id as string} />
                    <CommandMenuPriority
                      id={issue.id as string}
                      currentPriority={issue.priority as string}
                    />
                    <CommandMenuStatus
                      id={issue.id as string}
                      currentStatus={issue.status as string}
                    />
                  </div>
                  <div className="line-clamp-1">{issue.title}</div>
                </div>

                <div className="lg:flex space-x-3 hidden">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <h1>
                        {format(new Date(issue.created as Date), "MMM dd")}
                      </h1>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-fit dark:bg-zinc-800 text-sm py-1 px-2">
                      Created on:{" "}
                      {format(
                        new Date(issue.created as Date),
                        "MMM dd, yyyy HH:mm"
                      )}
                    </HoverCardContent>
                  </HoverCard>

                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <h1>
                        {format(new Date(issue.updated as Date), "MMM dd")}
                      </h1>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-fit text-sm py-1 px-2">
                      Updated on:{" "}
                      {format(
                        new Date(issue.updated as Date),
                        "MMM dd, yyyy HH:mm"
                      )}
                    </HoverCardContent>
                  </HoverCard>
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
