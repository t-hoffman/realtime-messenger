import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { removeTypenameFromVariables } from "@apollo/client/link/remove-typename";
import { createAuthLink } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";
import "dotenv/config";

const awsconfig = {
  aws_appsync_graphqlEndpoint: process.env.NEXT_PUBLIC_APPSYNC_ENDPOINT_URL,
  aws_appsync_region: process.env.NEXT_PUBLIC_APPSYNC_REGION,
  aws_appsync_authenticationType: process.env.NEXT_PUBLIC_APPSYNC_AUTH_TYPE,
  aws_appsync_apiKey: process.env.NEXT_PUBLIC_APPSYNC_API_KEY,
};

const url = awsconfig.aws_appsync_graphqlEndpoint;
const region = awsconfig.aws_appsync_region;
const auth = {
  type: awsconfig.aws_appsync_authenticationType,
  apiKey: awsconfig.aws_appsync_apiKey,
};

const removeTypenameLink = removeTypenameFromVariables();

const httpLink = new HttpLink({ uri: url });

const authLink = createAuthLink({ url, region, auth });

const subscriptionLink = createSubscriptionHandshakeLink(
  { url, region, auth },
  httpLink
);

const link = from([
  removeTypenameLink,
  split(
    ({ query }) =>
      getMainDefinition(query).kind === "OperationDefinition" &&
      getMainDefinition(query).operation === "subscription",
    subscriptionLink,
    authLink.concat(httpLink)
  ),
]);

const clientAppSync = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default clientAppSync;
