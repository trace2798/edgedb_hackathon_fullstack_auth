// import { auth } from "@/auth";
import { auth } from "@/edgedb";
import { useCurrentUser } from "@/hooks/use-current-user";
import { User } from "@/types";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const HandleAuth = async () => {
  // const session = await auth.getSession();
  const session = auth.getSession();
  const signedIn = await session.isSignedIn();
  console.log(session);
  const User = (await useCurrentUser()) as User;
  if (!signedIn) throw new Error("Unauthorized");
  return { userId:  User.id};
};

export const ourFileRouter = {
  boardImage: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } })
    .middleware(() => HandleAuth())
    .onUploadComplete(() => {}),
  cardFile: f(["image", "pdf"])
    .middleware(() => HandleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
