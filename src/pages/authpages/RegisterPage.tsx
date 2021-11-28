import {
  IonContent,
  IonPage,
  IonButton,
  IonItem,
  IonInput,
  IonIcon,
  IonAlert,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";
import "./RegisterPage.css";

/* GraphQL for API Calls */
import { gql, useMutation } from "@apollo/client";
import { chevronBackOutline } from "ionicons/icons";

// these have to be in the email in order to make sure email is valid
const atChar = "@";
const validDomains = [".com", ".net", ".org", ".edu", ".gov"];

const RegisterPage: React.FC = () => {
  const history = useHistory();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    neighborhood: "",
  });

  const [show, setShow] = useState(false);

  // https://github.com/howtographql/react-apollo/blob/master/src/components/Login.js
  const REGISTER_QUERY = gql`
    mutation ($name: String!, $email: String!, $neighborhood: String) {
      register(
        user: { name: $name, email: $email, neighborhood: $neighborhood }
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
      neighborhood: formState.neighborhood,
    },
    onCompleted: ({ register }) => {
      setShow(true);
      console.log(register);
    },
  });

  return (
    <IonPage className="centerItem">
      <IonContent className="profilePage signinregion ion-padding">
        <h1>Register your account</h1>
        <div className="signin">
          <div className="register-block">
            <h3>Full Name</h3>
              <IonInput
                placeholder="Enter your full name..."
                className="registerInput"
                onIonChange={(e) =>
                  setFormState({ ...formState, name: e.detail.value! })
                }
              ></IonInput>
            <h3>Email</h3>
              <IonInput
                type="email"
                placeholder="Enter your email..."
                className="registerInput"
                onIonChange={(e) =>
                  setFormState({ ...formState, email: e.detail.value! })
                }
              ></IonInput>
            <h3>Neighborhood</h3>
              <IonInput
                placeholder="Enter your neighborhood... (case-sensitive)"
                className="registerInput"
                onIonChange={(e) =>
                  setFormState({ ...formState, neighborhood: e.detail.value! })
                }
              ></IonInput>

            <IonButton
              className="registerButton"
              expand="full"
              onClick={() => register()}
              disabled={
                !(
                  formState.name.length > 0 &&
                  formState.email.length > 0 &&
                  formState.email.includes(atChar) &&
                  validDomains.includes(formState.email.slice(-4)) &&
                  formState.neighborhood.length > 3
                )
              }
            >
              Register
            </IonButton>
          </div>
        </div>

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
          <IonAlert 
            isOpen={show}
            onDidDismiss={() => setShow(false)}
            header={'Successfully Registered!'}
            // message={'You have successfully registered. Please log in.'}
            buttons={[
              {
                text: "Log In",
                handler: () => {
                  history.push("/authentication");
                },
              },
            ]}

          />
          {/* <IonToast
            isOpen={show}
            onDidDismiss={() => setShow(false)}
            message="Succesfully Registered!"
            buttons={[
              {
                text: "Log In",
                handler: () => {
                  history.push("/authentication");
                },
              },
            ]}
          /> */}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
