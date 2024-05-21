"use server";
import e, { createClient } from "@/dbschema/edgeql-js";
import { LocalDateTime } from "edgedb";

const client = createClient();

export async function createTask(
  userId: string,
  title: string,
  description: string,
  status: string,
  priority: string,
  assigneeId: string,
  duedate: Date | undefined
) {
  try {
    console.log(userId, "USER ID");
    console.log(title, "CONTENT");
    console.log(status, "STATUS");
    console.log(priority, "PRIORITY");
    console.log(assigneeId, "ASSIGNEE ID");
    console.log(duedate, "DUE DATE");
    const user = await e
      .select(e.User, (user) => ({
        id: true,
        githubUsername: true,
        filter_single: e.op(user.id, "=", e.uuid(userId)),
      }))
      .run(client);
    if (!user) {
      return "User Not Found";
    }
    const verifyMember = await e
      .select(e.WorkspaceMember, (member) => ({
        id: true,
        githubUsername: true,
        workspaceId: true,
        filter_single: e.op(member.id, "=", e.uuid(assigneeId)),
      }))
      .run(client);
    console.log(verifyMember);
    const newTask = await e
      .insert(e.Task, {
        title: title as string,
        description: description as string,
        status: status as string,
        priority: priority as string,
        duedate: duedate as LocalDateTime | undefined,
        workspace: e.select(e.Workspace, (workspace) => ({
          filter_single: e.op(
            workspace.id,
            "=",
            e.uuid(verifyMember?.workspaceId as string)
          ),
        })),
        workspaceMember: e.select(e.WorkspaceMember, (member) => ({
          filter_single: e.op(member.user.id, "=", e.uuid(userId as string)),
        })),
        assigneeId: e.uuid(assigneeId as string),
      })
      .run(client);
    console.log(newTask);

    const activity = await e
      .insert(e.Activity, {
        message:
          `${user.githubUsername} created an task: "${title}". Task assigned to : ${verifyMember?.githubUsername} ` as string,
        workspace: e.select(e.Workspace, (workspace) => ({
          filter_single: e.op(
            workspace.id,
            "=",
            e.uuid(verifyMember?.workspaceId as string)
          ),
        })),
      })
      .run(client);
    console.log(activity);
    const taskActivity = await e
      .insert(e.TaskActivity, {
        message: `${user.githubUsername} created this issue.` as string,
        task: e.select(e.Task, (task) => ({
          filter_single: e.op(task.id, "=", e.uuid(newTask?.id as string)),
        })),
      })
      .run(client);

    return "Task Created";
  } catch (error) {
    console.error(error);
    return "Error Creating Task";
  }
}

export async function updatePriority(
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
        githubUsername: true,
        filter_single: e.op(user.id, "=", e.uuid(userId)),
      }))
      .run(client);
    if (!user) {
      return "User Not Found";
    }
    const task = await e
      .select(e.Task, (task) => ({
        id: true,
        title: true,
        priority: true,
        workspaceId: true,
        filter_single: e.op(task.id, "=", e.uuid(id)),
      }))
      .run(client);
    console.log(task);

    const updateTaskPriority = await e
      .update(e.Task, () => ({
        filter_single: { id: e.uuid(id) },
        set: {
          priority: priority as string,
        },
      }))
      .run(client);
    console.log(updateTaskPriority);

    const taskActivity = await e
      .insert(e.TaskActivity, {
        message:
          `${user.githubUsername} changed Priority from: ${task?.priority} to: ${priority}.` as string,
        task: e.select(e.Task, (task) => ({
          filter_single: e.op(task.id, "=", e.uuid(id as string)),
        })),
      })
      .run(client);

    return "Task Priority Updated";
  } catch (error) {
    console.error(error);
    return "Error Updating Priority";
  }
}

export async function updateStatus(id: string, status: string, userId: string) {
  try {
    console.log(id);
    console.log(status, "Status");
    console.log(userId, "USER ID");

    const user = await e
      .select(e.User, (user) => ({
        id: true,
        githubUsername: true,
        filter_single: e.op(user.id, "=", e.uuid(userId)),
      }))
      .run(client);
    if (!user) {
      return "User Not Found";
    }
    const findTask = await e
      .select(e.Task, (issue) => ({
        id: true,
        title: true,
        status: true,
        workspaceId: true,
        filter_single: e.op(issue.id, "=", e.uuid(id)),
      }))
      .run(client);
    console.log(findTask);
    if (!findTask) {
      return "Task not found";
    }

    const updateTaskPriority = await e
      .update(e.Task, () => ({
        filter_single: { id: e.uuid(id) },
        set: {
          status: status as string,
        },
      }))
      .run(client);
    console.log(updateTaskPriority);

    const issueActivity = await e
      .insert(e.TaskActivity, {
        message:
          `${user.githubUsername} changed Status from: ${findTask?.status} to: ${status}.` as string,
        task: e.select(e.Task, (task) => ({
          filter_single: e.op(task.id, "=", e.uuid(findTask?.id as string)),
        })),
      })
      .run(client);

    return "Task Status Updated";
  } catch (error) {
    console.error(error);
    return "Error Updating Status";
  }
}

export async function updateAssigneeId(
  id: string,
  assigneeId: string,
  userId: string
) {
  try {
    console.log(id);
    console.log(assigneeId, "Status");
    console.log(userId, "USER ID");

    const user = await e
      .select(e.User, (user) => ({
        id: true,
        githubUsername: true,
        filter_single: e.op(user.id, "=", e.uuid(userId)),
      }))
      .run(client);
    if (!user) {
      return "User Not Found";
    }
    const findTask = await e
      .select(e.Task, (task) => ({
        id: true,
        title: true,
        status: true,
        workspaceId: true,
        filter_single: e.op(task.id, "=", e.uuid(id)),
      }))
      .run(client);
    console.log(findTask);
    if (!findTask) {
      return "Task not found";
    }
    const member = await e
      .select(e.WorkspaceMember, (member) => ({
        id: true,
        githubUsername: true,
        // filter_single: e.op(member.id, "=", e.uuid(assigneeId)),
        filter_single: e.op(
          e.op(member.id, "=", e.uuid(assigneeId)),
          "and",
          e.op(member.workspace.id, "=", e.uuid(findTask?.workspaceId))
        ),
      }))
      .run(client);
    console.log(member);
    const updateIssueAssignee = await e
      .update(e.Task, () => ({
        filter_single: { id: e.uuid(id) },
        set: {
          assigneeId: assigneeId as string,
        },
      }))
      .run(client);
    console.log(updateIssueAssignee);

    const issueActivity = await e
      .insert(e.TaskActivity, {
        message:
          `${user.githubUsername} assigneed this issue to: ${member?.githubUsername}.` as string,
        task: e.select(e.Task, (task) => ({
          filter_single: e.op(task.id, "=", e.uuid(findTask?.id as string)),
        })),
      })
      .run(client);

    return "Task Assignee Updated";
  } catch (error) {
    console.error(error);
    return "Error Updating Status";
  }
}

export async function updateDueDate(
  id: string,
  duedate: Date | undefined,
  userId: string
) {
  try {
    console.log(id);
    // console.log(status, "Status");
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
    const issue = await e
      .select(e.Issue, (issue) => ({
        id: true,
        title: true,
        duedate: true,
        workspaceId: true,
        filter_single: e.op(issue.id, "=", e.uuid(id)),
      }))
      .run(client);
    console.log(issue);

    const updateIssueDueDate = await e
      .update(e.Issue, () => ({
        filter_single: { id: e.uuid(id) },
        set: {
          duedate: duedate,
        },
      }))
      .run(client);
    console.log(updateIssueDueDate);

    const issueActivity = await e
      .insert(e.IssueActivity, {
        message: `${user.name} updated due-date to: ${duedate}` as string,
        issue: e.select(e.Issue, (iss) => ({
          filter_single: e.op(iss.id, "=", e.uuid(issue?.id as string)),
        })),
      })
      .run(client);

    return "Issue Due Date Updated";
  } catch (error) {
    console.error(error);
    return "Error Updating Due Date";
  }
}

export async function deleteTask(id: string, currentUserId: string) {
  try {
    const findTask = await e
      .select(e.Task, (issue) => ({
        id: true,
        title: true,
        status: true,
        workspaceId: true,
        workspaceMember: true,
        filter_single: e.op(issue.id, "=", e.uuid(id)),
      }))
      .run(client);
    console.log(findTask);
    if (!findTask) {
      return "Task Not Found";
    }

    const currentUserMemberInfo = await e
      .select(e.WorkspaceMember, (wspm) => ({
        id: true,
        memberRole: true,
        filter_single: e.op(
          e.op(wspm.workspaceId, "=", e.uuid(findTask?.workspaceId as string)),
          "and",
          e.op(wspm.userId, "=", e.uuid(currentUserId))
        ),
      }))
      .run(client);
    console.log(currentUserMemberInfo);
    if (
      findTask.workspaceMember.id === currentUserMemberInfo?.id ||
      currentUserMemberInfo?.memberRole === "owner"
    ) {
      await e
        .delete(e.Task, (issue) => ({
          filter_single: e.op(issue.id, "=", e.uuid(id)),
        }))
        .run(client);
      return "Done";
    } else {
      return "You do not have permission to delete this issue.";
    }
  } catch (error) {
    return "Error Deleting Issue";
  }
}

export async function updateIssue(
  id: string,
  userId: string,
  title: string,
  description: string,
  duedate: Date | undefined
) {
  try {
    console.log(id);
    console.log(userId, "USER ID");
    console.log(title, "CONTENT");
    console.log(duedate, "DUE DATE");
    const issue = await e
      .select(e.Issue, (issue) => ({
        id: true,
        title: true,
        status: true,
        workspaceId: true,
        workspaceMember: true,
        filter_single: e.op(issue.id, "=", e.uuid(id)),
      }))
      .run(client);
    console.log(issue);
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

    const updatedIssue = await e
      .update(e.Issue, () => ({
        filter_single: { id: e.uuid(id) },
        set: {
          title: title,
          description: description,
          duedate: duedate,
        },
      }))
      .run(client);
    console.log(updatedIssue);

    const issueActivity = await e
      .insert(e.IssueActivity, {
        message: `${user.name} updated the issue.` as string,
        issue: e.select(e.Issue, (iss) => ({
          filter_single: e.op(iss.id, "=", e.uuid(issue?.id as string)),
        })),
      })
      .run(client);

    return "Issue Updated";
  } catch (error) {
    console.error(error);
    return "Error Updating Issue";
  }
}
