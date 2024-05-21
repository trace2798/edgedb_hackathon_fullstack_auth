"use server";
import e, { createClient } from "@/dbschema/edgeql-js";
import { revalidatePath } from "next/cache";
const client = createClient();

export async function updateListOrder(
  items: any,
  boardId: string,
  workspaceId: string
) {
  try {
    console.log(items, "ITEMS");
    // console.log(boardId, "BOARD ID");
    // console.log(workspaceId, "WORKSPACE ID");

    for (let item of items) {
      const query = e.update(e.List, () => ({
        filter_single: { id: item.id },
        set: {
          order: item.order,
        },
      }));
      await query.run(client);
    }
    revalidatePath(`/workspace/${workspaceId}/board/${boardId}`);
    return "Done";
  } catch (error) {
    return "Error reordering lists";
  }
}
