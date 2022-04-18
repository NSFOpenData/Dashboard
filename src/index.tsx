import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { AuthProvider } from "./AuthContext";
import { setContext } from '@apollo/client/link/context';

// Import the functions you need from the SDKs you need
// import * as firebase from 'firebase/app';

const bearer = "Bearer ";
// TODO: this has to be hard-coded temporarily to a valid token obtained from the backend
// const token = localStorage.getItem("token");
// const authHeader = bearer + token;

// const getToken = () => {
//   const token = localStorage.getItem('token');
//   return token ? `Bearer ${token}` : '';
// };

// // client set up to use GraphQL
// const client = new ApolloClient({
//   link: createUploadLink({
//     uri: "https://nsf-scc1.isis.vanderbilt.edu/graphql",
//     // uri: "http://localhost:3000/graphql",
//     headers: {
//       authorization: getToken(),
//     },
//   }),
//   cache: new InMemoryCache(),
// });
const httpLink = createUploadLink({
  uri: "https://nsf-scc1.isis.vanderbilt.edu/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
