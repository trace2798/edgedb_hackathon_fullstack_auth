import { Button, buttonVariants } from "@/components/ui/button";
import e, { createClient } from "@/dbschema/edgeql-js";
import { ChevronDown, ChevronRight, ChevronUp } from "lucide-react";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
  params: { workspaceId: string; taskId: string };
};

const client = createClient();
const IssueIdLayout = async ({ children, params }: Props) => {
  console.log(params);
  const workspace = await e
    .select(e.Workspace, (workspace) => ({
      id: true,
      name: true,
      description: true,
      filter_single: e.op(workspace.id, "=", e.uuid(params.workspaceId)),
    }))
    .run(client);
  console.log(workspace);
  const allTasks = await e
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
  console.log(allTasks);
  const task = await e
    .select(e.Task, (task) => ({
      id: true,
      title: true,
      description: true,
      filter_single: e.op(task.id, "=", e.uuid(params.taskId)),
    }))
    .run(client);
  console.log(task);
  const currentTaskIndex = allTasks.findIndex(
    (task) => task.id === params.taskId
  );

  // Calculate the total number of issues
  const totalTasks = allTasks.length;

  const prevTaskId = allTasks[currentTaskIndex - 1]?.id;
  const nextTaskId = allTasks[currentTaskIndex + 1]?.id;
  return (
    <>
      <div className="lg:px-5 py-2 mt-10 lg:mt-0 border border-secondary text-sm flex justify-between dark:bg-zinc-950 items-center ">
        <div className="flex  justify-between items-center">
          <Link href={`/workspace/${params.workspaceId}`}>
            <div
              className={buttonVariants({
                variant: "sidebar",
                size: "sidebar",
                className: "w-fit px-2 text-muted-foreground",
              })}
            >
              {workspace?.name}
            </div>
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            href={`/workspace/${params.workspaceId}/tasks`}
            className={buttonVariants({
              variant: "sidebar",
              size: "sidebar",
              className: "w-fit px-2 text-muted-foreground",
            })}
          >
            <div>Tasks</div>
          </Link>
          <ChevronRight className="h-4 w-4" />
          <div
            className={buttonVariants({
              variant: "sidebar",
              size: "sidebar",
              className: "w-fit px-2 text-indigo-400",
            })}
          >
            {task?.title}
          </div>
        </div>
        <div className="flex flex-col md:flex-row space-x-1 items-center">
          <div
            className={buttonVariants({
              variant: "sidebar",
              size: "sidebar",
              className: "w-fit px-2 text-muted-foreground",
            })}
          >
            <span className="text-sm">{currentTaskIndex + 1}</span>
            &nbsp;/&nbsp;
            <span className="text-sm text-primary">{totalTasks}</span>
          </div>
          <div>
            {prevTaskId ? (
              <Link
                href={`/workspace/${params.workspaceId}/tasks/${prevTaskId}`}
              >
                <Button variant={"sidebar"} size={"sidebar"}>
                  <ChevronUp className="h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <Button disabled variant={"sidebar"} size={"sidebar"}>
                <ChevronUp className="h-4 w-4" />
              </Button>
            )}

            {nextTaskId ? (
              <Link
                href={`/workspace/${params.workspaceId}/tasks/${nextTaskId}`}
              >
                <Button variant={"sidebar"} size={"sidebar"}>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <Button disabled variant={"sidebar"} size={"sidebar"}>
                <ChevronDown className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
      <div>{children}</div>
    </>
  );
};

export default IssueIdLayout;
