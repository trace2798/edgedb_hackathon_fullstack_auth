"use client";

import { useCardModal } from "@/hooks/use-card-modal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Header } from "./card/header";
import { Description } from "./card/description";
import { Actions } from "./card/actions";
import ChangeDueDate from "@/app/(main)/workspace/[workspaceId]/boards/_components/duedate-menu";
import { LocalDateTime } from "edgedb";

// import { Activity } from "./activity";

export const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const cardData = useCardModal((state) => state.data);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent>
        {!cardData
          ? <Header.Skeleton />
          : <Header data={cardData} />
        }
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {!cardData
                ? <Description.Skeleton />
                : <Description data={cardData} />
              }
              {/* {!auditLogsData
                ? <Activity.Skeleton />
                : <Activity items={auditLogsData} />
              } */}
            </div>
          </div>
          {!cardData
            ? <Actions.Skeleton />
            : <Actions data={cardData} />
          }
           {/* <ChangeDueDate
              id={cardData?.id as string}
              currentDueDate={cardData?.duedate as LocalDateTime}
            /> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};


