import { UUIDResolver } from "graphql-scalars";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType("User")
export class User {
  @Field(() => UUIDResolver)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  email?: string | null;

  @Field(() => String, { nullable: true })
  image?: string | null;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}

@InputType("UpdateUserInput")
export class UpdateUserInput {
  @Field(() => UUIDResolver)
  userId!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  image?: string;
}

@InputType("NewUserInput")
export class NewUserInput {
  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  email?: string | null;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => String)
  password!: string;
}
