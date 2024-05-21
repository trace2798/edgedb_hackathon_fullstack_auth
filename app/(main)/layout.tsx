import { auth } from "@/edgedb";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
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
