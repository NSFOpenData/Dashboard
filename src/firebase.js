import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";

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

// const auth = getAuth(firebaseApp);

GoogleAuth.initialize({
  clientId:
    // "695008288367-8q1ds47hs82g6tdbnokrc5dg4g18el7b.apps.googleusercontent.com",
    "534112304877-oe1co2qm5pufrov9sf0d5i4d62ms3721.apps.googleusercontent.com",
  androidClientId:
    "534112304877-u2ol3coivb3bsdk6ev05k3vfrc9ukt72.apps.googleusercontent.com",
  scopes: ["profile", "email"],
  grantOfflineAccess: true,
});
const auth = getAuth(firebaseApp);
export { firebaseApp };
export default auth;
