import {
  IonContent,
  IonText,
  IonRow,
  IonCol,
  IonIcon,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonImg,
  IonAvatar,
  IonLabel,
} from "@ionic/react";
import React, { Component } from "react";
import "./AuthMain.css";
import { Plugins } from "@capacitor/core";
// import "@codetrix-studio/capacitor-google-auth";

// icons
import {
  personAddOutline,
  personOutline,
  personCircleOutline,
} from "ionicons/icons";

import { AUTH_TOKEN } from "./LoginPage";

const INITIAL_STATE = {};

class AuthMain extends Component {
  render() {
    return (
      <IonPage className="centerItem">
        <IonHeader>
          <IonToolbar>
            <div className="centerItem">
              <img
                className="logoPic"
                src="https://www.vanderbilt.edu/communications/brand/images/VUPrint.jpg"
              ></img>
              {/* <img src="https://cps-iot-week2021.isis.vanderbilt.edu/images/VUISISlogo.png"></img> */}
            </div>
          </IonToolbar>
        </IonHeader>

        <IonAvatar></IonAvatar>
        <IonAvatar></IonAvatar>
        <IonAvatar></IonAvatar>
        <IonAvatar></IonAvatar>

        <IonContent className="ion-padding">
          {/* <IonButton className="login-button" onClick={() => this.signIn()} expand="block" fill="solid" color="danger">
            Login with Google
          </IonButton> */}

          <IonButton
            className="login-button"
            routerLink={"/registerpage"}
            expand="block"
            fill="solid"
            color="primary"
          >
            <IonIcon className="iconSize" icon={personAddOutline} />
            Register
          </IonButton>
          <IonButton
            className="login-button"
            routerLink={"/loginpage"}
            expand="block"
            fill="solid"
            color="secondary"
          >
            <IonIcon className="iconSize" icon={personOutline} />
            Login
          </IonButton>

          <IonAvatar></IonAvatar>

          {/* {AUTH_TOKEN.length > 0 && ( */}
          <div className="centerItem">
            <h5>Already Logged In?</h5>
          </div>
          <IonButton
            className="login-button"
            routerLink={"/profilePage"}
            expand="block"
            fill="solid"
            color="light"
          >
            <IonIcon className="iconSize" icon={personCircleOutline} />
            Profile page
          </IonButton>
          {/* )} */}
        </IonContent>
      </IonPage>
    );
  }
}

export default AuthMain;

/* -------------------------------------------------- */
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
// import React, { useState } from 'react';
// import axios from "axios";
// import { IonGrid, IonRow, IonCol } from '@ionic/react';
// import { personCircle } from "ionicons/icons";
// import { useHistory } from "react-router-dom";
// import { IonItem, IonLabel, IonInput, IonButton, IonIcon, IonAlert } from '@ionic/react';

// function validateEmail(email: string) {
//     const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
//     return re.test(String(email).toLowerCase());
// }

// const Authentication: React.FC = () => {
//   const history = useHistory();
//   const [email, setEmail] = useState<string>(""); //eve.holt@reqres.in
//   const [password, setPassword] = useState<string>(""); //cityslicka
//   const [iserror, setIserror] = useState<boolean>(false);
//   const [message, setMessage] = useState<string>("");

//   const handleLogin = () => {
//     if (!email) {
//         setMessage("Please enter a valid email");
//         setIserror(true);
//         return;
//     }
//     if (validateEmail(email) === false) {
//         setMessage("Your email is invalid");
//         setIserror(true);
//         return;
//     }

//     if (!password || password.length < 4) {
//         setMessage("Please enter your password");
//         setIserror(true);
//         return;
//     }

//     const loginData = {
//         "email": email,
//         "password": password
//     }

//     const api = axios.create({
//         baseURL: `https://reqres.in/api`
//     })
//     api.post("/login", loginData)
//         .then(res => {
//             history.push("/dashboard/" + email);
//         })
//         .catch(error=>{
//             setMessage("Auth failure! Please create an account");
//             setIserror(true)
//         })
//   };

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonTitle>Login</IonTitle>
//         </IonToolbar>
//       </IonHeader>
//       <IonContent fullscreen className="ion-padding ion-text-center">
//         <IonGrid>
//         <IonRow>
//           <IonCol>
//             <IonAlert
//                 isOpen={iserror}
//                 onDidDismiss={() => setIserror(false)}
//                 cssClass="my-custom-class"
//                 header={"Error"}
//                 message={message}
//                 buttons={["Dismiss"]}
//             />
//           </IonCol>
//         </IonRow>
//         <IonRow>
//           <IonCol>
//             <IonIcon
//                 style={{ fontSize: "70px", color: "#0040ff" }}
//                 icon={personCircle}
//             />
//           </IonCol>
//         </IonRow>
//           <IonRow>
//             <IonCol>
//                 <IonItem>
//                     <IonLabel position="floating"> Email</IonLabel>
//                     <IonInput
//                         type="email"
//                         value={email}
//                         onIonChange={(e) => setEmail(e.detail.value!)}
//                         >
//                     </IonInput>
//                 </IonItem>
//             </IonCol>
//           </IonRow>

//           <IonRow>
//             <IonCol>
//                 <IonItem>
//                     <IonLabel position="floating"> Password</IonLabel>
//                     <IonInput
//                         type="password"
//                         value={password}
//                         onIonChange={(e) => setPassword(e.detail.value!)}
//                         >
//                     </IonInput>
//                 </IonItem>
//             </IonCol>
//           </IonRow>
//           <IonRow>
//             <IonCol>
//               <p style={{ fontSize: "small" }}>
//                   By clicking LOGIN you agree to our <a href="https://www.isis.vanderbilt.edu/">Policy</a>
//               </p>
//               <IonButton expand="block" onClick={handleLogin}>Login</IonButton>
//               <p style={{ fontSize: "medium" }}>
//                   Don't have an account? <a href="https://www.isis.vanderbilt.edu/">Sign up!</a>
//               </p>

//             </IonCol>
//           </IonRow>
//         </IonGrid>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default Authentication;
