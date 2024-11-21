import { gql } from "graphql-tag";

export const SEND_MESSAGE_QUERY = gql`
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

// export const TRIGGER_MESSAGES_SUBSCRIPTION = gql`
//   mutation CreateMessage($input: CreateMessageInput!) {
//     createMessage(input: $input) {
//       id
//       body
//       image
//       senderId
//       conversationId
//       createdAt
//       sender {
//         id
//         name
//         email
//         image
//         createdAt
//         updatedAt
//       }
//     }
//   }
// `;

// export const SUBSCRIBE_TO_MESSAGES = gql`
//   subscription OnNewMessage {
//     onNewMessage {
//       id
//       body
//       image
//       senderId
//       conversationId
//       createdAt
//       sender {
//         id
//         name
//         email
//         image
//         createdAt
//         updatedAt
//       }
//     }
//   }
// `;
