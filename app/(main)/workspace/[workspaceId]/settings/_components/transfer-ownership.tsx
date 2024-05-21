"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TransferOwnershipForm from "./transfer-ownership-form";

export type StatusType = {
  id: string;
  githubUsername: string;
  memberRole: string;
  userId: string;
};

const TransferOwnership = ({
  status,
  workspaceId,
}: {
  status: StatusType;
  workspaceId: string;
}) => {
  return (
    <>
      <Card className="border-teal-300">
        <CardHeader>
          <CardTitle>Transfer Workspace ownership</CardTitle>
          <CardDescription>
            The owner of the workspace will change. Only the current owner has
            the privilege to transfer ownership. This action is irreversible and
            can not be undone.
          </CardDescription>
        </CardHeader>
        <CardFooter className="bg-primary-foreground rounded-xl pt-2">
          {typeof status === "object" && status.memberRole === "owner" ? (
            <TransferOwnershipForm workspaceId={workspaceId} />
          ) : (
            <Button disabled={true} className="w-[320px] mt-5">
              Transfer Ownership
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default TransferOwnership;
