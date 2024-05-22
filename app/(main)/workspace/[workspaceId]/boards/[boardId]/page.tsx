// import { auth } from "@/auth";
import e, { createClient } from "@/dbschema/edgeql-js";
// import { ListWithCards, User } from "@/types";
import { FC } from "react";
import { Member } from "../../members/_components/members/column";
import { ListContainer } from "./_components/list/list-container";
import { auth } from "@/edgedb";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ListWithCards, User } from "@/types";

interface PageProps {
  params: { workspaceId: string; boardId: string };
}

const client = createClient();

const Page: FC<PageProps> = async ({ params }) => {
  // const session = await auth();
  const session = auth.getSession();
  const signedIn = await session.isSignedIn();
  console.log(session);
  const currentUserFe = (await useCurrentUser()) as User;
  console.log(currentUserFe);
  const board = await e
    .select(e.Board, (board) => ({
      id: true,
      name: true,
      backgroundImage: true,
      filter_single: e.op(board.id, "=", e.uuid(params.boardId)),
      order_by: {
        expression: board.created,
        direction: e.DESC,
      },
    }))
    .run(client);
  console.log(board);

  const lists = await e
    .select(e.List, (list) => ({
      id: true,
      title: true,
      order: true,
      boardId: true,
      created: true,
      updated: true,
      filter: e.op(list.board.id, "=", e.uuid(params.boardId)),
      order_by: {
        expression: list.order,
        direction: e.ASC,
      },
      cards: e.select(e.Card, (card) => ({
        id: true,
        title: true,
        order: true,
        listId: true,
        description: true,
        created: true,
        updated: true,
        duedate: true,
        assigneeId: true,
        status: true,
        priority: true,
        filter: e.op(card.list.id, "=", list.id),
        order_by: {
          expression: card.order,
          direction: e.ASC,
        },
      })),
    }))
    .run(client);

  console.log(lists);
  const members = await e
    .select(e.WorkspaceMember, (workspaceMember) => ({
      id: true,
      githubUsername: true,
      memberRole: true,
      userId: true,
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
  console.log(members);
  return (
    <>
      <div className="p-4 h-full overflow-x-auto">
        <ListContainer
          boardId={params.boardId}
          data={lists as ListWithCards[]}
          workspaceId={params.workspaceId}
          members={members as Member[]}
        />
      </div>
    </>
  );
};

export default Page;
