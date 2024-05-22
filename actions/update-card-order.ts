"use server";
import e, { createClient } from "@/dbschema/edgeql-js";

const client = createClient();

export async function updateCardOrder(
  items: any,
  boardId: string,
  workspaceId: string
) {
  try {
    // console.log(items, "ITEMS");
    // console.log(boardId, "BOARD ID");
    // console.log(workspaceId, "WORKSPACE ID");

    for (let item of items) {
      if (item.list_id) {
        const newList = await e
          .select(e.List, (list) => ({
            id: true,
            title: true,
            filter_single: e.op(list.id, "=", e.uuid(item.list_id as string)),
          }))
          .run(client);
        // console.log(newList);
        const query = e.update(e.Card, () => ({
          filter_single: { id: item.id },
          set: {
            order: item.order,
            list: e.select(e.List, (list) => ({
              filter_single: e.op(list.id, "=", e.uuid(item.list_id as string)),
            })),
          },
        }));
        await query.run(client);
        // console.log(query);
      } else {
        const query = e.update(e.Card, () => ({
          filter_single: { id: item.id },
          set: {
            order: item.order,
          },
        }));
        await query.run(client);
      }
    }
    return "Done";
  } catch (error) {
    return "Error updating card order";
  }
}
