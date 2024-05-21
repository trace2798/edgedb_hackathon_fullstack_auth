"use client";

import { AlignLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { Skeleton } from "@/components/ui/skeleton";
import { updateCardDescription } from "@/actions/card";
import { FormSubmit } from "@/app/(main)/workspace/[workspaceId]/boards/[boardId]/_components/form-submit";
import { FormTextarea } from "@/app/(main)/workspace/[workspaceId]/boards/[boardId]/_components/form-textarea";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Card } from "@/types";

interface DescriptionProps {
  data: Card;
}

export const Description = ({ data }: DescriptionProps) => {
  const user = useCurrentUser();
  const router = useRouter();
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(data.description);
  const formRef = useRef<ElementRef<"form">>(null);
  const textareaRef = useRef<ElementRef<"textarea">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = async (formData: FormData) => {
    const description = formData.get("description") as string;
    const boardId = params.boardId as string;
    if (description === data.description) {
      return;
    }
    const response = await updateCardDescription(
      data.id,
      description,
      user?.id as string,
      boardId
    );
    if (response === "Card Description Updated") {
      toast.success(`Card Description Updated`);
      disableEditing();
      router.refresh();
      setDescription(description);
    } else {
      toast.error(response);
    }
  };

  return (
   
    <div className="flex items-start gap-x-3 w-full">
      <AlignLeft className="h-5 w-5 mt-0.5 text-muted-foreground" />
      <div className="w-full">
        <p className="font-semibold text-muted-foreground mb-2">Description</p>
        {isEditing ? (
          <form action={onSubmit} ref={formRef} className="space-y-2">
            <FormTextarea
              id="description"
              className="w-full mt-2"
              placeholder="Add a more detailed description"
              defaultValue={data.description}
              ref={textareaRef}
            />
            <input hidden id="list_id" name="list_id" value={data.list_id} />
            <div className="flex items-center gap-x-2">
              <FormSubmit>Save</FormSubmit>
              <Button
                type="button"
                onClick={disableEditing}
                size="sm"
                variant="ghost"
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            onClick={enableEditing}
            role="button"
            className="min-h-[78px] bg-neutral-200 dark:bg-zinc-700 text-sm font-medium py-3 px-3.5 rounded-md"
          >
            {data.description || "Add a more detailed description..."}
          </div>
        )}
      </div>
    </div>
  );
};

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
        <Skeleton className="w-full h-[78px] bg-neutral-200" />
      </div>
    </div>
  );
};
