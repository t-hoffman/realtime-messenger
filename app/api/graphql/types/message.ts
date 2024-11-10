import { UUIDResolver } from "graphql-scalars";
import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./user";

@ObjectType()
export class Message {
  @Field(() => ID)
  id!: number;

  @Field(() => String)
  body!: string;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field()
  createdAt!: Date;

  @Field(() => ID)
  conversationId!: number;

  @Field(() => UUIDResolver)
  senderId!: string;

  @Field(() => User)
  sender?: User;
}
