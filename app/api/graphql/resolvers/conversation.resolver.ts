import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Conversation, ConversationInput } from "../types/conversation";
import {
  addNewCoversation,
  getConversationsByUser,
  getUsersInConversation,
} from "../services/conversation.service";
import { User } from "../types/user";
import { Message } from "../types/message";
import { getMessagesInConversation } from "../services/message.service";

@Resolver(Conversation)
export class ConversationResolver {
  @Query(() => [Conversation])
  async getConversations(
    @Arg("userId", () => String) userId: string
  ): Promise<Conversation[]> {
    return await getConversationsByUser(userId);
  }

  @FieldResolver(() => [User])
  async users(@Root() conversation: Conversation): Promise<User[]> {
    return await getUsersInConversation(conversation);
  }

  @FieldResolver(() => [Message])
  async messages(@Root() conversation: Conversation): Promise<Message[]> {
    return await getMessagesInConversation(conversation.id);
  }

  @Mutation(() => Conversation)
  async addConversation(
    @Arg("input") input: ConversationInput
  ): Promise<Conversation> {
    return (await addNewCoversation(input)) as Conversation;
  }
}
