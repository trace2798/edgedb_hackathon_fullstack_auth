"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { FC, useEffect, useState } from "react";
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteTask } from "@/actions/issues";
import { useCurrentUser } from "@/hooks/use-current-user";
import { User } from "@/types";

interface DeleteTaskButtonProps {
  taskId: string;
}

const DeleteTaskButton: FC<DeleteTaskButtonProps> = ({ taskId }) => {
  const router = useRouter();
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
  const handleTaskDelete = async ({}: {}) => {
    const response = await deleteTask(taskId, user?.id as string);
    console.log(response);
    if (response === "Done") {
      toast.success("Task Deleted");
      router.refresh();
    } else {
      toast.error(response);
    }
  };
  return (
    <>
      <div className="">
        <AlertDialog>
          <AlertDialogTrigger
            className={buttonVariants({
              variant: "sidebar",
              size: "sidebar",
              className: "text-muted-foreground hover:text-red-400 ",
            })}
          >
            <Trash className="w-4 h-4 text-muted-foreground hover:text-red-400 opacity-0 hover:opacity-100 flex" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                issue.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleTaskDelete(taskId)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default DeleteTaskButton;
