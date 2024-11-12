import db, {
  ConversationTable,
  MessageTable,
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

export async function addNewCoversation(
  input: ConversationInput,
  context: any
) {
  const { currentUser } = context;

  if (!currentUser?.id || !currentUser?.email) {
    throw new Error("Unauthorized User");
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
      createdAt: UserTable.createdAt,
    })
    .from(UserTable)
    .innerJoin(
      UserConversationsTable,
      eq(UserConversationsTable.conversationId, conversation.id)
    )
    .where(eq(UserTable.id, UserConversationsTable.userId));
}

export async function getConversationById(id: string, context: any) {
  if (!context.currentUser?.id || !context.currentUser?.email) {
    throw new Error("Unauthorized User");
  }

  const { currentUser } = context;

  const [conversation] = await db
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
      eq(UserConversationsTable.conversationId, ConversationTable.id)
    )
    .where(
      and(
        eq(ConversationTable.id, id),
        eq(UserConversationsTable.userId, currentUser.id)
      )
    );

  if (!conversation) {
    throw new Error("Conversation does not exist or unauthorized user");
  }

  return conversation as Conversation;
}

export async function deleteConversationById(
  conversationId: string,
  context: any
) {
  const { currentUser } = context;

  if (!currentUser?.id || !currentUser?.email) {
    throw new Error("Unauthorized User");
  }

  const userInConvo = await db
    .select()
    .from(UserConversationsTable)
    .where(
      and(
        eq(UserConversationsTable.userId, currentUser.id),
        eq(UserConversationsTable.conversationId, conversationId)
      )
    )
    .limit(1);

  if (!userInConvo.length) {
    throw new Error("Unauthorized User");
  }

  return await db.transaction(async (trx) => {
    const [deleteCount] = await trx
      .delete(ConversationTable)
      .where(eq(ConversationTable.id, conversationId));

    if (deleteCount?.affectedRows === 0) return false;

    await trx
      .delete(UserConversationsTable)
      .where(eq(UserConversationsTable.conversationId, conversationId));

    await trx
      .delete(MessageTable)
      .where(eq(MessageTable.conversationId, conversationId));

    return true;
  });
}
