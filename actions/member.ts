"use server";

import e, { createClient } from "@/dbschema/edgeql-js";
import { auth } from "@/edgedb";
import { useCurrentUser } from "@/hooks/use-current-user";
import { User } from "@/types";
import { revalidatePath } from "next/cache";
import { EnumLike } from "zod";

const client = createClient();
// export const getUserByEmail = async (email: string) => {
//   try {
//     const user = await e
//       .select(e.User, (user) => ({
//         id: true,
//         email: true,
//         name: true,
//         filter_single: e.op(user.email, "=", e.str_lower(email)),
//       }))
//       .run(client);
//     // console.log(user);
//     return user;
//   } catch {
//     return null;
//   }
// };

export const addMemberByGithubUsername = async (
  githubUsername: string,
  workspaceId: string
) => {
  try {
    // const session = await auth();
    const session = auth.getSession();
    const signedIn = await session.isSignedIn();
    // console.log(session);
    const currentUserFe = (await useCurrentUser()) as User;
    // console.log(currentUserFe);
    const currentUser = await e
      .select(e.User, (user) => ({
        id: true,
        email: true,
        name: true,
        githubUsername: true,
        filter_single: e.op(user.id, "=", e.uuid(currentUserFe?.id as string)),
      }))
      .run(client);
    const user = await e
      .select(e.User, (user) => ({
        id: true,
        email: true,
        name: true,
        githubUsername: true,
        filter_single: e.op(user.githubUsername, "=", e.str(githubUsername)),
      }))
      .run(client);
    // console.log(user);
    if (!user) {
      return "User not found in database";
    }
    const workspace = await e
      .select(e.Workspace, (workspace) => ({
        id: true,
        name: true,
        filter_single: e.op(workspace.id, "=", e.uuid(workspaceId)),
      }))
      .run(client);
    // console.log(workspace);
    if (!workspace) {
      return "Workspace not found in database";
    }
    const workspaceMember = await e
      .select(e.WorkspaceMember, (workspaceMember) => ({
        id: true,
        filter_single: e.op(
          e.op(workspaceMember.workspaceId, "=", e.uuid(workspaceId)),
          "and",
          e.op(workspaceMember.userId, "=", e.uuid(user.id))
        ),
      }))
      .run(client);
    // console.log(workspaceMember);
    if (workspaceMember) {
      return "User is already a member of this workspace";
    }
    const addNewWorkspaceMember = await e
      .insert(e.WorkspaceMember, {
        githubUsername: user.githubUsername as string,
        memberRole: "member",
        workspace: e.select(e.Workspace, (workspace) => ({
          filter_single: e.op(workspace.id, "=", e.uuid(workspaceId)),
        })),
        user: e.select(e.User, (user) => ({
          filter_single: e.op(user.githubUsername, "=", e.str(githubUsername)),
        })),
      })
      .run(client);
    // console.log(addNewWorkspaceMember);
    const activity = await e
      .insert(e.Activity, {
        message:
          `${currentUser?.githubUsername} added ${user.githubUsername}` as string,
        workspace: e.select(e.Workspace, (workspace) => ({
          filter_single: e.op(workspace.id, "=", e.uuid(workspaceId)),
        })),
      })
      .run(client);
    revalidatePath(`/workspace`);
    return "Done";
  } catch {
    return "Error adding member to workspace";
  }
};

export const transferOwnership = async (
  githubUsername: string,
  workspaceId: string
) => {
  try {
  
    const session = auth.getSession();
    const signedIn = await session.isSignedIn();
    const currentUserFe = (await useCurrentUser()) as User;
    const currentUser = await e
      .select(e.User, (user) => ({
        id: true,
        email: true,
        name: true,
        githubUsername: true,
        filter_single: e.op(user.id, "=", e.uuid(currentUserFe?.id as string)),
      }))
      .run(client);
    const user = await e
      .select(e.User, (user) => ({
        id: true,
        email: true,
        name: true,
        githubUsername: true,
        filter_single: e.op(user.githubUsername, "=", e.str(githubUsername)),
      }))
      .run(client);
    if (!user) {
      return "User not found in database";
    }
    const workspace = await e
      .select(e.Workspace, (workspace) => ({
        id: true,
        name: true,
        filter_single: e.op(workspace.id, "=", e.uuid(workspaceId)),
      }))
      .run(client);
    if (!workspace) {
      return "Workspace not found in database";
    }
    const checkMembership = await e
      .select(e.WorkspaceMember, (workspaceMember) => ({
        id: true,
        githubUsername: true,
        memberRole: true,
        filter_single: e.op(workspaceMember.userId, "=", e.uuid(user.id)),
      }))
      .run(client);
    if (!checkMembership) {
      return "Membership not found in database";
    }
    if (checkMembership.memberRole === "owner") {
      return "Already owner of the workspace";
    }
    try {
    } catch (error) {}
    const updateMembership = e
      .update(e.WorkspaceMember, (workspaceMember) => ({
        filter_single: e.op(
          workspaceMember.id,
          "=",
          e.uuid(checkMembership.id)
        ),
        set: {
          memberRole: "owner" as "owner",
        },
      }))
      .run(client);
    const activity = await e
      .insert(e.Activity, {
        message:
          `${currentUser?.githubUsername} transferred ownership to ${user.githubUsername}` as string,
        workspace: e.select(e.Workspace, (workspace) => ({
          filter_single: e.op(workspace.id, "=", e.uuid(workspaceId)),
        })),
      })
      .run(client);
    return "Done";
  } catch (error) {
    return "Error transferring ownership of workspace";
  }
};
