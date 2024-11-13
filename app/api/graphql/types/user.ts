import { UUIDResolver } from "graphql-scalars";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field(() => UUIDResolver)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String, { nullable: true })
  image?: string | null;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}

@InputType()
export class UserInput {
  @Field(() => UUIDResolver)
  userId!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  image?: string;
}
