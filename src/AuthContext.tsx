import React, { useState, createContext, useContext, useEffect } from "react";
import auth from "./firebase";
import {
  onAuthStateChanged,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";

// create the contex
export type IAuthContext = {
  currentUser: any;
  logOut: any;
  logInWithGoogle: any;
  getAuthToken: any;
};
const AuthContext = createContext<any>(undefined);
export const useAuth = () => useContext(AuthContext) as IAuthContext;

// create the context provider, we are using use state to ensure that
// we get reactive values from the context...
export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const logOut = () => {
    localStorage.removeItem("token");
    auth.signOut();
  };
  
  const logInWithGoogle = async () => {
    signInWithRedirect(auth, new GoogleAuthProvider());
  };

  const getAuthToken = async () => {
    return await auth.currentUser?.getIdToken();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  let v = {
    currentUser,
    logOut,
    logInWithGoogle,
    getAuthToken,
  };

  return (
    <AuthContext.Provider value={v}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
