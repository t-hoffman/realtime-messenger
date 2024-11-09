import { relations } from "drizzle-orm";
import {
  bigint,
  boolean,
  int,
  mysqlTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { v4 as uuidv4 } from "uuid";

export const UserTable = mysqlTable("user", {
  id: varchar({ length: 36 }).primaryKey().$defaultFn(uuidv4),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  emailVerified: timestamp(),
  image: text(),
  password: varchar("password", { length: 255 }),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp(),
});

export const UsersRelations = relations(UserTable, ({ one, many }) => ({
  account: one(AccountTable, {
    fields: [UserTable.id],
    references: [AccountTable.userId],
  }),
  conversations: many(UserConversations),
}));

export const AccountTable = mysqlTable("account", {
  id: serial().primaryKey(),
  userId: varchar({ length: 255 })
    .references(() => UserTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  type: varchar({ length: 255 }),
  provider: varchar({ length: 255 }),
  providerAccountId: varchar({ length: 255 }),
  refresh_token: text(),
  access_token: text(),
  expires_at: int(),
  token_type: varchar({ length: 255 }),
  scope: varchar({ length: 255 }),
  id_token: text(),
  session_state: varchar({ length: 255 }),
});

export const AccountRelations = relations(AccountTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [AccountTable.userId],
    references: [UserTable.id],
  }),
}));

export const ConversationTable = mysqlTable("conversation", {
  id: serial().primaryKey(),
  createdAt: timestamp().defaultNow(),
  lastMessageAt: timestamp().defaultNow(),
  name: varchar({ length: 255 }),
  isGroup: boolean().notNull().default(false),
});

export const ConversationRelations = relations(
  ConversationTable,
  ({ many }) => ({
    messages: many(MessageTable),
    users: many(UserConversations),
  })
);

export const MessageTable = mysqlTable("message", {
  id: serial().primaryKey(),
  body: text(),
  image: text(),
  createdAt: timestamp().defaultNow(),

  conversationId: bigint({ mode: "number", unsigned: true })
    .references(() => ConversationTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  senderId: varchar({ length: 255 }).references(() => UserTable.id, {
    onDelete: "cascade",
  }),
});

export const MessageRelations = relations(MessageTable, ({ one, many }) => ({
  conversation: one(ConversationTable, {
    fields: [MessageTable.conversationId],
    references: [ConversationTable.id],
  }),
  sender: one(UserTable, {
    fields: [MessageTable.senderId],
    references: [UserTable.id],
  }),
}));

export const UserConversations = mysqlTable(
  "user_conversations",
  {
    userId: varchar({ length: 255 })
      .references(() => UserTable.id, { onDelete: "cascade" })
      .notNull(),
    conversationId: bigint({ mode: "number", unsigned: true })
      .references(() => ConversationTable.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({
      name: "convos_id",
      columns: [table.userId, table.conversationId],
    }),
  })
);

export const UserConversationsRelations = relations(
  UserConversations,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [UserConversations.userId],
      references: [UserTable.id],
    }),
    conversation: one(ConversationTable, {
      fields: [UserConversations.conversationId],
      references: [ConversationTable.id],
    }),
  })
);
