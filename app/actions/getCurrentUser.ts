import db, { UserTable } from "@/app/libs/drizzle";
import getSession from "./getSession";
import { eq } from "drizzle-orm";

const getCurrentUser = async () => {
  const defaultReturn = { id: null, name: null, email: null };

  try {
    const session = await getSession();

    if (!session?.user?.email) return defaultReturn;

    const [selectedUser] = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.email, session.user.email))
      .limit(1);

    if (!selectedUser) return defaultReturn;

    const { password, ...currentUser } = selectedUser;

    return currentUser;
  } catch (err) {
    return defaultReturn;
  }
};

export default getCurrentUser;
