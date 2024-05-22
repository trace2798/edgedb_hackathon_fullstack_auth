import { Heading } from "@/components/heading";
import e, { createClient } from "@/dbschema/edgeql-js";
import AddMemberForm from "./_components/add-member-form";
import { Member, columns } from "./_components/members/column";
import { DataTable } from "./_components/members/data-table";

const client = createClient();

const MembersPage = async ({ params }: { params: { workspaceId: string } }) => {
  const members = await e
    .select(e.WorkspaceMember, (workspaceMember) => ({
      id: true,
      githubUsername: true,
      memberRole: true,
      created: true,
      filter: e.op(
        workspaceMember.workspaceId,
        "=",
        e.uuid(params.workspaceId)
      ),
      order_by: {
        expression: workspaceMember.created,
        direction: e.DESC,
      },
    }))
    .run(client);
  // console.log(members);
  return (
    <>
      <div className="py-24 px-[10vw] lg:pl-[256px]">
        <Heading title={`Add Member`} description="Add member by email" />
        <AddMemberForm workspaceId={params.workspaceId} />
        <Heading title={`Members (${members.length})`} />
        <DataTable columns={columns} data={members as Member[]} />
      </div>
    </>
  );
};

export default MembersPage;
