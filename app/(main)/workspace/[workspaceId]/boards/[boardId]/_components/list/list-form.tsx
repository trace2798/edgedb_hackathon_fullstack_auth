"use client";

import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useRef, ElementRef } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

// import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
// import { createList } from "@/actions/create-list";
import { FormInput } from "../form-input";
import { FormSubmit } from "../form-submit";

import { ListWrapper } from "./list-wrapper";
import { createList } from "@/actions/lists";

export const ListForm = ({
  boardId,
  workspaceId,
}: {
  boardId: string;
  workspaceId: string;
}) => {
  const router = useRouter();
  const params = useParams();

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  // const { execute, fieldErrors } = useAction(createList, {
  //   onSuccess: (data) => {
  //     toast.success(`List "${data[0].title}" created`);
  //     disableEditing();
  //     router.refresh();
  //   },
  //   onError: (error) => {
  //     toast.error(error);
  //   },
  // });
  // const createList = ({ title, boardId, tenant_id }: any) => {};
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = async (formData: FormData) => {
    console.log(formData);
    const title = formData.get("title") as string;
    console.log(title);
    const response = await createList(title, boardId, workspaceId);
    console.log(response);
    if (response === "Done") {
      toast.success(`List "${title}" created`);
      disableEditing();
      router.refresh();
    } else {
      toast.error(response);
    }
  };

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
        >
          <FormInput
            ref={inputRef}
            id="title"
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
            placeholder="Enter list name..."
          />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add list</FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className="w-full rounded-md  bg-slate-600/50 hover:bg-indigo-600 transition p-3 flex items-center font-medium text-sm text-neutral-200"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add a list
      </button>
    </ListWrapper>
  );
};
