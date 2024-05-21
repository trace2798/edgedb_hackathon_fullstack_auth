"use server";
import e, { createClient } from "@/dbschema/edgeql-js";

const client = createClient();

export async function createLink(
  userName: string,
  issueId: string,
  url: string,
  description: string | undefined
) {
  try {
    const issue = await e
      .select(e.Issue, (issue) => ({
        id: true,
        title: true,
        duedate: true,
        workspaceId: true,
        filter_single: e.op(issue.id, "=", e.uuid(issueId)),
      }))
      .run(client);
    console.log(issue);
    const createLink = await e
      .insert(e.WebsiteAddress, {
        url: url as string,
        description: description as string,
        issue: e.select(e.Issue, (iss) => ({
          filter_single: e.op(iss.id, "=", e.uuid(issue?.id as string)),
        })),
      })
      .run(client);
    console.log(createLink);
    const issueActivity = await e
      .insert(e.IssueActivity, {
        message: `${userName} added an link called ${url}.` as string,
        issue: e.select(e.Issue, (iss) => ({
          filter_single: e.op(iss.id, "=", e.uuid(issue?.id as string)),
        })),
      })
      .run(client);
    console.log(issueActivity);
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
