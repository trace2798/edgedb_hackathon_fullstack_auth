"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { ListForm } from "./list-form";
import { ListItem } from "./list-item";
import { updateCardOrder } from "@/actions/update-card-order";
import { updateListOrder } from "@/actions/update-list-order";
import { Member } from "../../../../members/_components/members/column";
import {  Card, ListWithCards } from "@/types";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
  workspaceId: string;
  members: Member[];
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export const ListContainer = ({
  data,
  boardId,
  workspaceId,
  members,
}: ListContainerProps) => {
  // console.log(data);
  const [orderedData, setOrderedData] = useState(data);

  const executeUpdateListOrder = async ({
    items,
    boardId,
    workspaceId,
  }: any) => {
    // console.log(items);
    const response = await updateListOrder(items, boardId, workspaceId);
    // console.log(response);
    if (response === "Done") {
      toast.success("List reordered");
    } else {
      toast.error(response);
    }
  };

  const executeUpdateCardOrder = async ({
    items,
    boardId,
    workspaceId,
  }: any) => {
    const response = await updateCardOrder(items, boardId, workspaceId);
    // console.log(response);
    if (response === "Done") {
      toast.success("Card reordered");
    } else {
      toast.error(response);
    }
  };

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    // if dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // User moves a list
    if (type === "list") {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );

      setOrderedData(items);
      executeUpdateListOrder({ items, boardId, workspaceId });
    }

    // User moves a card
    if (type === "card") {
      let newOrderedData = [...orderedData];

      // Source and destination list
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );
      const destList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destList) {
        return;
      }

      // Check if cards exists on the sourceList
      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      // Check if cards exists on the destList
      if (!destList.cards) {
        destList.cards = [];
      }

      // Moving the card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards: Card[] = reorder(
          sourceList.cards as Card[],
          source.index,
          destination.index
        );

        reorderedCards.forEach((card: Card, idx: number) => {
          card.order = idx;
        });
        // console.log(reorderedCards);
        sourceList.cards = reorderedCards;

        setOrderedData(newOrderedData);
        executeUpdateCardOrder({
          items: reorderedCards,
          boardId: boardId,
          workspaceId: workspaceId,
        });
        // const response =
        // User moves the card to another list
      } else {
        // Remove card from the source list
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        // Assign the new listId to the moved card
        movedCard.list_id = destination.droppableId;

        // Add card to the destination list
        destList.cards.splice(destination.index, 0, movedCard);

        sourceList.cards.forEach((card: Card, idx: number) => {
          card.order = idx;
        });

        // Update the order for each card in the destination list
        destList.cards.forEach((card: Card, idx: number) => {
          card.order = idx;
        });

        setOrderedData(newOrderedData);
        executeUpdateCardOrder({
          items: destList.cards,
          boardId: boardId,
          workspaceId: workspaceId,
        });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedData.map((list, index) => {
              return (
                <ListItem
                  key={list.id}
                  index={index}
                  data={list}
                  members={members as Member[]}
                />
              );
            })}
            {provided.placeholder}
            <ListForm boardId={boardId} workspaceId={workspaceId} />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
