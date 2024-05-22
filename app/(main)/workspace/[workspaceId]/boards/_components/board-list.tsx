import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import e, { createClient } from "@/dbschema/edgeql-js";
import { SquareKanban } from "lucide-react";
import Link from "next/link";
import { Member } from "../../members/_components/members/column";
import AddBoardButtonFooter from "./add-board-button-footer";

const client = createClient();

export const BoardList = async ({
  params, members
}: {
  params: { workspaceId: string }, members: Member[];
}) => {
  const boards = await e
    .select(e.Board, (board) => ({
      id: true,
      name: true,
      backgroundImage: true,
      filter: e.op(board.workspace.id, "=", e.uuid(params.workspaceId)),
      order_by: {
        expression: board.created,
        direction: e.DESC,
      },
    }))
    .run(client);
  // console.log(boards);
  const workspaceId = params.workspaceId;
  // console.log(workspaceId);
  // const members = await e
  //   .select(e.WorkspaceMember, (workspaceMember) => ({
  //     id: true,
  //     name: true,
  //     email: true,
  //     memberRole: true,
  //     userId: true,
  //     created: true,
  //     filter: e.op(workspaceMember.workspaceId, "=", e.uuid(workspaceId)),
  //     order_by: {
  //       expression: workspaceMember.created,
  //       direction: e.DESC,
  //     },
  //   }))
  //   .run(client);
    // console.log(members);
  return (
    <>
      <div>
        {boards.length === 0 && (
          <div className="h-screen flex flex-col items-center justify-center ">
            <Card className="bg-secondary max-w-lg">
              <CardHeader className="space-y-5">
                <CardTitle className="flex flex-col items-start space-y-3">
                  <SquareKanban className="w-9 h-9" />
                </CardTitle>
                <CardTitle>Board</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>
                  Board are collection of tasks to work, each serving a specific
                  purpose towards achieving a larger goal. They vary in
                  complexity and duration, ranging from simple, short-term
                  actions to intricate, long-term projects.
                </p>
                <p>
                  Effective task management involves prioritizing, scheduling,
                  and tracking progress, which enhances productivity and ensures
                  timely completion. Tasks, whether individual or collaborative,
                  are the building blocks that drive progress and success in any
                  endeavor.
                </p>
              </CardContent>
              <CardFooter>
                {" "}
                {/* <AddButtonButtonFooter
                members={members as Member[]}
                defaultStatus="future"
                title="Add A Board"
              /> */}
                <AddBoardButtonFooter
                  // members={members as Member[]}
                  title="Add A Board"
                />
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-[5vw] mt-5">
        {boards.map((board) => (
          <Link
            key={board.id}
            href={`boards/${board.id}`}
            className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden"
            style={{ backgroundImage: `url(${board.backgroundImage})` }}
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
            <p className="relative font-semibold text-white">{board.name}</p>
          </Link>
        ))}
      </div>
    </>
  );
};

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-[5vw] mt-5">
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
    </div>
  );
};
