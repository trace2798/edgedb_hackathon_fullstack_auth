"use client";
import { Button } from "@/components/ui/button";
import { useIssues } from "@/hooks/use-issues";
import { FC } from "react";
import { Member } from "../../members/_components/members/column";
import { useBoards } from "@/hooks/use-boards";

interface AddBoardButtonFooterProps {
  members: Member[];
  title: string;
}

const AddBoardButtonFooter: FC<AddBoardButtonFooterProps> = ({
  members,
  title,
}) => {
  const board = useBoards();
  return (
    <>
      <Button
        onClick={() => {
          board.onOpen(members);
        }}
        className=" items-middle flex justify-start px-3 py-1 h-8 bg-blue-500 text-neutral-300 hover:bg-blue-600"
      >
        {title}
      </Button>
    </>
  );
};

export default AddBoardButtonFooter;
