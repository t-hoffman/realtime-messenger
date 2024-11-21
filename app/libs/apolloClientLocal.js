import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { removeTypenameFromVariables } from "@apollo/client/link/remove-typename";

const removeTypenameLink = removeTypenameFromVariables();

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_LOCAL_GRAPHQL_ENDPOINT,
});

const link = from([removeTypenameLink, httpLink]);

const clientLocal = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default clientLocal;
