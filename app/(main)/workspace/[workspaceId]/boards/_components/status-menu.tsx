"use client";
import { updateCardStatus } from "@/actions/card";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useCurrentUser } from "@/hooks/use-current-user";
import { statuses } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    ArrowUpCircle,
    Check,
    CheckCircle2,
    Circle,
    CircleArrowOutUpRight,
    CircleDotDashed,
    XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  id: z.string(),
  status: z.string(),
});
interface CardMenuStatusProps {
  id: string;
  currentStatus: string;
  displayTitle?: boolean;
}

const statusIcons = {
  future: CircleDotDashed,
  todo: Circle,
  "in progress": ArrowUpCircle,
  done: CheckCircle2,
  canceled: XCircle,
  "in review": CircleArrowOutUpRight,
};
const CardMenuStatus: FC<CardMenuStatusProps> = ({
  id,
  currentStatus,
  displayTitle = false,
}) => {
  const user = useCurrentUser();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: id,
      status: currentStatus,
    },
  });
  type FormData = z.infer<typeof formSchema>;
  const StatusIcon = statusIcons[currentStatus as keyof typeof statusIcons];
  const { watch } = form;
  const watchedStatus = watch("status");

  useEffect(() => {
    if (watchedStatus !== currentStatus) {
      onSubmit({ id, status: watchedStatus });
    }
  }, [watchedStatus]);

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      console.log(values);
      const response = await updateCardStatus(
        values.id,
        values.status,
        user?.id as string
      );
      if (response === "Card Status Updated") {
        toast.success("Status updated");
        router.refresh();
      } else {
        toast.error(response);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating status.");
    }
  };
  const isLoading = form.formState.isSubmitting;

  return (
    <>
      <div className="flex items-center space-x-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full grid-cols-12 gap-2 px-2 py-0 border-none rounded-lg md:px-0 focus-within:shadow-sm border-zinc-800"
          >
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="sidebar"
                          size={"sidebar"}
                          role="combobox"
                          className="text-muted-foreground hover:text-indigo-400"
                        >
                          <HoverCard>
                            <HoverCardTrigger className="flex items-center">
                              {field.value ? (
                                <>
                                  {StatusIcon && (
                                    <StatusIcon
                                      className={`w-h h-4 text-xs capitalize ${
                                        field.value === "future"
                                          ? "text-blue-500" // Blue for future tasks
                                          : field.value === "todo"
                                          ? "text-yellow-200" // Yellow for tasks that are to do
                                          : field.value === "in progress"
                                          ? "text-orange-600" // Orange for tasks in progress
                                          : field.value === "done"
                                          ? "text-indigo-500" // Green for done tasks
                                          : field.value === "canceled"
                                          ? "text-red-500" // Red for canceled tasks
                                          : field.value === "in review"
                                          ? "text-green-500" // Purple for tasks in review
                                          : ""
                                      }`}
                                    />
                                  )}
                                  {displayTitle && (
                                    <span className="ml-2 capitalize text-sm">
                                      {field.value.replace("-", " ")}
                                    </span>
                                  )}
                                </>
                              ) : (
                                "Status"
                              )}
                            </HoverCardTrigger>
                            <HoverCardContent
                              className={buttonVariants({
                                variant: "sidebar",
                                size: "sidebar",
                                className: "w-fit px-2 dark:bg-black",
                              })}
                            >
                              Click to change status
                            </HoverCardContent>
                          </HoverCard>
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Status options..." />
                        <CommandEmpty>No status option found.</CommandEmpty>
                        <CommandGroup>
                          {statuses.map((status) => (
                            <CommandItem
                              disabled={isLoading}
                              value={status.label}
                              key={status.value}
                              className="flex justify-between"
                              onSelect={() => {
                                form.setValue("status", status.value);
                              }}
                            >
                              <div className="flex items-center">
                                <status.icon
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    status.value === field?.value
                                      ? "opacity-100"
                                      : "opacity-40"
                                  )}
                                />
                                {status.label}
                              </div>
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  status.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </>
  );
};

export default CardMenuStatus;
