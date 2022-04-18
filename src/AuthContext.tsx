import React, { useState, createContext, useContext, useEffect } from "react";
import auth from "./firebase";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
} from "firebase/auth";
import { useHistory } from "react-router-dom";

import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";

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
    // auth.signOut();
    setCurrentUser(null);
    GoogleAuth.signOut();
    auth.signOut();
  };
  
  const logInWithGoogle = async () => {
    // signInWithRedirect(auth, new GoogleAuthProvider());
    let val = await GoogleAuth.signIn();
    setCurrentUser(val);
    const credential = GoogleAuthProvider.credential(val.authentication.idToken);
    await signInWithCredential(auth, credential);
  
  };

  const getAuthToken = async () => {
    return await auth.currentUser?.getIdToken();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
