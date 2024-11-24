import { UUIDResolver } from "graphql-scalars";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { User } from "./user";
import { Message } from "./message";

@ObjectType("Conversation")
export class Conversation {
  @Field(() => ID)
  id!: string;

  @Field()
  createdAt!: Date;

  @Field()
  lastMessageAt!: Date;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Boolean)
  isGroup!: boolean;

  @Field(() => [User])
  users!: User[];

  @Field(() => [Message])
  messages?: Message[];
}

@InputType("ConversationInput")
export class ConversationInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Boolean, { nullable: true })
  isGroup?: boolean;

  @Field(() => [String])
  members!: [string];
}

@ObjectType("UserConversations")
export class UserConversations {
  @Field(() => UUIDResolver)
  userId!: string;

  @Field(() => ID)
  conversationId!: string;
}
