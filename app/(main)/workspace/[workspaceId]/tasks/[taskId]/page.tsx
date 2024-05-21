import e, { createClient } from "@/dbschema/edgeql-js";
import { FC } from "react";
import IssueContent from "./_component/issue-content";
import { Member } from "../../members/_components/members/column";

interface PageProps {
  params: { workspaceId: string; taskId: string };
}

const client = createClient();

const Page: FC<PageProps> = async ({ params }) => {
  const task = await e
    .select(e.Task, (task) => ({
      id: true,
      title: true,
      description: true,
      status: true,
      priority: true,
      created: true,
      updated: true,
      duedate: true,
      assigneeId: true,
      filter_single: e.op(task.id, "=", e.uuid(params.taskId)),
      websiteaddresses: {
        id: true,
        url: true,
        description: true,
      },
      taskactivities: {
        id: true,
        message: true,
      },
    }))
    .run(client);
  console.log(task);
  if (!task) {
    return <div>Task not found</div>;
  }
  const members = await e
    .select(e.WorkspaceMember, (workspaceMember) => ({
      id: true,
      githubUsername: true,
      memberRole: true,
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
  return (
    <>
      <div className="mx-5 lg:ml-[15vw] pt-14">
        <IssueContent task={task} members={members as Member[]} />
      </div>
    </>
  );
};

export default Page;
