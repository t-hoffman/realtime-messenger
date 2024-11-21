"use client";

import { ApolloProvider } from "@apollo/client";
import { clientAppSync, clientLocal } from "../libs/apolloClients";

export default function ApolloWrapper({ children }) {
  return (
    <ApolloProvider client={clientLocal}>
      <ApolloProvider client={clientAppSync}>{children}</ApolloProvider>
    </ApolloProvider>
  );
}
