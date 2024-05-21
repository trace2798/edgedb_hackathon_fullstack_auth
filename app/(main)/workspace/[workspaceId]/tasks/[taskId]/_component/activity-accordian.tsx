"use client";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { FC } from "react";



const ActivityAccordian = ({ taskActivities }: { taskActivities: { id: string; message: string }[] }) => {
  return (
    <>
      <div>
        <Accordion type="single" collapsible className="mt-5">
          <AccordionItem value="item-1">
            <AccordionTrigger
              className={buttonVariants({
                variant: "sidebar",
                size: "sidebar",
                className: "w-[50px] text-muted-foreground flex justify-start",
              })}
            >
              Activities
            </AccordionTrigger>
            <AccordionContent className="space-y-3">
              {taskActivities.map(
                (activity: { id: string; message: string }) => (
                  <>
                    <div
                      key={activity.id}
                      className="flex flex-col text-ellipsis overflow-hidden border rounded-xl px-3 py-1 "
                    >
                      <div className="flex justify-between">
                        <div className=" overflow-hidden h-6 text-sm">
                          {activity.message}
                        </div>
                      </div>
                    </div>
                  </>
                )
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default ActivityAccordian;
