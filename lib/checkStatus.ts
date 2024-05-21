// import { auth } from "@/auth";
import e, { createClient } from "@/dbschema/edgeql-js";
import { auth } from "@/edgedb";
import { useCurrentUser } from "@/hooks/use-current-user";
import { User } from "@/types";

const client = createClient();

export async function checkStatus({ workspaceId }: { workspaceId: string }) {
  console.log(workspaceId, "WORKSPACE ID");
  // const session = await auth();
  const session = auth.getSession();
  const signedIn = await session.isSignedIn();
  console.log(session);
  const user = (await useCurrentUser()) as User;
  console.log(user);
  console.log(session);
  const currentLoggedInUsersMemberStatus = await e
    .select(e.WorkspaceMember, (workspaceMember) => ({
      id: true,
      githubUsername: true,
      memberRole: true,
      userId: true,
      filter_single: e.op(
        e.op(workspaceMember.workspaceId, "=", e.uuid(workspaceId)),
        "and",
        e.op(workspaceMember.userId, "=", e.uuid(user?.id as string))
      ),
    }))
    .run(client);
  console.log(currentLoggedInUsersMemberStatus);
  if (!currentLoggedInUsersMemberStatus) {
    return "not member";
  }
  return currentLoggedInUsersMemberStatus;
}
