"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

type Workspace = {
  id: string;
  name: string;
}[];

export function SelectWorkspaceBox({
  workspace,
  currentWorkspaceId,
}: {
  workspace: Workspace;
  currentWorkspaceId: string;
}) {
  // console.log(workspace);
  // console.log(currentWorkspaceId);
  const router = useRouter();
  const currentWorkspaceName = getWorkspaceName(workspace, currentWorkspaceId);
  const handleWorkspaceSelection = (value: string) => {
    router.push(`/workspace/${value}`);
  };
  return (
    <Select onValueChange={(value) => handleWorkspaceSelection(value)}>
      <SelectTrigger className="max-w-[160px] max-lg:bg-inherit dark:border-zinc-700 border-neutral-400">
        <SelectValue placeholder={currentWorkspaceName} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Workspaces</SelectLabel>
          {workspace.map((workspace) => (
            <SelectItem
              className="hover:cursor-pointer"
              key={workspace.id}
              value={workspace.id}
            >
              {workspace.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function getWorkspaceName(workspaces: Workspace, workspaceId: string) {
  // console.log(workspaces);
  // console.log(workspaceId);
  for (let i = 0; i < workspaces.length; i++) {
    if (workspaces[i].id === workspaceId) {
      return workspaces[i].name;
    }
  }
  return "No matching workspace found";
}
