import db, { UserTable } from "@/app/libs/drizzle";
import { eq } from "drizzle-orm";
import { User, UserInput } from "../types/user";

/*
  Try db.query.user.findFirst()
*/

export async function getUserById(id: string) {
  const [user] = await db
    .select({
      id: UserTable.id,
      name: UserTable.name,
      email: UserTable.email,
      image: UserTable.image,
      createdAt: UserTable.createdAt,
    })
    .from(UserTable)
    .where(eq(UserTable.id, id))
    .limit(1);

  if (!user) throw new Error(`User with ID ${id} not found`);

  return user as User;
}

export async function getAllUsers() {
  return await db.select().from(UserTable);
}

export async function updateUserById(input: UserInput, context: any) {
  if (
    !context.currentUser?.id ||
    !context.currentUser?.email ||
    context.currentUser?.id !== input.userId
  ) {
    throw new Error("Unauthorized User");
  }

  const updatedUser = await db
    .update(UserTable)
    .set({ name: input.name, image: input.image, updatedAt: new Date() })
    .where(eq(UserTable.id, context.currentUser.id));

  return !!updatedUser;
}
