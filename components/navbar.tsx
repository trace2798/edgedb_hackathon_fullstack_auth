import { FC } from "react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import Link from "next/link";
import UserAccountNav from "./user-account-nav";
import { Target } from "lucide-react";
import { auth } from "@/edgedb";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LocalDateTime } from "edgedb";

interface NavBarProps {}
type User = {
  githubUsername: string;
  name: string;
  email: string | null;
  id: string;
  avatarUrl: string;
  created: LocalDateTime;
  updated: LocalDateTime;
  userRole: string;
};
const NavBar: FC<NavBarProps> = async ({}) => {
  const session = auth.getSession();
  const signedIn = await session.isSignedIn();
  // console.log(session);
  const user = (await useCurrentUser()) as User;
  // console.log(user);

  return (
    <>
      <div className="pt-5 pb-2 shadow-md dark:shadow-sm dark:shadow-blue-50 px-[10vw] flex justify-between items-center fixed top-0 left-0 w-full backdrop-blur-sm">
        <div>
          <Link
            href="/"
            className="flex group items-center text-xl font-semibold tracking-wide bg-gradient-to-r bg-clip-text text-transparent from-indigo-500  to-indigo-300 hover:cursor-pointer"
          >
            <Target className="mr-3 text-primary group-hover:text-indigo-400" />{" "}
            <span className="underline-offset-4 group-hover:underline">
              Productivus
            </span>
          </Link>
        </div>
        <div className="flex space-x-3 items-center">
          <ModeToggle />
          {user && signedIn && (
            <UserAccountNav
              email={user?.email as string}
              name={user?.name as string}
              imageUrl={user?.avatarUrl as string}
            />
          )}
          {!signedIn && (
            <Link href={auth.getBuiltinUISignUpUrl()}>
              <Button variant="outline">Get Started</Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
