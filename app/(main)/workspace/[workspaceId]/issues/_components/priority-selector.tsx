"use client";
import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Triangle } from "lucide-react";

type Priority = {
  value: string;
  label: string;
};

const priorities: Priority[] = [
  {
    value: "no priority",
    label: "No Priority",
  },
  {
    value: "urgent",
    label: "Urgent",
  },
  {
    value: "high",
    label: "High",
  },
  {
    value: "medium",
    label: "Medium",
  },
  {
    value: "low",
    label: "Low",
  },
];

export function PrioritySelector() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedPriority, setSelectedPriority] =
    React.useState<Priority | null>(null);

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"sidebar"}
            size={"sidebar"}
            className="bg-secondary min-w-[80px]"
          >
            {selectedPriority ? (
              <>{selectedPriority.label}</>
            ) : (
              <>
                <Triangle className="w-4 h-4 mr-1" /> Set Priority
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <PriorityList
            setOpen={setOpen}
            setSelectedPriority={setSelectedPriority}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant={"sidebar"}
          size={"sidebar"}
          className="bg-secondary min-w-[80px]"
        >
          {selectedPriority ? (
            <>{selectedPriority.label}</>
          ) : (
            <>
              <Triangle className="w-4 h-4 mr-1" /> Set Priority
            </>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <PriorityList
            setOpen={setOpen}
            setSelectedPriority={setSelectedPriority}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function PriorityList({
  setOpen,
  setSelectedPriority,
}: {
  setOpen: (open: boolean) => void;
  setSelectedPriority: (priority: Priority | null) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter Priority..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {priorities.map((priority) => (
            <CommandItem
              key={priority.value}
              value={priority.value}
              onSelect={(value) => {
                setSelectedPriority(
                  priorities.find((priority) => priority.value === value) ||
                    null
                );
                setOpen(false);
              }}
            >
              {priority.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
