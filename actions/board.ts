"use server";
import e, { createClient } from "@/dbschema/edgeql-js";
import { revalidatePath } from "next/cache";

const client = createClient();

export async function createBoard(
  name: string,
  description: string,
  backgroundImage: string,
  creatorUserId: string,
  workspaceId: string
  // currentUsersMembershipId: string
) {
  try {
    console.log(name, "NAME");
    console.log(description, "DESCRIPTION");
    console.log(backgroundImage, "BACKGROUND IMAGE");
    console.log(creatorUserId, "CREATOR USER ID");
    console.log(workspaceId, "WORKSPACE ID");
    const user = await e
      .select(e.User, (user) => ({
        id: true,
        githubUsername: true,
        filter_single: e.op(user.id, "=", e.uuid(creatorUserId)),
      }))
      .run(client);
    // console.log(user);
    if (!user) {
      return "User Not Found";
    }
    const verifyMember = await e
      .select(e.WorkspaceMember, (member) => ({
        id: true,
        githubUsername: true,
        workspaceId: true,
        // filter_single: e.op(member.user.id, "=", e.uuid(creatorUserId)),
        filter_single: e.op(
          e.op(member.user.id, "=", e.uuid(creatorUserId)),
          "and",
          e.op(member.workspaceId, "=", e.uuid(workspaceId))
        ),
      }))
      .run(client);
    // console.log(verifyMember);
    if (!verifyMember) {
      return "Member not found";
    }
    const newBoard = await e
      .insert(e.Board, {
        name: name as string,
        description: description as string,
        backgroundImage: backgroundImage as string,
        workspace: e.select(e.Workspace, (workspace) => ({
          filter_single: e.op(
            workspace.id,
            "=",
            e.uuid(verifyMember?.workspaceId as string)
          ),
        })),
        // workspaceMember: e.select(e.WorkspaceMember, (member) => ({
        //   filter_single: e.op(
        //     member.id,
        //     "=",
        //     e.uuid(verifyMember?.id as string)
        //   ),
        // })),
        workspaceMember: e.select(e.WorkspaceMember, (member) => ({
          // filter_single: e.op(member.user.id, "=", e.uuid(userId as string)),
          filter_single: e.op(
            e.op(member.user.id, "=", e.uuid(creatorUserId)),
            "and",
            e.op(member.workspaceId, "=", e.uuid(verifyMember?.workspaceId))
          ),
        })),
      })
      .run(client);
    revalidatePath(`/workspace/${verifyMember?.workspaceId}/board`);
    console.log(newBoard);
    return "Done";
  } catch (error) {
    // console.log(error);
    return "Error creating Board";
  }
}

export async function updateBoardName(boardId: string, name: string) {
  try {
    // console.log(name, "NAME");

    // const verifyMember = await e
    //   .select(e.WorkspaceMember, (member) => ({
    //     id: true,
    //     email: true,
    //     name: true,
    //     workspaceId: true,
    //     filter_single: e.op(member.id, "=", e.uuid(currentUsersMembershipId)),
    //   }))
    //   .run(client);
    // // console.log(verifyMember);
    // if (!verifyMember) {
    //   return "Member not found";
    // }
    const board = await e
      .select(e.Board, (board) => ({
        id: true,
        workspaceId: true,
        filter_single: e.op(board.id, "=", e.uuid(boardId)),
      }))
      .run(client);
    // console.log(board);

    const updateBoardTitle = await e
      .update(e.Board, () => ({
        filter_single: { id: e.uuid(boardId) },
        set: {
          name: name as string,
        },
      }))
      .run(client);
    // console.log(updateBoardTitle);
    revalidatePath(`/workspace/${board?.workspaceId}/board`);
    return "Done";
  } catch (error) {
    return "Error creating Board";
  }
}

export async function deleteBoard(boardId: string) {
  try {
    const board = await e
      .select(e.Board, (board) => ({
        id: true,
        workspace: {
          id: true,
        },
        filter_single: e.op(board.id, "=", e.uuid(boardId)),
      }))
      .run(client);
    await e
      .delete(e.Board, (board) => ({
        filter_single: e.op(board.id, "=", e.uuid(boardId)),
      }))
      .run(client);
    revalidatePath(`/workspace/${board?.workspace.id}/board`);
    return "Done";
  } catch (error) {
    // console.log(error);
    return "Error deleting Board";
  }
}
