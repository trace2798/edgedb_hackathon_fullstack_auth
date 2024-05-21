"use client";

import { toast } from "sonner";
import { ElementRef, useEffect, useRef, useState } from "react";
import { Layout } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { FormInput } from "@/app/(main)/workspace/[workspaceId]/boards/[boardId]/_components/form-input";
import { Card, User } from "@/types";
import { updateCardTitle } from "@/actions/card";
import { useCurrentUser } from "@/hooks/use-current-user";

interface HeaderProps {
  data: Card;
}

export const Header = ({ data }: HeaderProps) => {

  // const user = useCurrentUser();
  const [user, setUser] = useState<User | null>(null);
 
  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await useCurrentUser();
      setUser(currentUser);
    };

    fetchUser();
  }, []);
 
  console.log(user);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [title, setTitle] = useState(data.title);

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const onSubmit = async (formData: FormData) => {
    const title = formData.get("title") as string;
    if (title === data.title) {
      return;
    }
    console.log(title);
    const response = await updateCardTitle(data.id, title, user?.id as string);
    if (response === "Card Title Updated") {
      toast.success(`Card Title Updated`);
      setTitle(title);
    } else {
      toast.error(response);
    }
  };

  return (
    <div className="flex items-start gap-x-3 mb-3 w-full">
      <Layout className="h-5 w-5 mt-1 text-muted-foreground" />
      <div className="w-full">
        <form action={onSubmit}>
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            defaultValue={title}
            className="font-semibold dark:text-neutral-200 text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-inherit focus-visible:border-input mb-0.5 truncate"
          />
          <input hidden id="listId" name="listId" value={data.listId} />
        </form>
        <p className="text-sm text-muted-foreground">
          in list <span className="underline">{data.listId}</span>
        </p>
      </div>
    </div>
  );
};

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className="flex items-start gap-x-3 mb-6">
      <Skeleton className="h-6 w-6 mt-1 bg-neutral-200" />
      <div>
        <Skeleton className="w-24 h-6 mb-1 bg-neutral-200" />
        <Skeleton className="w-12 h-4 bg-neutral-200" />
      </div>
    </div>
  );
};
