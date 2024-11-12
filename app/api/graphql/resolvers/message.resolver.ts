import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
} from "type-graphql";
import { Message, MessageInput } from "../types/message";
import { User } from "../types/user";
import { getUserById } from "../services/user.service";
import { addMessage } from "../services/message.service";

@Resolver(() => Message)
export class MessageResolver {
  @FieldResolver(() => User)
  async sender(@Root() message: Message): Promise<User> {
    return await getUserById(message.senderId);
  }

  @Mutation(() => Message)
  async sendMessage(
    @Arg("message") message: MessageInput,
    @Ctx() context: any
  ): Promise<Message> {
    return await addMessage(message, context);
  }
}
