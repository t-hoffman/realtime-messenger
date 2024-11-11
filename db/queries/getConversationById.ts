import { gql } from "graphql-tag";

export const getConversationByIdQuery = gql`
  query GetConversationById($conversationId: ID!) {
    getConversation(conversationId: $conversationId) {
      id
      name
      createdAt
      lastMessageAt
      isGroup
      users {
        id
        name
        email
        image
      }
      messages {
        id
        body
        image
        createdAt
        sender {
          id
          name
          email
          image
        }
      }
    }
  }
`;
