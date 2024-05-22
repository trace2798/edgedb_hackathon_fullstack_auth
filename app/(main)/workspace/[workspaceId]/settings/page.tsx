import { CheckStatus } from "@/lib/checkStatus";
import DeleteWorkspace from "./_components/delete-workspace";
import TransferOwnership, {
  StatusType,
} from "./_components/transfer-ownership";

const SettingsPage = async ({
  params,
}: {
  params: { workspaceId: string };
}) => {
  const status = await CheckStatus({ workspaceId: params.workspaceId });
  console.log(status);
  return (
    <>
      <div className="space-y-5 py-24 px-[10vw]  lg:pl-[256px]">
        <TransferOwnership
          status={status as StatusType}
          workspaceId={params.workspaceId}
        />
        <DeleteWorkspace status={status as StatusType} workspaceId={params.workspaceId} />
      </div>
    </>
  );
};

export default SettingsPage;
