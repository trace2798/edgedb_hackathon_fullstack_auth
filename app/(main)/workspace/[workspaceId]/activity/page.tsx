import { Heading } from "@/components/heading";
import e, { createClient } from "@/dbschema/edgeql-js";
import { DataTable } from "./_components/data-table";
import { Activity, columns } from "./_components/column";

const client = createClient();

const ActivityPage = async ({
  params,
}: {
  params: { workspaceId: string };
}) => {
  const activity = await e
    .select(e.Activity, (activity) => ({
      id: true,
      message: true,
      created: true,
      filter: e.op(activity.workspaceId, "=", e.uuid(params.workspaceId)),
      order_by: {
        expression: activity.created,
        direction: e.DESC,
      },
    }))
    .run(client);
  console.log(activity);
  return (
    <>
      <div className="py-24 px-[10vw] lg:pl-[256px]">
        <Heading
          title={`Activities`}
          description="Activities related to this workspace"
        />
        <DataTable columns={columns} data={activity as Activity[]} />
      </div>
    </>
  );
};

export default ActivityPage;
