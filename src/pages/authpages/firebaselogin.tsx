//firebase
import { getAuth, signInWithRedirect, getRedirectResult, GoogleAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider();
const auth = getAuth();
console.log("here")

signInWithRedirect(auth, provider)

//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access Google APIs.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential!.accessToken;
//     console.log("token", token);
//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//   });
