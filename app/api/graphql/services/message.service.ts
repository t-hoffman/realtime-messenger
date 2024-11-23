import db, { ConversationTable, MessageTable } from "@/app/libs/drizzle";
import { desc, eq } from "drizzle-orm";
import { Message, MessageInput } from "../types/message";

export async function getMessagesInConversation(conversationId: string) {
  const messages = await db
    .select()
    .from(MessageTable)
    .where(eq(MessageTable.conversationId, conversationId))
    .orderBy(desc(MessageTable.createdAt));

  return messages as Message[];
}

export async function addMessage(message: MessageInput, context: any) {
  const { currentUser } = context;

  if (!currentUser?.id) {
    throw new Error("User not authorized.");
  }
  // if (!currentUser?.id || !currentUser?.email) {
  //   throw new Error("User not authorized.");
  // }

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
