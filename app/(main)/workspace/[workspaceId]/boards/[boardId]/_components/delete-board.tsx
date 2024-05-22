"use client";
import { deleteBoard } from "@/actions/board";
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
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DeleteBoard = ({
  workspaceId,
  boardId,
  status,
}: {
  workspaceId: string;
  boardId: string;
  status: any;
}) => {
  // console.log(workspaceId);
  // console.log(boardId);
  const router = useRouter();
  const handleWorkspaceDelete = async ({}: {}) => {
    const response = await deleteBoard(boardId);
    // console.log(response);
    if (response === "Done") {
      router.push(`/workspace/${workspaceId}/boards`);
      toast.success("Board Deleted");
      router.refresh();
    } else {
      toast.error(response);
    }
  };

  return (
    <>
      <Card className="border-red-300">
        <CardHeader>
          <CardTitle>Delete Board</CardTitle>
          <CardDescription>
            The Board will be permanently deleted, including all its data. This
            action is irreversible and can not be undone.
          </CardDescription>
        </CardHeader>
        <CardFooter className="bg-[#2A1214] rounded-xl">
          {typeof status === "object" && status.memberRole === "owner" ? (
            <AlertDialog>
              <AlertDialogTrigger>
                <Button variant="destructive" className="w-[180px] mt-5">
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="items-center">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleWorkspaceDelete(workspaceId)}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Button
              disabled={true}
              variant="destructive"
              className="w-[320px] mt-5"
            >
              Delete
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default DeleteBoard;
