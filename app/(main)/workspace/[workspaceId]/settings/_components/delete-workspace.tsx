"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { deleteWorkspace } from "@/actions/workspace";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { StatusType } from "./transfer-ownership";

const DeleteWorkspace = ({
  status,
  workspaceId,
}: {
  status: StatusType;
  workspaceId: string;
}) => {
  // console.log(workspaceId);
  // console.log(status);
  const router = useRouter();
  const handleWorkspaceDelete = async ({}: {}) => {
    const response = await deleteWorkspace(workspaceId, status.memberRole);
    // console.log(response);
    if (response === "Done") {
      toast.success("Workspace Deleted");
      router.push("/workspace");
      router.refresh();
    } else {
      toast.error(response);
    }
  };

  return (
    <>
      <Card className="border-red-300">
        <CardHeader>
          <CardTitle>Delete Workspace</CardTitle>
          <CardDescription>
            The workspace will be permanently deleted, including all its data.
            This action is irreversible and can not be undone.
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
                    your account and remove your data from our servers. Only
                    owner can delete the workspace.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
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

export default DeleteWorkspace;
