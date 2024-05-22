import AddBoardButton from "@/app/(main)/_components/add-board-button";
import e, { createClient } from "@/dbschema/edgeql-js";
import { Suspense } from "react";
import { Member } from "../members/_components/members/column";
import { BoardList } from "./_components/board-list";

const client = createClient();

const page = async ({ params }: { params: { workspaceId: string } }) => {
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

  return (
    <>
      <div>
        <div className="pt-[50px] lg:pt-0 lg:mt-0 dark:bg-[#0f1011] min-h-screen flex-flex-col rounded-2xl">
          <div className="px-5 py-2 border border-secondary text-sm flex justify-between items-center">
            <div>
              <h1>Boards</h1>
            </div>
            <div>
              <AddBoardButton
                // members={members as Member[]}
                // currentWorkspaceId={params.workspaceId}
              />
            </div>
          </div>
          <Suspense fallback={<BoardList.Skeleton />}>
            <BoardList params={params} members={members as Member[]} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default page;
