import { gql } from "graphql-tag";

export const CONVERSATIONS_SUBSCRIPTION = gql`
  subscription OnConversationUpdate($userId: String!) {
    onConversationUpdate(userId: $userId) {
      id
      name
      createdAt
      lastMessageAt
      isGroup
      messages {
        id
        body
        image
        senderId
        sender {
          id
          name
          email
          image
          createdAt
        }
        createdAt
      }
      users {
        id
        name
        email
        image
        createdAt
      }
    }
  }
`;

export const UPDATE_CONVERSATION_MUTATION = gql`
  mutation UpdateConversation($userId: String!, $input: ConversationInput!) {
    updateConversation(userId: $userId, input: $input) {
      id
      name
      createdAt
      lastMessageAt
      isGroup
      messages {
        id
        body
        image
        senderId
        sender {
          id
          name
          email
          image
          createdAt
        }
        createdAt
      }
      users {
        id
        name
        email
        image
        createdAt
      }
      userId
    }
  }
`;
