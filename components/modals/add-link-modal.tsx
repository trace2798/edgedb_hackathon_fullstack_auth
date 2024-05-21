"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExternalLink } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, buttonVariants } from "../ui/button";

import { createLink } from "@/actions/links";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "../spinner";
import { Textarea } from "../ui/textarea";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { User } from "@/types";

const formSchema = z.object({
  url: z.string().min(2),
  description: z.string().max(250).optional(),
});

interface AddLinkModalProps {
  issueId: string;
}

const AddLinkModal: FC<AddLinkModalProps> = ({ issueId }) => {
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
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      description: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    let url = values.url;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }
    // Update the values object
    values.url = url;

    console.log(values);
    const response = await createLink(
      user?.name as string,
      issueId,
      values.url,
      values.description
    );
    if (response === "Done") {
      setOpen(false);
      toast.success("Link Added");
      form.reset();
      router.refresh();
    } else {
      toast.error(response);
    }
  }
  const isLoading = form.formState.isSubmitting;

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <HoverCard>
          <HoverCardTrigger>
            <DialogTrigger
              className={buttonVariants({
                variant: "sidebar",
                size: "sidebar",
                className:
                  "w-fit px-2 text-muted-foreground hover:text-indigo-400 font-normal",
              })}
            >
              Add Link <ExternalLink className="h-4 w-4 ml-1" />
            </DialogTrigger>
          </HoverCardTrigger>
          <HoverCardContent
            className={buttonVariants({
              variant: "sidebar",
              size: "sidebar",
              className: "w-fit px-2 dark:bg-black",
            })}
          >
            Click to add website links
          </HoverCardContent>
        </HoverCard>{" "}
        <DialogContent className="">
          <DialogHeader className="border-b pb-3">
            <h2 className="text-lg font-medium text-neutral-200">Add link</h2>
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
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="title"
                            placeholder="https://"
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

                  <Button disabled={isLoading} className="mt-5">
                    {isLoading && <Spinner />}
                    Add Link
                  </Button>
                </div>
              </div>
            </form>
          </Form>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddLinkModal;
