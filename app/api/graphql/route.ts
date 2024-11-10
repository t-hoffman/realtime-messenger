import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { NextResponse } from "next/server";
import { buildSchema } from "type-graphql";
import {
  ConversationResolver,
  MessageResolver,
  UserResolver,
} from "./resolvers";

const schema = await buildSchema({
  resolvers: [ConversationResolver, MessageResolver, UserResolver],
});

const server = new ApolloServer({ schema });

export async function graphqlHandler(req: Request) {
  const { query, variables } = await req.json();

  const resp = await server.executeOperation({
    query,
    variables,
  });

  let result;

  if (resp.body.kind === "incremental") {
    result = resp.body.initialResult;
  } else {
    result = resp.body.singleResult;
  }

  return NextResponse.json(result);
}

export const POST = graphqlHandler;
export const GET = graphqlHandler;
