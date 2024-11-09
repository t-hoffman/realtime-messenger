import db, { UserTable } from "@/app/libs/drizzle";
import getSession from "./getSession";
import { desc, eq, not } from "drizzle-orm";

const getUsers = async () => {
  const session = await getSession();

  if (!session?.user?.email) return [];

  try {
    const users = await db
      .select()
      .from(UserTable)
      .where(not(eq(UserTable.email, session.user.email)))
      .orderBy(desc(UserTable.email));

    return users;
  } catch (err) {
    return [];
  }
};

export default getUsers;
