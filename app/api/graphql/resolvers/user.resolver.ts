import { Query, Resolver } from "type-graphql";
import { User } from "../types/user";
import { getAllUsers } from "../services/user.service";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return (await getAllUsers()) as User[];
  }
}
