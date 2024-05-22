"use server";
import e, { createClient } from "@/dbschema/edgeql-js";
import { LocalDateTime } from "edgedb";
import { revalidatePath } from "next/cache";

const client = createClient();

export async function createCard(
  userId: string,
  title: string,
  description: string,
  status: string,
  priority: string,
  assigneeId: string,
  duedate: Date | undefined,
  listId: string
) {
  try {
    const list = await e
      .select(e.List, (list) => ({
        id: true,
        filter_single: e.op(list.id, "=", e.uuid(listId)),
      }))
      .run(client);
    console.log(list);
    if (!list) {
      return "Error: List not found";
    }
    const lastCard = await e
      .select(e.Card, (card) => ({
        order: true,
        filter_single: e.op(card.list.id, "=", e.uuid(listId)),
        order_by: {
          expression: card.order,
          direction: e.DESC,
        },
        limit: 1,
      }))
      .run(client);
    console.log(lastCard);
    const newOrder = lastCard ? lastCard.order + 1 : 1;
    console.log(newOrder);
    const createCard = await e
      .insert(e.Card, {
        title: title as string,
        description: description as string,
        status: status as string,
        priority: priority as string,
        order: newOrder as number,
        duedate: duedate as Date,
        assigneeId: assigneeId as string,
        list: e.select(e.List, (list) => ({
          filter_single: e.op(list.id, "=", e.uuid(listId as string)),
        })),
      })
      .run(client);
    console.log(createCard);
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

export async function deleteCard(
  id: string,
  workspaceId: string,
  boardId: string
) {
  try {
    await e
      .delete(e.Card, (card) => ({
        filter_single: e.op(card.id, "=", e.uuid(id)),
      }))
      .run(client);
    revalidatePath(`/workspace/${workspaceId}/board/${boardId}`);
    return "Done";
  } catch (error) {
    return "Error Deleting Card";
  }
}

export async function cardToCopy(
  id: string,
  workspaceId: string,
  boardId: string,
  listId: string
) {
  try {
    const card = await e
      .select(e.Card, (card) => ({
        ...e.Card["*"],
        filter_single: e.op(card.id, "=", e.uuid(id)),
      }))
      .run(client);
    console.log(card);
    if (!card) {
      return "Error: Card not found";
    }
    const lastCard = await e
      .select(e.Card, (card) => ({
        order: true,
        filter_single: e.op(card.list.id, "=", e.uuid(listId)),
        order_by: {
          expression: card.order,
          direction: e.DESC,
        },
        limit: 1,
      }))
      .run(client);
    console.log(lastCard);
    const newOrder = lastCard ? lastCard.order + 1 : 1;
    const createCard = await e
      .insert(e.Card, {
        title: `${card.title} - Copy` as string,
        order: newOrder as number,
        list: e.select(e.List, (list) => ({
          filter_single: e.op(list.id, "=", e.uuid(listId as string)),
        })),
      })
      .run(client);
    console.log(createCard);
    revalidatePath(`/workspace/${workspaceId}/board/${boardId}`);
    return "Done";
  } catch (error) {
    return "Error Deleting Card";
  }
}

export async function updateCardPriority(
  id: string,
  priority: string,
  userId: string
) {
  try {
    console.log(id);
    console.log(priority, "PRIORITY");
    console.log(userId, "USER ID");

    const user = await e
      .select(e.User, (user) => ({
        id: true,
        email: true,
        name: true,
        filter_single: e.op(user.id, "=", e.uuid(userId)),
      }))
      .run(client);
    if (!user) {
      return "User Not Found";
    }
    const card = await e
      .select(e.Card, (card) => ({
        id: true,
        title: true,
        priority: true,
        filter_single: e.op(card.id, "=", e.uuid(id)),
      }))
      .run(client);
    console.log(card);

    const updateCardPriority = await e
      .update(e.Card, () => ({
        filter_single: { id: e.uuid(id) },
        set: {
          priority: priority as string,
        },
      }))
      .run(client);
    console.log(updateCardPriority);

    return "Card Priority Updated";
  } catch (error) {
    console.error(error);
    return "Error Updating Priority";
  }
}

export async function updateCardStatus(
  id: string,
  status: string,
  userId: string
) {
  try {
    console.log(id);
    console.log(status, "status");
    console.log(userId, "USER ID");

    const user = await e
      .select(e.User, (user) => ({
        id: true,
        email: true,
        name: true,
        filter_single: e.op(user.id, "=", e.uuid(userId)),
      }))
      .run(client);
    if (!user) {
      return "User Not Found";
    }
    const card = await e
      .select(e.Card, (card) => ({
        id: true,
        title: true,
        status: true,
        filter_single: e.op(card.id, "=", e.uuid(id)),
      }))
      .run(client);
    console.log(card);

    const updateCardPriority = await e
      .update(e.Card, () => ({
        filter_single: { id: e.uuid(id) },
        set: {
          status: status as string,
        },
      }))
      .run(client);
    console.log(updateCardPriority);

    return "Card Status Updated";
  } catch (error) {
    console.error(error);
    return "Error Updating Status";
  }
}

export async function updateCardDueDate(
  id: string,
  duedate: Date,
  userId: string
) {
  try {
    console.log(id);
    console.log(duedate, "Duedate");
    console.log(userId, "USER ID");

    const user = await e
      .select(e.User, (user) => ({
        id: true,
        email: true,
        name: true,
        filter_single: e.op(user.id, "=", e.uuid(userId)),
      }))
      .run(client);
    if (!user) {
      return "User Not Found";
    }
    const card = await e
      .select(e.Card, (card) => ({
        id: true,
        title: true,
        status: true,
        filter_single: e.op(card.id, "=", e.uuid(id)),
      }))
      .run(client);
    console.log(card);

    const updateCardduedate = await e
      .update(e.Card, () => ({
        filter_single: { id: e.uuid(id) },
        set: {
          duedate: duedate as Date,
        },
      }))
      .run(client);
    console.log(updateCardduedate);

    return "Card Due Date Updated";
  } catch (error) {
    console.error(error);
    return "Error Updating Due Date";
  }
}


export async function updateCardAssigneeId(
  id: string,
  assigneeId: string,
  userId: string
) {
  try {
    console.log(id);
    console.log(assigneeId, "assigneeId");
    console.log(userId, "USER ID");

    const user = await e
      .select(e.User, (user) => ({
        id: true,
        email: true,
        name: true,
        filter_single: e.op(user.id, "=", e.uuid(userId)),
      }))
      .run(client);
    if (!user) {
      return "User Not Found";
    }
    const card = await e
      .select(e.Card, (card) => ({
        id: true,
        title: true,
        status: true,
        filter_single: e.op(card.id, "=", e.uuid(id)),
      }))
      .run(client);
    console.log(card);

    const updateCardAssignee = await e
      .update(e.Card, () => ({
        filter_single: { id: e.uuid(id) },
        set: {
          assigneeId: assigneeId as string,
        },
      }))
      .run(client);
    console.log(updateCardAssignee);

    return "Card Assignee Updated";
  } catch (error) {
    console.error(error);
    return "Error Updating Assignee";
  }
}

export async function updateCardTitle(
  id: string,
  title: string,
  userId: string
) {
  try {
    console.log(id);
    console.log(title, "assigneeId");
    console.log(userId, "USER ID");

    const user = await e
      .select(e.User, (user) => ({
        id: true,
        email: true,
        name: true,
        filter_single: e.op(user.id, "=", e.uuid(userId)),
      }))
      .run(client);
    if (!user) {
      return "User Not Found";
    }
    const card = await e
      .select(e.Card, (card) => ({
        id: true,
        title: true,
        status: true,
        filter_single: e.op(card.id, "=", e.uuid(id)),
      }))
      .run(client);
    console.log(card);

    const updateCardTitle = await e
      .update(e.Card, () => ({
        filter_single: { id: e.uuid(id) },
        set: {
          title: title as string,
        },
      }))
      .run(client);
    console.log(updateCardTitle);

    return "Card Title Updated";
  } catch (error) {
    console.error(error);
    return "Error Updating Title";
  }
}

export async function updateCardDescription(
  id: string,
  description: string,
  userId: string,
  boardId: string
) {
  try {
    console.log(id);
    console.log(description, "assigneeId");
    console.log(userId, "USER ID");
    console.log(boardId, "boardID");
    const user = await e
      .select(e.User, (user) => ({
        id: true,
        email: true,
        name: true,
        filter_single: e.op(user.id, "=", e.uuid(userId)),
      }))
      .run(client);
    console.log(user);
    if (!user) {
      return "User Not Found";
    }

    const board = await e
      .select(e.Board, (board) => ({
        id: true,
        // title: true,
        workspace: true,
        filter_single: e.op(board.id, "=", e.uuid(boardId)),
      }))
      .run(client);
    console.log(board);

    const card = await e
      .select(e.Card, (card) => ({
        id: true,
        title: true,
        status: true,
        filter_single: e.op(card.id, "=", e.uuid(id)),
      }))
      .run(client);
    console.log(card);

    const updateCardTitle = await e
      .update(e.Card, () => ({
        filter_single: { id: e.uuid(id) },
        set: {
          description: description as string,
        },
      }))
      .run(client);
    console.log(updateCardTitle);
    revalidatePath(`/workspace/${board?.workspace.id}/board/${boardId}`);
    return "Card Description Updated";
  } catch (error) {
    console.error(error);
    return "Error Updating Title";
  }
}
