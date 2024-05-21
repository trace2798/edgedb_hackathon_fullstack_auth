"use client";

import { Plus, X } from "lucide-react";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Member } from "../../../../members/_components/members/column";
import { useAddCardModal } from "@/hooks/use-add-card-modal";

interface CardFormProps {
  listId: string;
  tenant_id: string;
  members: Member[];
}

const CardForm: FC<CardFormProps> = ({ listId, tenant_id, members }) => {
  const card = useAddCardModal();
  return (
    <>
      <div className="pt-2 px-2">
        <Button
          onClick={() => card.onOpen(members, listId)}
          className="h-auto px-2 py-1.5 w-full justify-start text-indigo-100 text-sm"
          size="sm"
          variant="ghost"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add a card
        </Button>
      </div>
    </>
  );
};

export default CardForm;
