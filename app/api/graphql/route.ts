import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import {
  ConversationResolver,
  MessageResolver,
  UserResolver,
} from "./resolvers";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import getCurrentUser from "@/app/actions/getCurrentUser";

const schema = await buildSchema({
  resolvers: [ConversationResolver, MessageResolver, UserResolver],
});

const server = new ApolloServer({
  schema,
  formatError: (err) => {
    console.error(err); // Log the error
    return err;
  },
});

const handler = startServerAndCreateNextHandler(server, {
  context: async (req, res) => ({ currentUser: await getCurrentUser() }),
});

export { handler as GET, handler as POST };
