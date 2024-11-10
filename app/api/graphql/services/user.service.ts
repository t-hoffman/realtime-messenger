import db, { UserTable } from "@/app/libs/drizzle";
import { eq } from "drizzle-orm";
import { User } from "../types/user";

/*
  Try db.query.user.findFirst()
*/

export async function getUserById(id: string) {
  const [user] = await db
    .select()
    .from(UserTable)
    .where(eq(UserTable.id, id))
    .limit(1);

  if (!user) throw new Error(`User with ID ${id} not found`);

  return user as User;
}

export async function getAllUsers() {
  return await db.select().from(UserTable);
}