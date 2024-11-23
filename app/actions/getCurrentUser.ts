"use server";

import db, { UserTable } from "@/app/libs/drizzle";
import getSession from "./getSession";
import { eq } from "drizzle-orm";

const getCurrentUser = async (sessionUser: any | null = null) => {
  try {
    const session = (await getSession()) || sessionUser;

    // if (!session?.user?.email) return null;
    if (!session?.user?.id) return null;

    const [selectedUser] = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.id, session.user.id)) // was .email
      .limit(1);

    if (!selectedUser) return null;

    const { password, ...currentUser } = selectedUser;

    return currentUser;
  } catch (err) {
    return null;
  }
};

export default getCurrentUser;
