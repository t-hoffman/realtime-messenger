import db, { ConversationTable, MessageTable } from "@/app/libs/drizzle";
import { asc, eq } from "drizzle-orm";
import { Message, MessageInput } from "../types/message";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function getMessagesInConversation(conversationId: number) {
  const messages = await db
    .select()
    .from(MessageTable)
    .where(eq(MessageTable.conversationId, conversationId))
    .orderBy(asc(MessageTable.createdAt));

  return messages as Message[];
}

export async function addMessage(message: MessageInput) {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id || !currentUser?.email) {
    throw new Error("User not authorized.");
  }

  const [newMessage] = await db
    .insert(MessageTable)
    .values({
      ...message,
      senderId: currentUser.id,
    })
    .$returningId();

  const updatedConversation = await db
    .update(ConversationTable)
    .set({ lastMessageAt: new Date() })
    .where(eq(ConversationTable.id, message.conversationId));

  return { ...message, id: newMessage.id, senderId: currentUser.id } as Message;
}
