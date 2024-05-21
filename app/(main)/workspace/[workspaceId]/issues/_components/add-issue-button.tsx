"use client";
import { Button } from "@/components/ui/button";
import { useIssues } from "@/hooks/use-issues";
import { Plus } from "lucide-react";
import { FC } from "react";
import { Member } from "../../members/_components/members/column";

interface AddIssueButtonProps {
  members: Member[];
  defaultStatus: string;
  title?: string;
}

const AddIssueButton: FC<AddIssueButtonProps> = ({
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
        variant={"sidebar"}
        size={"sidebar"}
        className=" items-middle flex justify-start hover:text-indigo-400 hover:bg-secondary"
      >
        <Plus className="h-4 w-4 mr-3" />
        Add {title} Task
      </Button>
    </>
  );
};

export default AddIssueButton;
