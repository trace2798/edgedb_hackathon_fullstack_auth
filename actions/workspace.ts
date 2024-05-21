"use server";
import e, { createClient } from "@/dbschema/edgeql-js";

const client = createClient();

export async function createWorkspace(
  userId: string,
  name: string,
  description: string
) {
  try {
    console.log(userId, "USER ID");
    console.log(name, "CONTENT");
    const user = await e
      .select(e.User, (user) => ({
        id: true,
        email: true,
        name: true,
        githubUsername: true,
        filter_single: e.op(user.id, "=", e.uuid(userId)),
      }))
      .run(client);
    console.log(user);
    if (!user) {
      return "User Not Found";
    }
    const newWorkspace = await e
      .insert(e.Workspace, {
        name: name as string,
        description: description as string,
        user: e.select(e.User, (user) => ({
          filter_single: e.op(user.id, "=", e.uuid(userId)),
        })),
      })
      .run(client);
    console.log(newWorkspace);

    const addWorkspaceCreatorAsOwner = await e
      .insert(e.WorkspaceMember, {
        githubUsername: (user.githubUsername as string) || "",
        memberRole: "owner",
        workspace: e.select(e.Workspace, (workspace) => ({
          filter_single: e.op(workspace.id, "=", e.uuid(newWorkspace.id)),
        })),
        user: e.select(e.User, (user) => ({
          filter_single: e.op(user.id, "=", e.uuid(userId)),
        })),
      })
      .run(client);
    console.log(addWorkspaceCreatorAsOwner);

    // const activity = await e
    //   .insert(e.Activity, {
    //     message: `Created Workspace: ${name} by ${user.name}` as string,
    //     workspace: e.select(e.Workspace, (workspace) => ({
    //       filter_single: e.op(workspace.id, "=", e.uuid(newWorkspace.id)),
    //     })),
    //     user: e.select(e.User, (user) => ({
    //       filter_single: e.op(user.id, "=", e.uuid(userId)),
    //     })),
    //   })
    //   .run(client);
    // console.log(activity);

    return "Workspace Created";
  } catch (error) {
    console.error(error);
    return "Error Creating Workspace";
  }
}

export async function deleteWorkspace(workspaceId: string, memberRole: string) {
  try {
    if (memberRole !== "owner") return "Only owner can delete workspace";
    const deleteWorkspace = await e
      .delete(e.Workspace, (workspace) => ({
        filter_single: e.op(workspace.id, "=", e.uuid(workspaceId)),
      }))
      .run(client);
    return "Done";
  } catch (error) {
    return "Error Deleting Workspace";
  }
}
