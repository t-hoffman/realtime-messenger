import { UUIDResolver } from "graphql-scalars";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { User } from "./user";

@ObjectType()
export class Message {
  @Field(() => ID)
  id!: number;

  @Field(() => String, { nullable: true })
  body?: string | null;

  @Field(() => String, { nullable: true })
  image?: string | null;

  @Field(() => Date)
  createdAt!: Date | null;

  @Field(() => ID)
  conversationId!: string;

  @Field(() => UUIDResolver)
  senderId!: string;

  @Field(() => User)
  sender?: User;
}

@InputType()
export class MessageInput {
  @Field(() => String, { nullable: true })
  body?: string | null;

  @Field(() => String, { nullable: true })
  image?: string | null;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | null;

  @Field(() => ID)
  conversationId!: string;

  @Field(() => ID, { nullable: true })
  senderId?: number;
}
