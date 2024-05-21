"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { LocalDateTime } from "edgedb";
import { ArrowUpDown } from "lucide-react";

export type Activity = {
  id: string;
  message: string;
  created: LocalDateTime;
};

export const columns: ColumnDef<Activity>[] = [
  {
    accessorKey: "message",
    header: "Activity",
  },
  {
    accessorKey: "created",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
