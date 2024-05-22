"use client";

import { toast } from "sonner";

import { ElementRef, useRef } from "react";
import { MoreHorizontal, X } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
// import { copyList } from "@/actions/copy-list";
// import { deleteList } from "@/actions/delete-list";
import { FormSubmit } from "../form-submit";
import { Separator } from "@/components/ui/separator";
import { List } from "@/types";
import { deleteList } from "@/actions/lists";
import { useRouter } from "next/navigation";

interface ListOptionsProps {
  data: List;
}

export const ListOptions = ({ data }: ListOptionsProps) => {
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);

  const onDelete = async (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    const response = await deleteList(id);
    // console.log(response);
    if (response === "Done") {
      toast.success("List deleted");
      router.refresh();
    } else {
      toast.error("Error deleting list");
    }
  };

  const onCopy = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    // executeCopy({ id, boardId });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        {/* <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          List actions
        </div> */}
        {/* <form action={onCopy}>
          <input hidden name="id" id="id" value={data.id} />
          <input hidden name="boardId" id="boardId" value={data.boardId} />
          <FormSubmit
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Copy list...
          </FormSubmit>
        </form> */}
        {/* <Separator /> */}
        <form action={onDelete}>
          <input hidden name="id" id="id" value={data.id} />
          <input hidden name="boardId" id="boardId" value={data.boardId} />
          <FormSubmit
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Delete this list
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
