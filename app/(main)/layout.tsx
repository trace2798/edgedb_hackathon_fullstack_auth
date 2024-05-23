import { auth } from "@/edgedb";
import { Metadata } from "next";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Productivus: Workspace",
  description: "Efficiently manage your tasks",
  
};

const MainLayout = async ({ children }: Props) => {
  const session = auth.getSession();
  const signedIn = await session.isSignedIn();
  if (!signedIn) {
    redirect("/");
  }
  return <>{children}</>;
};

export default MainLayout;
