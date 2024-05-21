import e, { createClient } from "@/dbschema/edgeql-js";


const client = createClient();
export async function fetchIssue({ issueId }: { issueId: string }) {
  try {
    const issue = await e
      .select(e.Issue, (issue) => ({
        id: true,
        title: true,
        description: true,
        status: true,
        priority: true,
        created: true,
        updated: true,
        duedate: true,
        assigneeId: true,
        // urls: true,
        filter_single: e.op(issue.id, "=", e.uuid(issueId)),
        websiteaddresses: {
          id: true,
          url: true,
          description: true,
        },
        issueactivity: {
          id: true,
          message: true,
          // created: true,
          // filter_single: e.op(issue.id, "=", e.uuid(params.issueId)),
          // order_by: {
          //   expression: issue.issueactivity.created,
          //   direction: e.DESC,
          // },
        },
      }))
      .run(client);
      return issue
  } catch (error) {
    console.log(error);
  }
}
