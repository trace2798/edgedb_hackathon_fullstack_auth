import { notFound, redirect } from "next/navigation";
import e, { createClient } from "@/dbschema/edgeql-js";
import { BoardNavbar } from "./_components/board-navbar";

const client = createClient();

export async function generateMetadata({
  params,
}: {
  params: { workspaceId: string; boardId: string };
}) {
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
  // console.log(board);

  return {
    name: board?.name || "Board",
  };
}

const BoardIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { workspaceId: string; boardId: string };
}) => {
  if (!params.workspaceId) {
    redirect("/workspace");
  }

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
  // console.log(board);

  if (!board) {
    notFound();
  }

  return (
    <div
      className="relative h-screen bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${board.backgroundImage})` }}
    >
      <BoardNavbar data={board} />
      <div className="absolute inset-0 bg-black/10" />
      <main className="relative pt-28 h-full">{children}</main>
    </div>
  );
};

export default BoardIdLayout;
