const { ApolloClient, InMemoryCache } = require("@apollo/client");

const createApolloClient = () => {
  return new ApolloClient({
    uri: "/api/graphql",
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
