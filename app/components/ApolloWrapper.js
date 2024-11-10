"use client";

import { ApolloProvider } from "@apollo/client";
import createApolloClient from "../libs/apolloClient";

const client = createApolloClient();

const ApolloWrapper = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloWrapper;
