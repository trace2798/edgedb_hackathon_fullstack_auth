import { auth } from "@/auth";
import e, { createClient } from "@/dbschema/edgeql-js";

const client = createClient();

export async function checkStatus({ workspaceId }: { workspaceId: string }) {
  console.log(workspaceId, "WORKSPACE ID");
  const session = await auth();
  console.log(session);
  const currentLoggedInUsersMemberStatus = await e
    .select(e.WorkspaceMember, (workspaceMember) => ({
      id: true,
      name: true,
      email: true,
      memberRole: true,
      userId: true,
      filter_single: e.op(
        e.op(workspaceMember.workspaceId, "=", e.uuid(workspaceId)),
        "and",
        e.op(workspaceMember.userId, "=", e.uuid(session?.user?.id as string))
      ),
    }))
    .run(client);
  console.log(currentLoggedInUsersMemberStatus);
  if (!currentLoggedInUsersMemberStatus) {
    return "not member";
  }
  return currentLoggedInUsersMemberStatus;
}
