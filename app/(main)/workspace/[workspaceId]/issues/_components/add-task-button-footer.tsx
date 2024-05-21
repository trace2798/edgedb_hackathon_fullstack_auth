"use client";
import { Button } from "@/components/ui/button";
import { useIssues } from "@/hooks/use-issues";
import { FC } from "react";
import { Member } from "../../members/_components/members/column";

interface AddTaskButtonFooterProps {
  members: Member[];
  defaultStatus: string;
  title: string;
}

const AddTaskButtonFooter: FC<AddTaskButtonFooterProps> = ({
  members,
  defaultStatus,
  title,
}) => {
  const issues = useIssues();
  return (
    <>
      <Button
        onClick={() => {
          issues.onOpen(members, defaultStatus);
        }}
        className=" items-middle flex justify-start px-3 py-1 h-8 bg-blue-500 text-neutral-300 hover:bg-blue-600"
      >
        {title}
      </Button>
    </>
  );
};

export default AddTaskButtonFooter;
