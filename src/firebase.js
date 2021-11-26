import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBdtgJTpg8-pYIb7sMny70qeJICM-fiSqY",
  authDomain: "nsfopendata.firebaseapp.com",
  projectId: "nsfopendata",
  storageBucket: "nsfopendata.appspot.com",
  messagingSenderId: "534112304877",
  appId: "1:534112304877:web:12c89010611160931cd6e4",
  measurementId: "G-Q543M8QW7L",
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

export default auth;
