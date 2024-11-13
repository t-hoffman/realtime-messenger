import { gql } from "graphql-tag";

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($input: UserInput!) {
    updateUser(input: $input)
  }
`;
