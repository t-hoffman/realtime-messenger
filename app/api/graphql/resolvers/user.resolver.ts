import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User, NewUserInput, UpdateUserInput } from "../types/user";
import {
  createNewUser,
  getAllUsers,
  updateUserById,
} from "../services/user.service";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return (await getAllUsers()) as User[];
  }

  @Mutation(() => User)
  async addUser(@Arg("input") input: NewUserInput): Promise<User> {
    return await createNewUser(input);
  }

  @Mutation(() => User)
  async updateUser(
    @Arg("input") input: UpdateUserInput,
    @Ctx() context: any
  ): Promise<User> {
    return await updateUserById(input, context);
  }
}
