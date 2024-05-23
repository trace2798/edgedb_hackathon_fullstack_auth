import e, { createClient } from "@/dbschema/edgeql-js";
import { Member } from "../members/_components/members/column";
import AddIssueButton from "./_components/add-issue-button";
import { IssueList } from "./_components/issue-list";
import { Suspense } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Metadata } from "next";

const client = createClient();

export const metadata: Metadata = {
  title: "Productivus: Tasks",
  description: "Efficiently manage your tasks",
};

const Page = async ({ params }: { params: { workspaceId: string } }) => {
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
  // console.log(members);

  return (
    <>
      <div className="pt-[50px] lg:pt-0 lg:mt-0 dark:bg-[#0f1011] min-h-screen flex-flex-col">
        <div className="px-5 py-2 border border-secondary text-sm flex justify-between items-center">
          {/* <div className="flex items-baseline"> */}
            <div className={buttonVariants({ variant: "ghost", size: "sidebar" })}>All Tasks</div>
          {/* </div> */}
          <AddIssueButton members={members as Member[]} defaultStatus="todo" />
        </div>
        <Suspense fallback={<IssueList.Skeleton />}>
          <IssueList params={params} members={members as Member[]} />
        </Suspense>
      </div>
    </>
  );
};
export default Page;
