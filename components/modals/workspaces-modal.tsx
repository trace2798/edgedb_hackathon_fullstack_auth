"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Spinner } from "../spinner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useWorkspaces } from "@/hooks/use-workspaces";
import { createWorkspace } from "@/actions/workspace";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Textarea } from "../ui/textarea";
import { User } from "@/types";

interface WorkspaceModalProps extends React.HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(0).max(150),
});

export function WorkspaceModal({ className, ...props }: WorkspaceModalProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const FetchUser = async () => {
      const currentUser = await useCurrentUser();
      setUser(currentUser);
    };

    FetchUser();
  }, []);
  const workspaces = useWorkspaces();
  // console.log(user);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  type FormData = z.infer<typeof formSchema>;

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      setLoading(true);
      await createWorkspace(
        user?.id as string,
        values.name,
        values.description
      );
      form.reset();
      toast.success("Workspace Created.");
      router.refresh();
      workspaces.onClose();
    } catch (error) {
      console.error(error);
      toast.error("Error creating Workspace.");
    }
  };
  const isLoading = form.formState.isSubmitting;

  return (
    <Dialog open={workspaces.isOpen} onOpenChange={workspaces.onClose}>
      <DialogContent className="bg-zinc-950 border-zinc-800">
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium text-neutral-200">
            Create an Workspace
          </h2>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full grid-cols-12 gap-2 px-2 py-4 mt-5 border rounded-lg md:px-4 focus-within:shadow-sm border-zinc-800"
          >
            <div className="grid gap-3 ">
              <div className="grid gap-1 ">
                <Label className="mb-3 text-neutral-300" htmlFor="name">
                  Name
                </Label>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="name"
                          placeholder="Name of the workspace"
                          type="text"
                          autoCorrect="off"
                          disabled={isLoading}
                          className="bg-zinc-800 border-zinc-600 text-neutral-100"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <Label
                    className="mb-3 text-neutral-300"
                    htmlFor="description"
                  >
                    Description
                  </Label>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            id="description"
                            placeholder="What is this workspace for?(optional)"
                            autoCorrect="off"
                            disabled={isLoading}
                            className="bg-zinc-800 border-zinc-600 text-neutral-100"
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
                  Create Workspace
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
