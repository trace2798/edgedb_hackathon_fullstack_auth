import Link from "next/link";
import { MobileSidebar } from "./mobile-sidebar";
import { SelectWorkspaceBox } from "./select-workspace-box";
import e, { createClient } from "@/dbschema/edgeql-js";
// import { auth } from "@/auth";
import { useCurrentUser } from "@/hooks/use-current-user";
import { User } from "@/types";
import { auth } from "@/edgedb";

const client = createClient();
export const MobileHeader = async ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  // const session = await auth();
  const session = auth.getSession();
  const signedIn = await session.isSignedIn();
  // console.log(session);
  const user = (await useCurrentUser()) as User;
  // console.log(user);
  const workspaces = await e
    .select(e.Workspace, (workspace) => ({
      id: true,
      name: true,
      filter: e.op(workspace.user.id, "=", e.uuid(user?.id as string)),
      order_by: {
        expression: workspace.created,
        direction: e.DESC,
      },
    }))
    .run(client);
  // console.log(workspaceId);
  // console.log(workspaces);

  // const workspaceMember = await e
  //   .select(e.Workspace, (workspace) => ({
  //     id: true,
  //     name: true,
  //     filter: e.op(
  //       e.op(
  //         workspace.workspaceMember.user.id,
  //         "=",
  //         e.uuid(session?.user?.id as string)
  //       ),
  //       "and",
  //       e.op(workspace.user.id, "!=", e.uuid(session?.user?.id as string))
  //     ),
  //     order_by: {
  //       expression: workspace.created,
  //       direction: e.DESC,
  //     },
  //   }))
  //   .run(client);
  // // console.log(workspaceMember);
  // const combinedWorkspaces = [...workspaces, ...workspaceMember];
  // // console.log(combinedWorkspaces);
  return (
    <nav className="lg:hidden px-6 h-[50px] flex items-center justify-between bg-secondary border-b fixed top-0 w-full z-50">
      <MobileSidebar workspaceId={workspaceId} />
      {/* <SelectWorkspaceBox
        workspace={combinedWorkspaces}
        currentWorkspaceId={workspaceId}
      /> */}
      <Link href={"/"}>
        <h1 className="text-xl font-semibold tracking-wide bg-gradient-to-r bg-clip-text text-transparent from-indigo-500  to-indigo-300 hover:cursor-pointer">
          Productivus
        </h1>
      </Link>
    </nav>
  );
};
