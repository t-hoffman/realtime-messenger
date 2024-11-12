import { gql } from "graphql-tag";

export const GET_USERS_QUERY = gql`
  query GetUsers {
    getUsers {
      id
      name
      email
    }
  }
`;
