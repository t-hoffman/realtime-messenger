import { gql } from "graphql-tag";

export const getConversationsQuery = gql`
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
