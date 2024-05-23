"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { format, parseISO } from "date-fns";
import { LocalDateTime } from "edgedb";
import { ArrowUpDown } from "lucide-react";

export type Member = {
  id: string;
  memberRole: "member" | "owner" | "admin";
  githubUsername: string;
  created: LocalDateTime;
  userId?: string;
};

export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "memberRole",
    header: "Role",
  },
  {
    accessorKey: "githubUsername",
    header: "Github Username",
  },
  {
    accessorKey: "created",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Member Since
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <>
          {" "}
          {format(parseISO(row?.original.created.toString()), "MMM dd, yyyy")}
        </>
      );
    },
  },
];
