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
import { Skeleton } from "@/components/ui/skeleton";
import e, { createClient } from "@/dbschema/edgeql-js";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { Member } from "../../members/_components/members/column";
import AddTaskButtonFooter from "./add-task-button-footer";
import CommandMenuStatus from "./command-menu-issue";
import CommandMenuPriority from "./command-menu-priority";
import DeleteTaskButton from "./delete-issue-button";
import ChangeDueDate from "./change-due-date";
import { LocalDateTime } from "edgedb";
import { buttonVariants } from "@/components/ui/button";

const client = createClient();

export const IssueList = async ({
  params,
  members,
}: {
  params: { workspaceId: string };
  members: Member[];
}) => {
  const tasks = await e
    .select(e.Task, (task) => ({
      id: true,
      title: true,
      status: true,
      priority: true,
      created: true,
      updated: true,
      duedate: true,
      filter: e.op(task.workspaceId, "=", e.uuid(params.workspaceId)),
      order_by: {
        expression: task.created,
        direction: e.DESC,
      },
    }))
    .run(client);
  return (
    <div className="">
      {tasks.length === 0 && (
        <div className="h-screen flex flex-col items-center justify-center ">
          <Card className="bg-secondary max-w-lg">
            <CardHeader className="space-y-5">
              <CardTitle>Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                Tasks are fundamental units of work, each serving a specific
                purpose towards achieving a larger goal. They vary in complexity
                and duration, ranging from simple, short-term actions to
                intricate, long-term projects.
              </p>
              <p>
                Effective task management involves prioritizing, scheduling, and
                tracking progress, which enhances productivity and ensures
                timely completion. Tasks, whether individual or collaborative,
                are the building blocks that drive progress and success in any
                endeavor.
              </p>
            </CardContent>
            <CardFooter>
              {" "}
              <AddTaskButtonFooter
                members={members as Member[]}
                defaultStatus="future"
                title="Add A Task"
              />
            </CardFooter>
          </Card>
        </div>
      )}

      {tasks.map((task, index) => {
        return (
          <>
            <div
              key={index}
              className="px-5 py-2 border border-secondary text-sm flex justify-between dark:bg-zinc-950 items-center dark:hover:bg-zinc-800 hover:cursor-pointer"
            >
              <div className="flex  justify-between items-center">
                <div className="flex space-x-1 mr-5">
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
                <Link href={`tasks/${task.id}`}>
                  <div className="line-clamp-1">{task.title}</div>
                </Link>
              </div>
              <div className="flex space-x-3">
                <div>
                  <ChangeDueDate
                    id={task.id as string}
                    currentDueDate={task.duedate as Date | null}
                  />
                  {/* {task.duedate ? (
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <h1 className="w-[60px] px-1">
                          {format(new Date(task.duedate), "MMM dd")}
                        </h1>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-fit text-sm py-1 px-2">
                        Due on: {format(new Date(task.duedate), "MMM dd, yyyy")}
                      </HoverCardContent>
                    </HoverCard>
                  ) : (
                    <h1 className="w-[60px] px-1"></h1>
                  )} */}
                </div>
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
                          {format(parseISO(task?.updated.toString()), "MMM dd")}
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
          </>
        );
      })}
    </div>
  );
};

IssueList.Skeleton = function SkeletonIssueList() {
  return (
    <div className="grid grid-cols-1  gap-2 mx-3  mt-5">
      <Skeleton className="aspect-video h-10 w-full p-2" />
      <Skeleton className="aspect-video h-10 w-full p-2" />
      <Skeleton className="aspect-video h-10 w-full p-2" />
      <Skeleton className="aspect-video h-10 w-full p-2" />
      <Skeleton className="aspect-video h-10 w-full p-2" />
      <Skeleton className="aspect-video h-10 w-full p-2" />
      <Skeleton className="aspect-video h-10 w-full p-2" />
      <Skeleton className="aspect-video h-10 w-full p-2" />
      <Skeleton className="aspect-video h-10 w-full p-2" />
    </div>
  );
};
