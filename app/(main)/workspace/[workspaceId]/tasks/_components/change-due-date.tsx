"use client";
import { updateDueDate } from "@/actions/issues";
import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarClock } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  id: z.string(),
  duedate: z.any().optional(),
});
interface ChangeDueDateProps {
  id: string;
  currentDueDate: Date | null;
}

const ChangeDueDate: FC<ChangeDueDateProps> = ({ id, currentDueDate }) => {
  // console.log(currentDueDate);
  // const user = useCurrentUser();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const FetchUser = async () => {
      const currentUser = await useCurrentUser();
      setUser(currentUser);
    };

    FetchUser();
  }, []);

  // console.log(user);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: id,
      duedate: currentDueDate,
    },
  });
  type FormData = z.infer<typeof formSchema>;
  const { watch } = form;
  const watchedDueDate = watch("duedate");

  // useEffect(() => {
  //   if (watchedDueDate !== currentDueDate) {
  //     onSubmit({ id, duedate: watchedDueDate });
  //   }
  // }, [watchedDueDate]);
  useEffect(() => {
    if (
      watchedDueDate === null ||
      (watchedDueDate &&
        currentDueDate &&
        watchedDueDate.getTime() === currentDueDate.getTime())
    ) {
      return;
    }
    onSubmit({ id, duedate: watchedDueDate });
  }, [watchedDueDate, currentDueDate]);

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      // console.log(values);
      const response = await updateDueDate(
        values.id,
        values.duedate as Date,
        user?.id as string
      );
      if (response === "Task Due Date Updated") {
        toast.success("Due Date updated");
        router.refresh();
      } else {
        toast.error(response);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating due date.");
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
                          className="text-muted-foreground hover:text-indigo-400"
                        >
                          <HoverCard>
                            <HoverCardTrigger className="flex items-center">
                              {field.value ? (
                                <>
                                  {/* <CalendarClock className="w-4 h-4 mr-1" />
                                  {field.value ? (
                                    format(field.value, "MMM dd")
                                  ) : (
                                    <span>Due Date</span>
                                  )} */}
                                  <div
                                    className={`${
                                      isPastDue(field.value)
                                        ? "text-red-500" // Red for past due
                                        : isToday(field.value)
                                        ? "text-orange-500" // Orange for today
                                        : "text-green-500" // Green for future due date
                                    } flex items-center`}
                                  >
                                    <CalendarClock className="w-4 h-4 mr-1" />
                                    <span>{format(field.value, "MMM dd")}</span>
                                  </div>
                                </>
                              ) : (
                                "Due Date"
                              )}
                            </HoverCardTrigger>
                            <HoverCardContent
                              className={buttonVariants({
                                variant: "sidebar",
                                size: "sidebar",
                                className: "w-fit px-2 dark:bg-black",
                              })}
                            >
                              Click to change due date
                            </HoverCardContent>
                          </HoverCard>
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-fit p-0">
                      <Calendar
                        mode="single"
                        selected={field.value ?? new Date()}
                        onSelect={field.onChange}
                        disabled={(date) => date <= new Date() || isLoading}
                        initialFocus
                      />
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

export default ChangeDueDate;

const isPastDue = (dueDate: Date) => {
  const today = new Date();
  return dueDate < today;
};

const isToday = (dueDate: Date) => {
  const today = new Date();
  return dueDate.toDateString() === today.toDateString();
};
