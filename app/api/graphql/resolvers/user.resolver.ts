import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User, UserInput } from "../types/user";
import { getAllUsers, updateUserById } from "../services/user.service";
import { UUID } from "graphql-scalars/typings/mocks";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return (await getAllUsers()) as User[];
  }

  @Mutation(() => Boolean)
  async updateUser(
    @Arg("input") input: UserInput,
    @Ctx() context: any
  ): Promise<Boolean> {
    return await updateUserById(input, context);
  }
}
