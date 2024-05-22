"use client";

import { Draggable } from "@hello-pangea/dnd";
import { Separator } from "@/components/ui/separator";
import { useCardModal } from "@/hooks/use-card-modal";
import { Card } from "@/types";
import { LocalDateTime } from "edgedb";
import { Member } from "../../../../members/_components/members/column";
import ChangeCardAssignee from "../../../_components/card-assignee-button";
import ChangeDueDate from "../../../_components/duedate-menu";
import CardMenuPriority from "../../../_components/priority-menu";
import CardMenuStatus from "../../../_components/status-menu";

interface CardItemProps {
  data: Card;
  index: number;
  members: Member[];
}

export const CardItem = ({ data, index, members }: CardItemProps) => {
  const cardModal = useCardModal();

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white dark:bg-zinc-800 rounded-md shadow-sm"
        >
          <div onClick={() => cardModal.onOpen(data.id, data)}>
            {data.title}
          </div>
          <Separator className="bg-zinc-600 my-1" />
          <div className="flex flex-row justify-between">
            <div className="flex space-x-1">
              <CardMenuPriority id={data.id} currentPriority={data.priority} />
              <CardMenuStatus id={data.id} currentStatus={data.status} />
            </div>
            <ChangeDueDate
              id={data.id}
              currentDueDate={data.duedate as Date}
            />
          </div>
          <div>
            <ChangeCardAssignee
              id={data.id}
              currentAssigneeId={data.assigneeId as string}
              members={members as Member[]}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};
