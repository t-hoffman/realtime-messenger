import { getServerSession } from "next-auth";
import { authOptions } from "@/app/libs/NextAuth";

export default async function getSession() {
  return await getServerSession(authOptions);
}
