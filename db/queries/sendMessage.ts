import { gql } from "graphql-tag";

export const sendMessageQuery = gql`
  mutation SendMessage($message: MessageInput!) {
    sendMessage(message: $message) {
      id
      body
      image
      createdAt
      conversationId
      senderId
    }
  }
`;
