"use server";

import e, { createClient } from "@/dbschema/edgeql-js";

const client = createClient();

export const getUserById = async (id: string) => {
  try {
    const user = await e
      .select(e.User, (user) => ({
        id: true,
        email: true,
        name: true,
        filter_single: e.op(user.id, "=", e.uuid(id)),
      }))
      .run(client);
    console.log(user);
    return user;
  } catch {
    return null;
  }
};

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await e
      .select(e.Account, (account) => ({
        id: true,
        filter_single: e.op(account.userId, "=", e.uuid(userId)),
      }))
      .run(client);
    console.log(account);
    return account;
  } catch {
    return null;
  }
};
