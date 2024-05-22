"use server";
import e, { createClient } from "@/dbschema/edgeql-js";

const client = createClient();

export async function createLink(
  githubUsername: string,
  taskId: string,
  url: string,
  description: string | undefined
) {
  try {
    const findTask = await e
      .select(e.Task, (task) => ({
        id: true,
        title: true,
        duedate: true,
        workspaceId: true,
        filter_single: e.op(task.id, "=", e.uuid(taskId)),
      }))
      .run(client);
    // console.log(findTask);
    if (!findTask) {
      return "Task not found";
    }
    const createLink = await e
      .insert(e.WebsiteAddress, {
        url: url as string,
        description: description as string,
        task: e.select(e.Task, (task) => ({
          filter_single: e.op(task.id, "=", e.uuid(findTask?.id as string)),
        })),
      })
      .run(client);
    // console.log(createLink);
    const taskActivity = await e
      .insert(e.TaskActivity, {
        message: `${githubUsername} added an link called ${url}.` as string,
        task: e.select(e.Task, (task) => ({
          filter_single: e.op(task.id, "=", e.uuid(findTask?.id as string)),
        })),
      })
      .run(client);
    // console.log(taskActivity);
    return "Done";
  } catch (error) {
    return "Error Adding Link";
  }
}

export async function deleteWebLink(id: string, currentUserId?: string) {
  try {
    await e
      .delete(e.WebsiteAddress, (web) => ({
        filter_single: e.op(web.id, "=", e.uuid(id)),
      }))
      .run(client);
    return "Done";
  } catch (error) {
    return "Error Deleting Issue";
  }
}
