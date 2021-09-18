import {
  IonContent,
  IonIcon,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButton,
  IonAvatar,
} from "@ionic/react";
import React, { Component } from "react";
import "./AuthMain.css";
import { Plugins } from "@capacitor/core";
import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";


// icons
import {
  personAddOutline,
  personOutline,
  personCircleOutline,
} from "ionicons/icons";
import { abort } from "process";

var userEmail = "";
  const AuthMain: React.FC = () => {
    const auth = getAuth();
    const SignInOnClick = (provider: any) => 
    signInWithRedirect(auth, provider);
    return (
      <IonPage className="centerItem">
        {/* <IonHeader>
          <IonToolbar>
            <div className="centerItem">
              <img
                className="logoPic"
                src="https://www.vanderbilt.edu/communications/brand/images/VUPrint.jpg"
              ></img>
            </div>
          </IonToolbar>
        </IonHeader> */}

        <IonAvatar></IonAvatar>
        <IonAvatar></IonAvatar>
        <IonAvatar></IonAvatar>
        <IonAvatar></IonAvatar>

        <IonContent className="ion-padding">
          {/* <IonButton
            className="login-button"
            routerLink={"/registerpage"}
            expand="block"
            fill="solid"
            color="primary"
          >
            <IonIcon className="iconSize" icon={personAddOutline} />
            Register
          </IonButton> */}
         
          <IonButton
            className="login-button"
            expand="block"
            fill="solid"
            color="secondary"
            onClick={
              () => SignInOnClick(new GoogleAuthProvider())
            }
            routerLink = {"/profilePage"}
          >
            <IonIcon className="iconSize" icon={personOutline} />
            Sign in with Google
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
        </IonContent>
      </IonPage>
    );
  }

export default AuthMain;
