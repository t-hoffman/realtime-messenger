import { gql } from "graphql-tag";

export const getConversationsQuery = gql`
  query GetConversations($userId: String!) {
    getConversations(userId: $userId) {
      id
      name
      createdAt
      lastMessageAt
      isGroup
    }
  }
`;
