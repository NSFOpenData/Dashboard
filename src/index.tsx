import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  concat,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

import { AUTH_TOKEN } from "../src/pages/authpages/LoginPage";

const bearer = "Bearer ";
const token = localStorage.getItem(AUTH_TOKEN);
//console.log("token: ", token);
// client set up to use GraphQL
const client = new ApolloClient({
  link: createUploadLink({
    uri: "https://nsf-scc1.isis.vanderbilt.edu/graphql",
    headers: {
      // 'Content-Type': 'application/json',
      // 'Accept': 'application/json',
      authorization: token ? bearer.concat(token!) : "",
      // authorization:
      //   "Bearer " +
      //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL25zZi1zY2MxLmlzaXMudmFuZGVyYmlsdC5lZHUvZ3JhcGhxbCI6eyJlbWFpbCI6InByaXZpbGVnZWRAdXNlci5jb20iLCJyb2xlIjoiUFJJVklMRUdFRCIsIm5laWdoYm9yaG9vZCI6IlZhbmRlcmJpbHQifSwiaWF0IjoxNjI2ODE1OTk0LCJleHAiOjE2Mjc0MjA3OTQsInN1YiI6IjYwZWM3MzQ4OTUzNmVkNmVjOGY4ZGEyZCJ9.X72Fh1Z1GLyuI86SXTIPYG1WHH5ow-31PVv21aUSdAY",
      // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJET01BSU4iOnsiZW1haWwiOiJwcml2aWxlZ2VkQHVzZXIuY29tIiwicm9sZSI6IlBSSVZJTEVHRUQiLCJuZWlnaGJvcmhvb2QiOiJWYW5kZXJiaWx0In0sImlhdCI6MTYyNjgxMDU4NywiZXhwIjoxNjI3NDE1Mzg3LCJzdWIiOiI2MGVjNzM0ODk1MzZlZDZlYzhmOGRhMmQifQ.N5WDL-sFoT3b88XWYD9eaz3lZpHUoV_ux3m222ynKqc",
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
