import { gql } from "graphql-tag";

export const ADD_CONVERSATION_MUTATION = gql`
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

export const DELETE_CONVERSATION_MUTATION = gql`
  mutation DeleteConversation($conversationId: ID!) {
    deleteConversation(conversationId: $conversationId)
  }
`;
