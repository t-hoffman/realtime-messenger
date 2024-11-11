import db, { MessageTable } from "@/app/libs/drizzle";
import { asc, eq } from "drizzle-orm";
import { Message } from "../types/message";

export async function getMessagesInConversation(conversationId: number) {
  const messages = await db
    .select()
    .from(MessageTable)
    .where(eq(MessageTable.conversationId, conversationId))
    .orderBy(asc(MessageTable.createdAt));

  return messages as Message[];
}
