"use server";
import e, { createClient } from "@/dbschema/edgeql-js";

const client = createClient();

export async function createList(
  title: string,
  boardId: string,
  workspaceId: string
) {
  try {
    console.log(title, boardId, workspaceId);

    const board = await e
      .select(e.Board, (board) => ({
        id: true,
        filter_single: e.op(board.id, "=", e.uuid(boardId)),
      }))
      .run(client);
    console.log(board);
    if (!board) {
      return "Error: Board not found";
    }
    const lastList = await e
      .select(e.List, (list) => ({
        order: true,

        filter_single: e.op(list.board.id, "=", e.uuid(boardId)),
        order_by: {
          expression: list.order,
          direction: e.DESC,
        },
        limit: 1,
      }))
      .run(client);
    console.log(lastList);
    const newOrder = lastList ? lastList.order + 1 : 1;
    console.log(newOrder);
    const createList = await e
      .insert(e.List, {
        title: title as string,
        order: newOrder as number,
        workspace: e.select(e.Workspace, (workspace) => ({
          filter_single: e.op(workspace.id, "=", e.uuid(workspaceId as string)),
        })),
        board: e.select(e.Board, (board) => ({
          filter_single: e.op(board.id, "=", e.uuid(boardId as string)),
        })),
      })
      .run(client);
    console.log(createList);
    // const issueActivity = await e
    //   .insert(e.IssueActivity, {
    //     message: `${userName} added an link called ${url}.` as string,
    //     issue: e.select(e.Issue, (iss) => ({
    //       filter_single: e.op(iss.id, "=", e.uuid(issue?.id as string)),
    //     })),
    //   })
    //   .run(client);
    // console.log(issueActivity);
    return "Done";
  } catch (error) {
    return "Error Adding Link";
  }
}

export async function deleteList(id: string, currentUserId?: string) {
  try {
    await e
      .delete(e.List, (list) => ({
        filter_single: e.op(list.id, "=", e.uuid(id)),
      }))
      .run(client);
    return "Done";
  } catch (error) {
    return "Error Deleting Issue";
  }
}
