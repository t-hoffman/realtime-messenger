import bcrypt from "bcrypt";
import db, { UserTable } from "@/app/libs/drizzle";
import { eq } from "drizzle-orm";
import { User, UpdateUserInput, NewUserInput } from "../types/user";

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

export async function updateUserById(input: UpdateUserInput, context: any) {
  if (!context.currentUser?.id || context.currentUser?.id !== input.userId) {
    throw new Error("Unauthorized User");
  }
  // if (
  //   !context.currentUser?.id ||
  //   !context.currentUser?.email ||
  //   context.currentUser?.id !== input.userId
  // ) {
  //   throw new Error("Unauthorized User");
  // }

  const updatedUser = await db
    .update(UserTable)
    .set({ name: input.name, image: input.image, updatedAt: new Date() })
    .where(eq(UserTable.id, context.currentUser.id));

  return {
    id: context.currentUser.id,
    name: input.name,
    email: context.currentUser.email,
    image: input.image,
    createdAt: context.currentUser.createdAt,
  };
}

/**
 *
 *
 * NEED TO IMPLEMENT A CHECK IF THE USER EMAIL EXISTS ALREADY
 *
 *
 */

export async function createNewUser(input: NewUserInput) {
  const { email, name, password } = input;

  if (!email || !name || !password) {
    throw new Error("Missing information");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const [user] = await db
    .insert(UserTable)
    .values({ email, name, password: hashedPassword })
    .$returningId();

  const [newUser] = await db
    .select()
    .from(UserTable)
    .where(eq(UserTable.id, user.id))
    .limit(1);

  return newUser as User;
}
