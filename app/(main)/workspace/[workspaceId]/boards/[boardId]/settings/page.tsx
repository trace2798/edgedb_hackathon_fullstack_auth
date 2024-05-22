import { FC } from "react";
import DeleteBoard from "../_components/delete-board";
import { CheckStatus } from "@/lib/checkStatus";

interface PageProps {}

const Page = async ({
  params,
}: {
  params: { workspaceId: string; boardId: string };
}) => {
  const status = await CheckStatus({ workspaceId: params.workspaceId });
  // console.log(status);
  return (
    <>
      <div className="space-y-5 py-24 px-[10vw]  lg:pl-[256px]">
        <DeleteBoard
          workspaceId={params.workspaceId}
          boardId={params.boardId}
          status={status}
        />
      </div>
    </>
  );
};

export default Page;
