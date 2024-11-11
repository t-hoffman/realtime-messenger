import db, {
  ConversationTable,
  UserConversationsTable,
  UserTable,
} from "@/app/libs/drizzle";
import { aliasedTable, and, desc, eq } from "drizzle-orm";

import {
  Conversation,
  ConversationInput,
  UserConversations,
} from "../types/conversation";
import getCurrentUser from "@/app/actions/getCurrentUser";

const convoSQLTransaction = async (
  conversationInfo: Object,
  members: Array<String>
) => {
  return db.transaction(async (trx) => {
    const [{ id }] = await trx
      .insert(ConversationTable)
      .values(conversationInfo)
      .$returningId();

    const userConversations = members.map((userId) => ({
      conversationId: id,
      userId,
    }));

    await trx
      .insert(UserConversationsTable)
      .values(userConversations as UserConversations[]);

    return { id, ...conversationInfo };
  });
};

const directConvoExists = async (userId1: string, userId2: string) => {
  // `
  // SELECT *
  //   FROM user_conversations AS uc1
  //   JOIN user_conversations AS uc2
  //     ON uc1.conversationId = uc2.conversationId
  //   JOIN conversation AS c
  //     ON uc1.conversationId = c.id
  //   WHERE uc1.userId = ${userId1}
  //     AND uc2.userId = ${userId2}
  //     AND c.isGroup = false
  //   LIMIT 1
  // `;
  const UC1 = aliasedTable(UserConversationsTable, "UC1");
  const UC2 = aliasedTable(UserConversationsTable, "UC2");

  const query = await db
    .select()
    .from(UC1)
    .innerJoin(
      UC2,
      and(
        eq(UC1.conversationId, UC2.conversationId),
        eq(UC1.userId, userId1),
        eq(UC2.userId, userId2)
      )
    )
    .innerJoin(
      ConversationTable,
      and(
        eq(UC1.conversationId, ConversationTable.id),
        eq(ConversationTable.isGroup, false)
      )
    )
    .limit(1);

  if (!query || !query.length) return false;

  const [{ conversation }] = query;

  if (!conversation) throw new Error("Internal server error");

  return conversation || false;
};

export async function addNewCoversation(input: ConversationInput) {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id || !currentUser?.email) {
    throw new Error("Unauthorized");
  }

  let conversationData = {};
  const { userId, isGroup, members, name } = input;
  const conversationInfo = {
    name: name || "",
    isGroup: isGroup || false,
    createdAt: new Date(),
    lastMessageAt: new Date(),
  };

  if (isGroup && (!members || members.length < 2 || !name)) {
    throw new Error("Invalid data");
  }

  if (isGroup) {
    conversationData = await convoSQLTransaction(
      conversationInfo,
      members as string[]
    );
  } else {
    const existingConversation = await directConvoExists(
      userId,
      currentUser.id
    );

    if (existingConversation) {
      return existingConversation;
    }

    conversationData = await convoSQLTransaction(conversationInfo, [
      userId,
      currentUser.id,
    ]);
  }

  return conversationData as Conversation;
}

export async function getConversationsByUser(userId: string) {
  const conversations = await db
    .select({
      id: ConversationTable.id,
      name: ConversationTable.name,
      createdAt: ConversationTable.createdAt,
      lastMessageAt: ConversationTable.lastMessageAt,
      isGroup: ConversationTable.isGroup,
    })
    .from(ConversationTable)
    .innerJoin(
      UserConversationsTable,
      eq(ConversationTable.id, UserConversationsTable.conversationId)
    )
    .where(eq(UserConversationsTable.userId, userId))
    .orderBy(desc(ConversationTable.lastMessageAt));

  return conversations as [Conversation];
}

export async function getUsersInConversation(conversation: Conversation) {
  return await db
    .select({
      id: UserTable.id,
      name: UserTable.name,
      email: UserTable.email,
      image: UserTable.image,
    })
    .from(UserTable)
    .innerJoin(
      UserConversationsTable,
      eq(UserConversationsTable.conversationId, conversation.id)
    )
    .where(eq(UserTable.id, UserConversationsTable.userId));
}

export async function getConversationById(id: number) {
  const [conversation] = await db
    .select({
      id: ConversationTable.id,
      name: ConversationTable.name,
      createdAt: ConversationTable.createdAt,
      lastMessageAt: ConversationTable.lastMessageAt,
      isGroup: ConversationTable.isGroup,
    })
    .from(ConversationTable)
    .where(eq(ConversationTable.id, id));

  return conversation as Conversation;
}
