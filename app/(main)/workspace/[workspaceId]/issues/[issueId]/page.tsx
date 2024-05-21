import e, { createClient } from "@/dbschema/edgeql-js";
import { FC } from "react";
import IssueContent from "./_component/issue-content";
import { Member } from "../../members/_components/members/column";

interface PageProps {
  params: { workspaceId: string; issueId: string };
}

const client = createClient();

const Page: FC<PageProps> = async ({ params }) => {
  const issue = await e
    .select(e.Issue, (issue) => ({
      id: true,
      title: true,
      description: true,
      status: true,
      priority: true,
      created: true,
      updated: true,
      duedate: true,
      assigneeId: true,
      // urls: true,
      filter_single: e.op(issue.id, "=", e.uuid(params.issueId)),
      websiteaddresses: {
        id: true,
        url: true,
        description: true,
      },
      issueactivity: {
        id: true,
        message: true,
      }
    }))
    .run(client);
  console.log(issue);
  if (!issue) {
    return <div>Issue not found</div>;
  }
  const members = await e
    .select(e.WorkspaceMember, (workspaceMember) => ({
      id: true,
      name: true,
      email: true,
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
        <IssueContent issue={issue} members={members as Member[]} />
      </div>
    </>
  );
};

export default Page;
