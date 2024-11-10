import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Conversation, ConversationInput } from "../types/conversation";
import {
  addNewCoversation,
  getConversationsByUser,
} from "../services/conversation.service";

@Resolver(Conversation)
export class ConversationResolver {
  @Query(() => [Conversation])
  async getConversations(
    @Arg("userId", () => String) userId: string
  ): Promise<Conversation[]> {
    return await getConversationsByUser(userId);
  }

  @Mutation(() => Conversation)
  async addConversation(
    @Arg("input") input: ConversationInput
  ): Promise<Conversation> {
    return (await addNewCoversation(input)) as Conversation;
  }
}
