"use client";

import { toast } from "sonner";
import { ElementRef, useRef, useState } from "react";
// import { Board } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { FormInput } from "./form-input";
import { updateBoardName } from "@/actions/board";
// import { updateBoard } from "@/actions/update-board";
// import { useAction } from "@/hooks/use-action";

interface BoardTitleFormProps {
  data: any;
}

export const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
  // const { execute } = useAction(updateBoard, {
  //   onSuccess: (data) => {
  //     toast.success(`Board "${data.title}" updated!`);
  //     setTitle(data.title);
  //     disableEditing();
  //   },
  //   onError: (error) => {
  //     toast.error(error);
  //   }
  // });

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [title, setTitle] = useState(data.name);
  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onSubmit = async (formData: FormData) => {
    const title = formData.get("title") as string;
    const response = await updateBoardName(data.id, title);
    console.log(response);
    if (response === "Done") {
      toast.success(`Board name updated!`);
    } else {
      toast.error("Error updating board name.");
    }
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <form
        action={onSubmit}
        ref={formRef}
        className="flex items-center gap-x-2"
      >
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={title}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
      </form>
    );
  }

  return (
    <Button
      onClick={enableEditing}
      className="bg-transparent text-white hover:bg-white/20 font-bold text-lg h-auto w-auto p-1 px-2"
    >
      {title}
    </Button>
  );
};
