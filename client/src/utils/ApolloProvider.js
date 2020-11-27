import React from "react";
import App from "../App";
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition} from '@apollo/client/utilities';
import {
  split,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "apollo-link-context";

const httpLink = createHttpLink({
  uri: "http://localhost:8080/",
});

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const authHttpLink = authLink.concat(httpLink);

const wsLink = new WebSocketLink({
  uri: "ws://localhost:8080/graphql",
  options: { reconnect: true }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authHttpLink,
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
