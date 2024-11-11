import { UUIDResolver } from "graphql-scalars";
import { Field, ObjectType } from "type-graphql";

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
}
