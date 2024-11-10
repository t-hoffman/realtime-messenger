import { UUIDResolver } from "graphql-scalars";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class Conversation {
  @Field(() => ID)
  id!: number;

  @Field()
  createdAt!: Date;

  @Field()
  lastMessageAt!: Date;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Boolean)
  isGroup!: boolean;
}

@InputType()
export class ConversationInput {
  @Field(() => UUIDResolver)
  userId!: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Boolean, { nullable: true })
  isGroup?: boolean;

  @Field(() => [String], { nullable: true })
  members?: [string];
}

@ObjectType()
export class UserConversations {
  @Field(() => UUIDResolver)
  userId!: string;

  @Field(() => ID)
  conversationId!: number;
}
