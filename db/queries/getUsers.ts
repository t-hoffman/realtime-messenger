import { gql } from "graphql-tag";

export const getUsersQuery = gql`
  query GetUsers {
    getUsers {
      id
      name
      email
    }
  }
`;
