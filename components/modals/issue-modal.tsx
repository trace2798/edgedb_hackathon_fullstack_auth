"use client";

import { createTask } from "@/actions/issues";
import { Member } from "@/app/(main)/workspace/[workspaceId]/members/_components/members/column";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useIssues } from "@/hooks/use-issues";
import { priorities, statuses } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Check } from "lucide-react";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Spinner } from "../spinner";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { User } from "@/types";

interface IssueModalProps extends React.HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(0).max(250),
  status: z.string().min(2).max(50),
  priority: z.string().min(2).max(50),
  assigneeId: z.string().min(2).max(50),
  duedate: z.date().optional(),
});

export function IssueModal({ className, ...props }: IssueModalProps) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const FetchUser = async () => {
      const currentUser = await useCurrentUser();
      setUser(currentUser);
    };

    FetchUser();
  }, []);

  // console.log(user);
  const issues = useIssues();
  const members = useIssues((state) => state.members);
  const defaultStatus = useIssues((state) => state.defaultStatus);
  // console.log(defaultStatus);
  // console.log(members);
  // const user = useCurrentUser();
  // console.log(user);
  const membershipIdOfCurrentUser = findCurrentUsersMembershipId(
    members as Member[],
    user as User
  ) as string;
  // console.log(membershipIdOfCurrentUser);

  useEffect(() => {
    form.setValue("assigneeId", membershipIdOfCurrentUser);
    form.setValue("status", defaultStatus);
  }, [membershipIdOfCurrentUser, defaultStatus]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      status: defaultStatus as string,
      priority: "no priority",
      assigneeId: membershipIdOfCurrentUser as string,
      duedate: undefined,
    },
  });
  type FormData = z.infer<typeof formSchema>;
  {
    // console.log(form.getValues());
  }
  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      setLoading(true);

      // console.log(values);
      const response = await createTask(
        user?.id as string,
        values.title,
        values.description,
        values.status,
        values.priority,
        values.assigneeId,
        values.duedate
      );
      if (response === "Task Created") {
        form.reset();
        toast.success("Task Created.");
        router.refresh();
        issues.onClose();
      } else {
        toast.error(response);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error creating Workspace.");
    }
  };
  const isLoading = form.formState.isSubmitting;

  return (
    <Dialog open={issues.isOpen} onOpenChange={issues.onClose}>
      <DialogContent className="">
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium text-neutral-200">
            Create a Task
          </h2>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full grid-cols-12 gap-2 px-2 py-0 border-none rounded-lg md:px-0 focus-within:shadow-sm border-zinc-800"
          >
            <div className="grid gap-3">
              <div className="grid gap-1">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="title"
                          placeholder="Task Title"
                          type="text"
                          autoCorrect="off"
                          disabled={isLoading}
                          className="border-none text-neutral-100"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            id="description"
                            placeholder="Add description...(optional) [max 250 words]"
                            autoCorrect="off"
                            disabled={isLoading}
                            className="border-none focus-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-3 mt-3">
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
                                className="bg-secondary min-w-[80px] hover:text-sm hover:text-indigo-400 hover:bg-inherit"
                              >
                                {field.value
                                  ? statuses.find(
                                      (status) => status.value === field.value
                                    )?.label
                                  : "Status"}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Search options..." />
                              <CommandEmpty>
                                No status option found.
                              </CommandEmpty>
                              <CommandGroup>
                                {statuses.map((status) => (
                                  <CommandItem
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
                                className="bg-secondary min-w-[80px] hover:text-sm hover:text-indigo-400 hover:bg-inherit"
                              >
                                {field.value
                                  ? priorities.find(
                                      (priority) =>
                                        priority.value === field.value
                                    )?.label
                                  : "Priority"}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Search options..." />
                              <CommandEmpty>
                                No priority option found.
                              </CommandEmpty>
                              <CommandGroup>
                                {priorities.map((priority) => (
                                  <CommandItem
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
                                className="bg-secondary min-w-[80px] hover:text-sm hover:text-indigo-400 hover:bg-inherit"
                              >
                                {field.value
                                  ? members?.find(
                                      (member) =>
                                        (member?.id as string) === field.value
                                    )?.githubUsername
                                  : "Assignee"}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Search members..." />
                              <CommandEmpty>No member found.</CommandEmpty>
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
                  <FormField
                    control={form.control}
                    name="duedate"
                    render={({ field }) => (
                      <FormItem>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="sidebar"
                                size={"sidebar"}
                                role="combobox"
                                className="bg-secondary min-w-[80px] hover:text-sm hover:text-indigo-400 hover:bg-inherit"
                              >
                                {field.value ? (
                                  format(field.value, "MMM dd")
                                ) : (
                                  <span>Due Date</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-fit p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button disabled={isLoading} className="mt-5">
                  {isLoading && <Spinner />}
                  Create Task
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function findCurrentUsersMembershipId(members: Member[], user: User) {
  for (let i = 0; i < members.length; i++) {
    if (members[i].userId === user.id) {
      return members[i].id;
    }
  }
  return null;
}
