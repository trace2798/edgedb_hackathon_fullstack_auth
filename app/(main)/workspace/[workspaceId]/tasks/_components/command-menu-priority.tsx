"use client";
import { updatePriority } from "@/actions/issues";
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
import { User } from "@/types";

const formSchema = z.object({
  id: z.string(),
  priority: z.string(),
});
interface CommandMenuPriorityProps {
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
const CommandMenuPriority: FC<CommandMenuPriorityProps> = ({
  id,
  currentPriority,
  displayTitle = false,
}) => {
  // const user = useCurrentUser();
  const [user, setUser] = useState<User | null>(null);
 
  useEffect(() => {
    const FetchUser = async () => {
      const currentUser = await useCurrentUser();
      setUser(currentUser);
    };

    FetchUser();
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
      const response = await updatePriority(
        values.id,
        values.priority,
        user?.id as string
      );
      if (response === "Task Priority Updated") {
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

export default CommandMenuPriority;

// "use client";
// import { Button } from "@/components/ui/button";
// import {
//   Command,
//   CommandDialog,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Priority, priorities } from "@/lib/constant";
// import { cn } from "@/lib/utils";
// import {
//   Check,
//   MoreHorizontal,
//   ShieldAlert,
//   Signal,
//   SignalLow,
//   SignalMedium,
// } from "lucide-react";
// import { FC, useEffect, useRef, useState } from "react";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// const formSchema = z.object({
//   id: z.string(),
//   priority: z.string(),
// });
// interface CommandMenuPriorityProps {
//   id: string;
//   currentPriority: string;
// }

// const priorityIcons = {
//   low: SignalLow,
//   medium: SignalMedium,
//   high: Signal,
//   urgent: ShieldAlert,
//   "no priority": MoreHorizontal,
// };
// const CommandMenuPriority: FC<CommandMenuPriorityProps> = ({
//   id,
//   currentPriority,
// }) => {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       id: id,
//       priority: currentPriority,
//     },
//   });
//   const [open, setOpen] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const isHoveredRef = useRef(false);
//   const currentPriorityInfo = priorities.find(
//     (priority) => priority.value === currentPriority
//   );
//   const PriorityIcon =
//     priorityIcons[currentPriority as keyof typeof priorityIcons];

//   function onSubmit(values: z.infer<typeof formSchema>) {
//     // Do something with the form values.
//     // ✅ This will be type-safe and validated.
//     console.log(values);
//   }

//   // useEffect(() => {
//   //   const down = (e: KeyboardEvent) => {
//   //     if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
//   //       e.preventDefault();
//   //       setOpen((open) => !open);
//   //     }
//   //   };

//   //   document.addEventListener("keydown", down);
//   //   return () => document.removeEventListener("keydown", down);
//   // }, []);
//   // useEffect(() => {
//   //   const down = (e: KeyboardEvent) => {
//   //     if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
//   //       e.preventDefault();
//   //       if (isHovered) {
//   //         setOpen((open) => !open);
//   //       }
//   //     }
//   //   };

//   //   document.addEventListener("keydown", down);
//   //   return () => document.removeEventListener("keydown", down);
//   // }, [isHovered]);
//   useEffect(() => {
//     const down = (e: KeyboardEvent) => {
//       if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
//         e.preventDefault();
//         if (isHoveredRef.current) {
//           setOpen((open) => !open);
//         }
//       }
//     };

//     document.addEventListener("keydown", down);
//     return () => document.removeEventListener("keydown", down);
//   }, []);

//   console.log(setIsHovered);
//   console.log(isHovered);
//   return (
//     <>
//       <div
//         onMouseEnter={() => {
//           isHoveredRef.current = true;
//         }}
//         onMouseLeave={() => {
//           isHoveredRef.current = false;
//         }}
//         className="flex items-center space-x-4"
//       >
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="flex flex-col w-full grid-cols-12 gap-2 px-2 py-0 border-none rounded-lg md:px-0 focus-within:shadow-sm border-zinc-800"
//           >
//             <FormField
//               control={form.control}
//               name="priority"
//               render={({ field }) => (
//                 <FormItem>
//                   {/* <Popover>
//                     <PopoverTrigger asChild> */}
//                   <FormControl>
//                     <Button
//                       variant="sidebar"
//                       size={"sidebar"}
//                       role="combobox"
//                       className="text-muted-foreground hover:text-indigo-400"
//                     >
//                       {field.value ? (
//                         <>
//                           {PriorityIcon && (
//                             <PriorityIcon className="w-4 h-4 mr-1" />
//                           )}
//                         </>
//                       ) : (
//                         "Priority"
//                       )}
//                     </Button>
//                   </FormControl>
//                   {/* </PopoverTrigger>
//                     <PopoverContent className="w-[200px] p-0"> */}
//                   <CommandDialog open={open} onOpenChange={setOpen}>
//                     <CommandInput placeholder="Priority options..." />
//                     <CommandEmpty>No priority option found.</CommandEmpty>
//                     <CommandGroup>
//                       {priorities.map((priority) => (
//                         <CommandItem
//                           value={priority.label}
//                           key={priority.value}
//                           className="flex justify-between"
//                           onSelect={() => {
//                             form.setValue("priority", priority.value);
//                           }}
//                         >
//                           <div className="flex items-center">
//                             <priority.icon
//                               className={cn(
//                                 "mr-2 h-4 w-4",
//                                 priority.value === field?.value
//                                   ? "opacity-100"
//                                   : "opacity-40"
//                               )}
//                             />
//                             {priority.label}
//                           </div>
//                           <Check
//                             className={cn(
//                               "mr-2 h-4 w-4",
//                               priority.value === field.value
//                                 ? "opacity-100"
//                                 : "opacity-0"
//                             )}
//                           />
//                         </CommandItem>
//                       ))}
//                     </CommandGroup>
//                   </CommandDialog>
//                   {/* </PopoverContent> */}
//                   {/* </Popover> */}
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </form>
//         </Form>
//       </div>
//     </>
//   );
// };

// export default CommandMenuPriority;
