import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ApolloProvider } from "react-apollo";
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
  from,
} from "apollo-boost";
import { createUploadLink } from "apollo-upload-client";
/*installed only DEVmode */
import { onError } from "apollo-link-error";
const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});
//const uri = "http://localhost:5000/graphql";
const uri = "https://bodbog.com/api";
const httpLink = new HttpLink({ uri });
const uploadLink = createUploadLink({
  uri, // Apollo Server is served from port 4000
  headers: {
    "keep-alive": "true",
  },
});
const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = localStorage.getItem("token");
  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `${token}` : null,
    },
  });
  // Call the next link in the middleware chain.
  return forward(operation);
});
const client = new ApolloClient({
  //  link: authLink.concat(httpLink, uploadLink, errorLink), // Chain it with the HttpLink
  link: from([errorLink, authLink, uploadLink, httpLink]),
  cache: new InMemoryCache(),
});
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
