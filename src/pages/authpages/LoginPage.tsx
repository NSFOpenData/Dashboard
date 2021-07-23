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

const LoginPage: React.FC = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const LOGIN_MUTATION = gql`
    mutation ($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        user {
          name
          email
          neighborhood {
            name
          }
          role
        }
        token
      }
    }
  `;

  const [login, { data, error, loading }] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password,
    },

    onCompleted: ({ login }) => {
      console.log("login", login.user);
      userName = login.user.name;
      userEmail = login.user.email;
      userNeighborhood = login.user.neighborhood.name;
      userRole = login.user.role;

      console.log(userName, userEmail, userNeighborhood, userRole);
      localStorage.setItem(AUTH_TOKEN, login.token);

      // AUTH_TOKEN = login.token;

      // console.log("TOKEN: ", AUTH_TOKEN);
    },
  });

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

      <IonContent className="profilePage">
        <IonAvatar></IonAvatar>
        <IonItem>
          <IonInput
            placeholder="Email"
            onIonChange={(e) =>
              setFormState({ ...formState, email: e.detail.value! })
            }
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonInput
            placeholder="Password"
            onIonChange={(e) =>
              setFormState({ ...formState, password: e.detail.value! })
            }
          ></IonInput>
        </IonItem>

        {
          formState.email.length > 0 &&
            formState.password.length > 0 &&
            formState.email.includes(atChar) &&
            formState.email.includes(dot) &&
            formState.password.length >= 4 && (
              <IonButton
                expand="full"
                onClick={() => login()}
                routerLink={"/profilePage"}
              >
                Login
              </IonButton>
            )
          // IF SUCCESS, go to the profile page
        }

        {userName.length > 0 && console.log(userName)}
      </IonContent>
    </IonPage>
  );
};

export { AUTH_TOKEN, userName, userEmail, userNeighborhood, userRole };
export default LoginPage;
