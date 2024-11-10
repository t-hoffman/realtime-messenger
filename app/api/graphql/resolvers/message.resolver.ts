import { FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Message } from "../types/message";
import { User } from "../types/user";
import { getUserById } from "../services/user.service";

@Resolver(() => Message)
export class MessageResolver {
  @FieldResolver(() => User)
  async sender(@Root() message: Message): Promise<User> {
    return await getUserById(message.senderId);
  }
}
