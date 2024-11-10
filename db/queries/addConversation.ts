import { gql } from "graphql-tag";

export const addConversationQuery = gql`
  mutation AddConversation($input: ConversationInput!) {
    addConversation(input: $input) {
      id
      name
      isGroup
      createdAt
      lastMessageAt
    }
  }
`;
