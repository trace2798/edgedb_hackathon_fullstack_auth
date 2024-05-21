"use client";
import { Button } from "@/components/ui/button";
import { useWorkspaces } from "@/hooks/use-workspaces";
import { FC } from "react";

interface AddWorkspaceButtonProps {
  //   count: number;
}

const AddWorkspaceButton: FC<AddWorkspaceButtonProps> = ({}) => {
  const workspaces = useWorkspaces();
  return (
    <>
      <Button onClick={workspaces.onOpen}>Create Workspace</Button>
    </>
  );
};

export default AddWorkspaceButton;
