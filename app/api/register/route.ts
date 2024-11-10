import bcrypt from "bcrypt";
import db, { UserTable } from "@/app/libs/drizzle";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    if (!email || !name || !password) {
      return new NextResponse("Missing information", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const [user] = await db
      .insert(UserTable)
      // @ts-ignore: Unreachable code error
      .values({ email, name, password: hashedPassword })
      .$returningId();
    const [newUser] = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.id, user.id))
      .limit(1);

    return NextResponse.json(newUser);
  } catch (err) {
    console.error(err, "REGISTRATION ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
