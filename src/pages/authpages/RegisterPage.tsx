import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButton,
  IonAvatar,
  IonItem,
  IonInput,
  IonIcon,
} from "@ionic/react";
import React, { useState } from "react";
import "./RegisterPage.css";

/* GraphQL for API Calls */
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router";
import { chevronBackOutline } from "ionicons/icons";

// these have to be in the email in order to make sure email is valid
const atChar = "@";
const dotCom = ".com";

const RegisterPage: React.FC = () => {
  const [formState, setFormState] = useState({
    // login: true,
    name: "",
    email: "",
    password: "",
    neighbordhood: "",
  });

  // https://github.com/howtographql/react-apollo/blob/master/src/components/Login.js
  const REGISTER_QUERY = gql`
    mutation (
      $name: String!
      $email: String!
      $password: String!
      $neighborhood: String
    ) {
      register(
        user: {
          name: $name
          email: $email
          password: $password
          neighborhood: $neighborhood
        }
      ) {
        email
        name
        role
      }
    }
  `;
  const [register] = useMutation(REGISTER_QUERY, {
    variables: {
      name: formState.name,
      email: formState.email,
      password: formState.password,
      neighborhood: formState.neighbordhood,
    },
    onCompleted: ({ register }) => {
      console.log(register);
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
            ></img>{" "}
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent className="profilePage">
        <IonAvatar></IonAvatar>
        <IonItem>
          <IonInput
            placeholder="Full Name"
            onIonChange={(e) =>
              setFormState({ ...formState, name: e.detail.value! })
            }
          ></IonInput>
        </IonItem>
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
            placeholder="Password (at least 5 characters)"
            onIonChange={(e) =>
              setFormState({ ...formState, password: e.detail.value! })
            }
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonInput
            placeholder="Neighborhood - Capitalize the first letter please"
            onIonChange={(e) =>
              setFormState({ ...formState, neighbordhood: e.detail.value! })
            }
          ></IonInput>
        </IonItem>

        {formState.name.length > 0 &&
          formState.email.length > 0 &&
          formState.email.includes(atChar) &&
          formState.email.includes(dotCom) &&
          formState.password.length > 4 &&
          formState.neighbordhood.length > 3 && (
            <IonButton expand="full" onClick={() => register()}>
              Register
            </IonButton>
          )}

        <div className="centerItem">
          <p>After registering, please go back and Log In</p>
        </div>

        {/* {!formState.email.includes(atChar) && !formState.email.includes(dotCom) &&
                <IonLabel>Wrong Email Format</IonLabel>
            } */}

        {/* <IonButton color="secondary" size="default" routerLink={"/loginpage"}>Log In</IonButton> */}

        {/* get inputs from the user first */}
        {/* check that every input has length greater than 1*/}
        {/* then, when the user presses submit, call the registermutation function */}

        <div className="backButton">
          <IonButton
            color="light"
            routerLink={"/authentication"}
            routerDirection="back"
          >
            <IonIcon icon={chevronBackOutline}></IonIcon>
            back
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
