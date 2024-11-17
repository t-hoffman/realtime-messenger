import {
  Arg,
  Ctx,
  FieldResolver,
  ID,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Conversation, ConversationInput } from "../types/conversation";
import {
  createNewConversation,
  deleteConversationById,
  getConversationById,
  getConversationsByUser,
  getUsersInConversation,
} from "../services/conversation.service";
import { User } from "../types/user";
import { Message } from "../types/message";
import { getMessagesInConversation } from "../services/message.service";

@Resolver(Conversation)
export class ConversationResolver {
  /**
   *  QUERIES
   */

  @Query(() => [Conversation])
  async getConversations(
    @Arg("userId", () => String) userId: string,
    @Ctx() context: any
  ): Promise<Conversation[]> {
    return await getConversationsByUser(userId, context);
  }

  @Query(() => Conversation)
  async getConversation(
    @Arg("conversationId", () => ID) conversationId: string,
    @Ctx() context: any
  ): Promise<Conversation> {
    return await getConversationById(conversationId, context);
  }

  /**
   *  MUTATIONS
   */

  @Mutation(() => Conversation)
  async addConversation(
    @Arg("input") input: ConversationInput,
    @Ctx() context: any
  ): Promise<Conversation> {
    return (await createNewConversation(input, context)) as Conversation;
  }

  @Mutation(() => Boolean)
  async deleteConversation(
    @Arg("conversationId", () => ID) conversationId: string,
    @Ctx() context: any
  ): Promise<Boolean> {
    console.log("hello");
    return await deleteConversationById(conversationId, context);
  }

  /**
   *  FIELD RESOLVERS
   */

  @FieldResolver(() => [User])
  async users(@Root() conversation: Conversation): Promise<User[]> {
    return await getUsersInConversation(conversation);
  }

  @FieldResolver(() => [Message])
  async messages(@Root() conversation: Conversation): Promise<Message[]> {
    return await getMessagesInConversation(conversation.id);
  }
}
