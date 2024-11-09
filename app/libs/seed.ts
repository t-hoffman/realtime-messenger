import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import { eq } from "drizzle-orm";
import { UserTable } from "../../db/schema";

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  const user: typeof UserTable.$inferInsert = {
    name: "John",
    email: "john11@example.com",
    password: "1234",
  };

  await db.insert(UserTable).values(user);
  console.log("New user created!");

  const users = await db.select().from(UserTable);
  console.log("Getting all users from the database: ", users);
  /*
  const users: {
    id: number;
    name: string;
    age: number;
    email: string;
  }[]
  */

  await db
    .update(UserTable)
    .set({
      name: "Johnny",
    })
    .where(eq(UserTable.email, user.email));
  console.log("User info updated!");

  // await db.delete(UserTable).where(eq(UserTable.email, user.email));
  // console.log("User deleted!");
}

main();
