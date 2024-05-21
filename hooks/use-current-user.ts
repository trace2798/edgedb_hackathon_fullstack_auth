"use server";
import { auth } from "@/edgedb";
// import { useSession } from "next-auth/react";

export const useCurrentUser = async () => {
  const session = auth.getSession();
  console.log(session);
  const [user] = await session.client.query(
    `SELECT User {*} FILTER .id = global current_user.id`
  );
  console.log(user);
  // const currentUser = await user
  const currentUser = JSON.parse(JSON.stringify(await user));
  // console.log(currentUser);
  // console.log(currentUser);
  return currentUser;
};
