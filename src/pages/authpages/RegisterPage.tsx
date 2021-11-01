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
  IonToast
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";
import "./RegisterPage.css";

/* GraphQL for API Calls */
import { gql, useMutation } from "@apollo/client";
import { chevronBackOutline } from "ionicons/icons";

// these have to be in the email in order to make sure email is valid
const atChar = "@";
const dotCom = ".com";

const RegisterPage: React.FC = () => {
  const hist = useHistory()
  const [formState, setFormState] = useState({
    // login: true,
    name: "",
    email: "",
    neighborhood: "",
  });

  const [show, setShow] = useState(false);

  // https://github.com/howtographql/react-apollo/blob/master/src/components/Login.js
  const REGISTER_QUERY = gql`
    mutation (
      $name: String!
      $email: String!
      $neighborhood: String
    ) {
      register(
        user: {
          name: $name
          email: $email
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
      neighborhood: formState.neighborhood,
    },
    onCompleted: ({ register }) => {
      setShow(true)
      console.log(register);
    },
  });

  return (
    <IonPage className="centerItem">
      {/* <IonHeader>
        <IonToolbar>
          <div className="centerItem">
            <img
              className="logoPic"
              src="https://www.vanderbilt.edu/communications/brand/images/VUPrint.jpg"
            ></img>{" "}
          </div>
        </IonToolbar>
      </IonHeader> */}

      <IonContent className="profilePage signinregion">
        <h1>Register</h1>
        <div className="signin">
          <div className="register-block">
        <IonItem style={{width: '400px'}}>
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
            placeholder="Neighborhood - Capitalize the first letter please"
            onIonChange={(e) =>
              setFormState({ ...formState, neighborhood: e.detail.value! })
            }
          ></IonInput>
        </IonItem>

       <IonButton expand="full" onClick={() => register()} disabled={!(formState.name.length > 0 &&
              formState.email.length > 0 &&
              formState.email.includes(atChar) &&
              formState.email.includes(dotCom) &&
              formState.neighborhood.length > 3 )} style={{margin: '10px 0 0'}}>
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
          <IonToast
        isOpen={show}
        onDidDismiss={() => setShow(false)}
        message="Succesfully Registered!"
        buttons={[
          {
            text: "Log In",
            handler: () => {
              hist.push("/authentication")
            }}]}
        />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
