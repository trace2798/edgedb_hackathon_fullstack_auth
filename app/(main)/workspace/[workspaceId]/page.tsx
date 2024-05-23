import { Card, CardHeader } from "@/components/ui/card";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { workspaceId: string } }) => {
  redirect(`${params.workspaceId}/tasks`);
};

export default Page;
