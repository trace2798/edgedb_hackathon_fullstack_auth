"use client";
import { Button } from "@/components/ui/button";
import { KanbanSquare } from "lucide-react";
import { FC } from "react";
import { Member } from "../workspace/[workspaceId]/members/_components/members/column";
import { useBoards } from "@/hooks/use-boards";

interface AddBoardButtonProps {
  // members: Member[];
  // currentWorkspaceId: string;
}

const AddBoardButton: FC<AddBoardButtonProps> = ({
  // members,
  // currentWorkspaceId,
}) => {
  const board = useBoards();
  return (
    <>
      <Button
        onClick={() => {
          board.onOpen();
        }}
        variant={"sidebar"}
        size={"sidebar"}
        className="w-full items-middle flex justify-start hover:text-indigo-400 hover:bg-secondary"
      >
        <KanbanSquare className="h-4 w-4 mr-3" />
        Add Board
      </Button>
    </>
  );
};

export default AddBoardButton;
