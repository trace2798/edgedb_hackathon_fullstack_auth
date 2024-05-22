"use client";

import { cn } from "@/lib/utils";
import { ListWithCards } from "@/types";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { ElementRef, useRef, useState } from "react";
import { Member } from "../../../../members/_components/members/column";
import CardForm from "./card-form";
import { CardItem } from "./card-item";
import { ListHeader } from "./list-header";

interface ListItemProps {
  data: ListWithCards;
  index: number;
  members: Member[];
}

export const ListItem = ({ data, index, members }: ListItemProps) => {
  // console.log(data);
  const textareaRef = useRef<ElementRef<"textarea">>(null);
  // console.log(data);
  const [isEditing, setIsEditing] = useState(false);

  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="shrink-0 h-full w-[272px] select-none"
        >
          <div
            {...provided.dragHandleProps}
            className="w-full rounded-md  bg-slate-600/50 shadow-md pb-2"
          >
            <ListHeader onAddCard={enableEditing} data={data} />
            <Droppable droppableId={data.id} type="card">
              {(provided) => (
                <ol
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    "mx-1 px-1 py-0.5 flex flex-col gap-y-2",
                    data.cards.length > 0 ? "mt-2" : "mt-0"
                  )}
                >
                  {data.cards.map((card, index) => (
                    <CardItem
                      index={index}
                      key={card.id}
                      data={card}
                      members={members as Member[]}
                    />
                  ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>
            <CardForm
              listId={data.id}
              tenant_id={data.workspaceId}
              members={members as Member[]}
            />
          </div>
        </li>
      )}
    </Draggable>
  );
};
