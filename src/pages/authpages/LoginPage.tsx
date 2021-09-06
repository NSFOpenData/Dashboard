import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButton,
  IonAvatar,
  IonItem,
  IonInput,
} from "@ionic/react";
import React, { useState } from "react";
import "./LoginPage.css";
//firebase
import { getAuth, getRedirectResult, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";


/* GraphQL for API Calls */
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router";

var AUTH_TOKEN = "";
var userName = "";
var userEmail = "";
var userNeighborhood = "";
var userRole = "";

// these have to be in the email in order to make sure email is valid
const atChar = "@";
const dot = ".";

const provider = new GoogleAuthProvider();

const LoginPage: React.FC = () => {
  const auth = getAuth();
  signInWithRedirect(auth, provider);
  getRedirectResult(auth)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result!);
      const token = credential!.accessToken;
      console.log("hehe")
      console.log(token);
      // The signed-in user info.
      const user = result!.user;
      const routerLink = "/profilePage"

    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...

    });  
//   const [formState, setFormState] = useState({
//     email: "",
//     password: "",
//   });

  // const LOGIN_MUTATION = gql`
  //   mutation ($email: String!, $password: String!) {
  //     login(email: $email, password: $password) {
  //       user {
  //         name
  //         email
  //         neighborhood {
  //           name
  //         }
  //         role
  //       }
  //       token
  //     }
  //   }
  // `;

  // const [login, { data, error, loading }] = useMutation(LOGIN_MUTATION, {
  //   variables: {
  //     email: formState.email,
  //     password: formState.password,
  //   },

//     onCompleted: ({ login }) => {
//       console.log("login", login.user);
//       userName = login.user.name;
//       userEmail = login.user.email;
//       userNeighborhood = login.user.neighborhood.name;
//       userRole = login.user.role;

//       console.log(userName, userEmail, userNeighborhood, userRole);
//       localStorage.setItem(AUTH_TOKEN, login.token);
//     },
//   });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className="centerItem">
            <img
              className="logoPic"
              src="https://www.vanderbilt.edu/communications/brand/images/VUPrint.jpg"
            ></img>
          </div>
        </IonToolbar>
      </IonHeader>
                     <IonButton
                expand="full"
                routerLink={"/profilePage"}
              >
                Login
               </IonButton>
{/* 
       <IonContent className="profilePage">
         <IonAvatar></IonAvatar>
         <IonItem>
           <IonInput
            // placeholder="Email"
            // onIonChange={(e) =>
            //   setFormState({ ...formState, email: e.detail.value! })
            // }
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonInput
            // placeholder="Password"
            // onIonChange={(e) =>
            //   setFormState({ ...formState, password: e.detail.value! })
            // }
          ></IonInput>
        </IonItem>
       </IonContent> */}
     </IonPage>
   );
//         {
//           formState.email.length > 0 &&
//             formState.password.length > 0 &&
//             formState.email.includes(atChar) &&
//             formState.email.includes(dot) &&
//             formState.password.length >= 4 && (
//               <IonButton
//                 expand="full"
//                 onClick={() => login()}
//                 routerLink={"/profilePage"}
//               >
//                 Login
//               </IonButton>
//             )
//           // IF SUCCESS, go to the profile page
//         }

//         {userName.length > 0 && console.log(userName)}
//       </IonContent>
//     </IonPage>
//   );
};

export { AUTH_TOKEN, userName, userEmail, userNeighborhood, userRole };
export default LoginPage;
