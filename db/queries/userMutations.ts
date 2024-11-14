import { gql } from "graphql-tag";

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input)
  }
`;

export const CREATE_NEW_USER_MUTATION = gql`
  mutation NewUser($input: NewUserInput!) {
    addUser(input: $input) {
      id
      name
      email
      image
    }
  }
`;
