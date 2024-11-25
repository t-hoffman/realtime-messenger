"use server";

import db, { UserTable } from "@/app/libs/drizzle";
import getSession from "./getSession";
import { eq } from "drizzle-orm";

const getCurrentUser = async (sessionUser: any | null = null) => {
  const defaultReturn = { id: null, name: null, email: null };

  try {
    const session = (await getSession()) || sessionUser;

    // if (!session?.user?.email) return null;
    if (!session?.user?.id) {
      console.warn("No valid session or user found:", session);
      return defaultReturn;
    }

    const [selectedUser] = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.id, session.user.id)) // was .email
      .limit(1);

    if (!selectedUser) {
      console.warn(
        "No user found in database for session ID:",
        session.user.id
      );
      return defaultReturn;
    }

    const { password, ...currentUser } = selectedUser;

    return currentUser;
  } catch (err) {
    console.error("Error in getCurrentUser:", err);
    return defaultReturn;
  }
};

export default getCurrentUser;
