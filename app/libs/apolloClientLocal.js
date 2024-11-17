import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { removeTypenameFromVariables } from "@apollo/client/link/remove-typename";

const removeTypenameLink = removeTypenameFromVariables();

const httpLink = new HttpLink({ uri: "http://localhost:3000/api/graphql" });

const link = from([removeTypenameLink, httpLink]);

const clientLocal = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default clientLocal;
