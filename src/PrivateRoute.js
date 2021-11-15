import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { authInfo } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return authInfo ? (
          <Component {...props} />
        ) : (
          <Redirect to="/authentication" />
        );
      }}
    ></Route>
  );
}
