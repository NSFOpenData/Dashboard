import React from "react";
import authHelper from "./auth-helper";

// create the context
export type IAuthContext = {
  authInfo: {
    loggedIn: boolean;
  };
  logOut: any;
  logIn: any;
};
const AuthContext = React.createContext<any>(undefined);

// create the context provider, we are using use state to ensure that
// we get reactive values from the context...
export const AuthProvider: React.FC = ({ children }) => {
  // the reactive values
  const [authInfo, setAuthInfo] = React.useState<any>(authHelper.isAuthenticated());
  console.log(authInfo)

  const logOut = () => {
    return setAuthInfo(false);
  };

  const logIn = () => {
    return setAuthInfo(true);
  };

  let v = {
    authInfo,
    logOut: logOut,
    logIn: logIn,
  };

  return <AuthContext.Provider value={v}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext) as IAuthContext;