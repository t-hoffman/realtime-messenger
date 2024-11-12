import db, { UserTable } from "@/app/libs/drizzle";
import getSession from "./getSession";
import { eq } from "drizzle-orm";

const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) return null;

    const [selectedUser] = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.email, session.user.email))
      .limit(1);

    if (!selectedUser) return null;

    const { password, ...currentUser } = selectedUser;

    return currentUser;
  } catch (err) {
    return null;
  }
};

export default getCurrentUser;
