import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

import { AUTH_TOKEN } from "../src/pages/authpages/LoginPage";
// Import the functions you need from the SDKs you need
import * as firebase from 'firebase/app';


const bearer = "Bearer ";
const token = localStorage.getItem(AUTH_TOKEN);

// client set up to use GraphQL
const client = new ApolloClient({
  link: createUploadLink({
    uri: "https://nsf-scc1.isis.vanderbilt.edu/graphql",
    headers: {
      authorization: token ? bearer.concat(token!) : "",
    },
  }),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById("root")
);

//firebase
firebase.initializeApp({
  apiKey: "AIzaSyBdtgJTpg8-pYIb7sMny70qeJICM-fiSqY",
  authDomain: "nsfopendata.firebaseapp.com",
  projectId: "nsfopendata",
  storageBucket: "nsfopendata.appspot.com",
  messagingSenderId: "534112304877",
  appId: "1:534112304877:web:196cde4f56c8987f1cd6e4",
  measurementId: "G-3DW2VYJHZL"
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
