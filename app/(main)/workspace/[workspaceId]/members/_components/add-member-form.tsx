"use client";
import { addMemberByGithubUsername } from "@/actions/member";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  githubUsername: z.string().min(2).max(50),
});
interface AddMemberFormProps {
  workspaceId: string;
}

const AddMemberForm: FC<AddMemberFormProps> = ({ workspaceId }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      githubUsername: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await addMemberByGithubUsername(values.githubUsername, workspaceId);
    console.log(response);
    if (response === "Done") {
      toast.success("Member Added");
      form.reset();
      router.refresh();
    } else {
      toast.error(response);
    }
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="githubUsername"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Github Username</FormLabel>
                <FormControl>
                  <Input className="max-w-2xl" placeholder="Github Username" {...field} />
                </FormControl>
                <FormDescription>
                  User needs to have an account in productivus.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Add Member</Button>
        </form>
      </Form>
    </>
  );
};

export default AddMemberForm;
