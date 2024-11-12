import { gql } from "graphql-tag";

export const CONVERSATION_BY_ID_QUERY = gql`
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
        createdAt
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
          createdAt
        }
      }
    }
  }
`;

export const CONVERSATIONS_BY_USER_QUERY = gql`
  query GetConversations($userId: String!) {
    getConversations(userId: $userId) {
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
