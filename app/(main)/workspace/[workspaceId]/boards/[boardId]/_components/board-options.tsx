"use client";

import { Activity, MoreHorizontalIcon, Settings, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteBoard } from "@/actions/board";
import Link from "next/link";
interface BoardOptionsProps {
  id: string;
  workspaceId: string;
}

export const BoardOptions = ({ id, workspaceId }: BoardOptionsProps) => {
  const router = useRouter();
  const [isActivityHovered, setIsActivityHovered] = useState(false);
  const [isDeleteHovered, setIsDeleteHovered] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MoreHorizontalIcon className="w-4 h-4 text-muted-foreground hover:text-primary hover:cursor-pointer pr-1" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56  z-[120]">
        <DropdownMenuLabel>Board Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className={`hover:cursor-pointer ${
              isDeleteHovered ? "blur-lg" : ""
            }`}
            onMouseEnter={() => setIsActivityHovered(true)}
            onMouseLeave={() => setIsActivityHovered(false)}
          >
            <Activity className="mr-2 h-4 w-4" />
            <span>Activity</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <Link href={`/workspace/${workspaceId}/boards/${id}/settings`}>
            <DropdownMenuItem
              className={`hover:cursor-pointer ${
                isDeleteHovered ? "blur-lg" : ""
              }`}
              onMouseEnter={() => setIsActivityHovered(true)}
              onMouseLeave={() => setIsActivityHovered(false)}
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </Link>
          {/* <DropdownMenuItem
            className={`text-red-500 hover:cursor-pointer ${
              isActivityHovered ? "blur" : ""
            }`}
            onMouseEnter={() => setIsDeleteHovered(true)}
            onMouseLeave={() => setIsDeleteHovered(false)}
            onClick={() => // console.log("Delete")}
          >
            <Trash className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
