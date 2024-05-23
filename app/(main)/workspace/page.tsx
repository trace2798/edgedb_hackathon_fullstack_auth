import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FC } from "react";
import AddWorkspaceButton from "./_components/add-workspace-button";
import e, { createClient } from "@/dbschema/edgeql-js";
// import { auth } from "@/auth";
import Link from "next/link";
import Starfield from "@/components/star-field";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/edgedb";
import { useCurrentUser } from "@/hooks/use-current-user";
import { User } from "@/types";
import { Metadata } from "next";

interface PageProps {}

const client = createClient();

export const metadata: Metadata = {
  title: "Productivus: Workspace",
  description: "Efficiently manage your tasks",
};
const Page: FC<PageProps> = async ({}) => {
 
  const session = auth.getSession();
  const signedIn = await session.isSignedIn();
  // console.log(session);
  const user = (await useCurrentUser()) as User;
  // console.log(user);
  const workspaces = await e
    .select(e.Workspace, (workspace) => ({
      id: true,
      name: true,
      filter: e.op(workspace.user.id, "=", e.uuid(user?.id as string)),
      order_by: {
        expression: workspace.created,
        direction: e.DESC,
      },
    }))
    .run(client);
  // console.log(workspaces);
  // // query selects Workspace objects where the current user is a member but not the creator, and it returns the id and name properties of these workspaces.
  const workspaceMember = await e
    .select(e.Workspace, (workspace) => ({
      id: true,
      name: true,
      filter: e.op(
        e.op(
          workspace.workspaceMembers.user.id,
          "=",
          e.uuid(user?.id as string)
        ),
        "and",
        e.op(workspace.user.id, "!=", e.uuid(user?.id as string))
      ),
      order_by: {
        expression: workspace.created,
        direction: e.DESC,
      },
    }))
    .run(client);
  // console.log(workspaceMember);
  return (
    <>
      <div className=" flex flex-col pt-24 items-center text-center bg-zinc-950 h-[100vh] w-[100vw]">
        <Starfield
          starCount={1000}
          starColor={[255, 255, 255]}
          speedFactor={0.09}
          backgroundColor="black"
        />
        <Card className=" mb-5 border-none bg-transparent">
          <CardHeader>
            <CardTitle className="text-neutral-200">Workspaces</CardTitle>
            <CardDescription>Your Workspaces</CardDescription>
          </CardHeader>
        </Card>
        <Card className=" mb-5 border-none">
          <AddWorkspaceButton />
        </Card>
        <div>
          {workspaces.map((workspace: { id: string; name: string }) => (
            <Link
              href={`/workspace/${workspace.id}`}
              className="group space-y-3 mt-3"
              key={workspace.id}
            >
              <Card
                key={workspace.id}
                className="p-5 text-center group-hover:text-indigo-400 w-[350px] mb-3 bg-transparent border-zinc-900 text-neutral-200"
              >
                <h1>{workspace.name}</h1>
              </Card>
            </Link>
          ))}
        </div>
        {workspaceMember.length > 0 && (
          <>
            <Separator />
            <Card className=" border-none bg-transparent">
              <CardHeader>
                <CardDescription>
                  You are member of the following workspaces
                </CardDescription>
              </CardHeader>
            </Card>
            <div className="mt-5">
              {workspaceMember.map(
                (workspace: { id: string; name: string }) => (
                  <Link
                    href={`/workspace/${workspace.id}`}
                    className="group space-y-3 mt-3"
                    key={workspace.id}
                  >
                    <Card
                      key={workspace.id}
                      className="p-5 text-center group-hover:text-indigo-400 w-[350px] mb-3 bg-transparent border-zinc-900 text-neutral-200"
                    >
                      <h1>{workspace.name}</h1>
                    </Card>
                  </Link>
                )
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Page;
