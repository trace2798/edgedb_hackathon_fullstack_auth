"use client";

import { toast } from "sonner";
import { Copy, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/types";
// import { useAction } from "@/hooks/use-action";
// import { copyCard } from "@/actions/copy-card";
import { Button } from "@/components/ui/button";
// import { deleteCard } from "@/actions/delete-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCardModal } from "@/hooks/use-card-modal";
import { cardToCopy, deleteCard } from "@/actions/card";

interface ActionsProps {
  data: Card;
}

export const Actions = ({ data }: ActionsProps) => {
  const params = useParams();
  const cardModal = useCardModal();
  const router = useRouter();
  //   const {
  //     execute: executeCopyCard,
  //     isLoading: isLoadingCopy,
  //   } = useAction(copyCard, {
  //     onSuccess: (data) => {
  //       toast.success(`Card "${data[0].title}" copied`);
  //       cardModal.onClose();
  //     },
  //     onError: (error) => {
  //       toast.error(error);
  //     },
  //   });

  //   const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(
  //     deleteCard,
  //     {
  //       onSuccess: (data) => {
  //         toast.success(`Card "${data[0].title}" deleted`);
  //         cardModal.onClose();
  //       },
  //       onError: (error) => {
  //         toast.error(error);
  //       },
  //     }
  //   );

  const onCopy = async () => {
    const boardId = params.boardId as string;

    const response = await cardToCopy(
      data.id,
      params.workspaceId as string,
      params.boardId as string,
      data.listId
    );
    console.log(response);
    if (response === "Done") {
      router.refresh();
      cardModal.onClose();
      toast.success(`Card Copied`);
    } else {
      toast.error(response);
    }
  };

  const onDelete = async () => {
    const response = await deleteCard(
      data.id,
      params.workspaceId as string,
      params.boardId as string
    );
    console.log(response);
    if (response === "Done") {
      router.refresh();
      cardModal.onClose();
      toast.success(`Card deleted`);
    } else {
      toast.error(response);
    }
  };

  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">Actions</p>
      <Button
        onClick={onCopy}
        // disabled={isLoadingCopy}
        variant="outline"
        className="w-full justify-start"
        size="sidebar"
      >
        <Copy className="h-4 w-4 mr-2" />
        Copy
      </Button>
      <Button
        onClick={onDelete}
        // disabled={isLoadingDelete}
        variant="outline"
        className="w-full justify-start"
        size="sidebar"
      >
        <Trash className="h-4 w-4 mr-2" />
        Delete
      </Button>
    </div>
  );
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};
