import { UUIDResolver } from "graphql-scalars";
import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./user";

@ObjectType()
export class Message {
  @Field(() => ID)
  id!: number;

  @Field(() => String, { nullable: true })
  body!: string | null;

  @Field(() => String, { nullable: true })
  image?: string | null;

  @Field(() => Date)
  createdAt!: Date | null;

  @Field(() => ID)
  conversationId!: number;

  @Field(() => UUIDResolver)
  senderId!: string;

  @Field(() => User)
  sender?: User;
}
