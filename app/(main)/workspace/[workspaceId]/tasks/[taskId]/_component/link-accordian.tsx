"use client";
import { FC } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ExternalLink } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button, buttonVariants } from "@/components/ui/button";
import AddLinkModal from "@/components/modals/add-link-modal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteWebLink } from "@/actions/links";

// interface LinkAccordianProps {
//   webLinks: any;
// }

const LinkAccordian  = ({ weblinks, taskId }: {weblinks : {id: string; url: string; description: string }[], taskId: string}) => {
  const router = useRouter();
  const removeWebLink = async (id: string) => {
    try {
      const response = await deleteWebLink(id);
      if (response === "Done") {
        toast.success("Web Link Removed");
        router.refresh();
      } else {
        toast.error(response);
      }
    } catch (error) {
      toast.error("Error removing web link.");
    }
  };
  // console.log(weblinks);
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
              Links
            </AccordionTrigger>
            <AccordionContent className="space-y-3">
              {weblinks?.map(
                (link: { id: string; url: string; description: string }) => (
                  <div
                    key={link.id}
                    className="flex flex-col text-ellipsis overflow-hidden border rounded-xl px-2 py-1"
                  >
                    <div className="flex justify-between items-center">
                      <div className="overflow-hidden h-6">
                        <HoverCard>
                          <HoverCardTrigger>
                            <a
                              href={link.url}
                              target="_blank"
                              className=" hover:text-indigo-400 text-sm"
                            >
                              {link.description || link.url}
                            </a>
                          </HoverCardTrigger>
                          <HoverCardContent className="break-words text-sm">
                            <p>{link.description || link.url}</p>
                          </HoverCardContent>
                        </HoverCard>
                      </div>
                      <div className="flex space-x-2 items-center">
                        <a
                          href={link.url}
                          target="_blank"
                          className="text-base hover:text-indigo-400 "
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <Button
                          onClick={() => removeWebLink(link.id)}
                          variant={"sidebar"}
                          size={"sidebar"}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              )}
              {weblinks.length === 0 && (
                <div className="flex flex-col items-center justify-center">
                  <h1>No links added</h1>
                  <br />
                  <AddLinkModal taskId={taskId as string} />
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default LinkAccordian;
