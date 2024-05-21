"use client";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCurrentUser } from "@/hooks/use-current-user";
import { priorities } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  MoreHorizontal,
  ShieldAlert,
  Signal,
  SignalLow,
  SignalMedium,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { updateCardPriority } from "@/actions/card";
import { User } from "@/types";

const formSchema = z.object({
  id: z.string(),
  priority: z.string(),
});
interface CardMenuPriorityProps {
  id: string;
  currentPriority: string;
  displayTitle?: boolean;
}

const priorityIcons = {
  low: SignalLow,
  medium: SignalMedium,
  high: Signal,
  urgent: ShieldAlert,
  "no priority": MoreHorizontal,
};
const CardMenuPriority: FC<CardMenuPriorityProps> = ({
  id,
  currentPriority,
  displayTitle = false,
}) => {
  // const user = useCurrentUser();
  const [user, setUser] = useState<User | null>(null);
 
  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await useCurrentUser();
      setUser(currentUser);
    };

    fetchUser();
  }, []);
 
  console.log(user);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: id,
      priority: currentPriority,
    },
  });
  type FormData = z.infer<typeof formSchema>;

  const PriorityIcon =
    priorityIcons[currentPriority as keyof typeof priorityIcons];
  const { watch } = form;
  const watchedPriority = watch("priority");

  useEffect(() => {
    if (watchedPriority !== currentPriority) {
      onSubmit({ id, priority: watchedPriority });
    }
  }, [watchedPriority]);

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      console.log(values);
      const response = await updateCardPriority(
        values.id,
        values.priority,
        user?.id as string
      );
      if (response === "Card Priority Updated") {
        toast.success("Priority updated");
        router.refresh();
      } else {
        toast.error(response);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating priority.");
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
              name="priority"
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
                                  {PriorityIcon && (
                                    <PriorityIcon
                                      className={`w-h h-4 text-xs capitalize ${
                                        field.value === "low"
                                          ? "text-green-500" // Green for low priority
                                          : field.value === "medium"
                                          ? "text-yellow-200" // Yellow for medium priority
                                          : field.value === "high"
                                          ? "text-orange-300" // Orange for high priority
                                          : field.value === "urgent"
                                          ? "text-red-700" // Red for urgent
                                          : field.value === "no priority"
                                          ? "text-gray-500" // Gray for no priority
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
                                "Priority"
                              )}
                            </HoverCardTrigger>
                            <HoverCardContent
                              className={buttonVariants({
                                variant: "sidebar",
                                size: "sidebar",
                                className: "w-fit px-2 dark:bg-black",
                              })}
                            >
                              Click to change priority
                            </HoverCardContent>
                          </HoverCard>
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Priority options..." />
                        <CommandEmpty>No priority option found.</CommandEmpty>
                        <CommandGroup>
                          {priorities.map((priority) => (
                            <CommandItem
                              disabled={isLoading}
                              value={priority.label}
                              key={priority.value}
                              className="flex justify-between"
                              onSelect={() => {
                                form.setValue("priority", priority.value);
                              }}
                            >
                              <div className="flex items-center">
                                <priority.icon
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    priority.value === field?.value
                                      ? "opacity-100"
                                      : "opacity-40"
                                  )}
                                />
                                {priority.label}
                              </div>
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  priority.value === field.value
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

export default CardMenuPriority;
