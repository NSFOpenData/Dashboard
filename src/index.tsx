import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import {createUploadLink} from "apollo-upload-client";

// client set up to use GraphQL
const client = new ApolloClient({
  link : createUploadLink({
    uri:"https://nsf-scc1.isis.vanderbilt.edu/graphql",
    headers:{
      Authorization: "Bearer thisisaeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL25zZi1zY2MxLmlzaXMudmFuZGVyYmlsdC5lZHUvZ3JhcGhxbCI6eyJlbWFpbCI6ImFwcHRlc3RAYXBwdGVzdC5jb20iLCJyb2xlIjoiVVNFUiJ9LCJpYXQiOjE2MjI2NDY2NDMsImV4cCI6MTYyMzI1MTQ0Mywic3ViIjoiNjBiNjU4MDRkYzI3NTQ5YTkwMDcyYjIyIn0.LbAW5PUMwJDsvQslFA60ZlDMSy4ttZ1cmBgA5ZiuD_cverysecurepassword",
    }
    
  }),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
