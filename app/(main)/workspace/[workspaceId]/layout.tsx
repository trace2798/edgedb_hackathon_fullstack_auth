import { CheckStatus } from "@/lib/checkStatus";
import { MobileHeader } from "../../_components/mobile-header";
import { Sidebar } from "../../_components/sidebar";
import DialogNonUser from "./_components/dialog-non-member";

type Props = {
  children: React.ReactNode;
  params: { workspaceId: string };
};

const WorkspaceLayout = async ({ children, params }: Props) => {
  // console.log(params);
  const status = await CheckStatus({ workspaceId: params.workspaceId });
  // console.log(status);
  if (status === "not member") {
    return <DialogNonUser />;
  }
  return (
    <>
      <div className="lg:hidden">
        <MobileHeader  workspaceId={params.workspaceId} />
      </div>
      <Sidebar className="hidden lg:flex" workspaceId={params.workspaceId} />
      <div className="lg:pl-[256px]">{children}</div>
    </>
  );
};

export default WorkspaceLayout;
