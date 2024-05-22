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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Member } from "../../members/_components/members/column";
import { updateCardAssigneeId } from "@/actions/card";
import { User } from "@/types";

const formSchema = z.object({
  id: z.string(),
  assigneeId: z.string(),
});
interface ChangeCardAssigneeProps {
  id: string;
  currentAssigneeId: string;
  displayTitle?: boolean;
  members: Member[];
}

const ChangeCardAssignee: FC<ChangeCardAssigneeProps> = ({
  id,
  currentAssigneeId,
  displayTitle = false,
  members,
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
      assigneeId: currentAssigneeId,
    },
  });
  type FormData = z.infer<typeof formSchema>;
  const { watch } = form;
  const watchedAssigneeId = watch("assigneeId");

  useEffect(() => {
    if (watchedAssigneeId !== currentAssigneeId) {
      onSubmit({ id, assigneeId: watchedAssigneeId });
    }
  }, [watchedAssigneeId]);

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      console.log(values);
      const response = await updateCardAssigneeId(
        values.id,
        values.assigneeId,
        user?.id as string
      );
      if (response === "Card Assignee Updated") {
        toast.success("Assignee updated");
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
              name="assigneeId"
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
                            <HoverCardTrigger className="flex items-center capitalize text-sm">
                              {field.value
                                ? members?.find(
                                    (member) =>
                                      (member?.id as string) === field.value
                                  )?.githubUsername
                                : "Assignee"}
                            </HoverCardTrigger>
                            <HoverCardContent
                              className={buttonVariants({
                                variant: "sidebar",
                                size: "sidebar",
                                className: "w-fit px-2 dark:bg-black",
                              })}
                            >
                              Click to change assignee
                            </HoverCardContent>
                          </HoverCard>
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search Members..." />
                        <CommandEmpty>No status option found.</CommandEmpty>
                        <CommandGroup>
                          {members?.map((member) => (
                            <CommandItem
                              value={member.id}
                              key={member.id}
                              className="flex justify-between"
                              onSelect={() => {
                                form.setValue("assigneeId", member.id);
                              }}
                            >
                              <div className="flex items-center">
                                {member.githubUsername}
                              </div>
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  member.id === field.value
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

export default ChangeCardAssignee;
