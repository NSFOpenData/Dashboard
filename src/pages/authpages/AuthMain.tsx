import { IonContent, IonIcon, IonPage, IonButton } from "@ionic/react";
import React, { useEffect, useState } from "react";
import "./AuthMain.css";
import { useAuth } from "../../AuthContext";
import { useHistory } from "react-router";

// icons
import { personAddOutline } from "ionicons/icons";
import { gql, useMutation } from "@apollo/client";

const AuthMain: React.FC = () => {
  const history = useHistory();
  const { logInWithGoogle, currentUser, logOut } = useAuth();
  const [user] = useState(currentUser);

  const LOGIN2_MUTATION = gql`
    mutation isRegistered($email: String!) {
      isRegistered(email: $email)
    }
  `;

  const [isRegistered] = useMutation(LOGIN2_MUTATION, {
    onCompleted: (result) => {
      if (result.isRegistered) {
        console.log("User was registered!");
        history.push("/profilePage");
      } else {
        console.log("User wasn't registered!");
        logOut();
        history.push("/registerpage");
      }
    },
  });

  const handleLogin = async () => {
    await logInWithGoogle();
  };

  useEffect(() => {
    if (user) {
      isRegistered({ variables: { email: user.email } });
    }
  }, [user, isRegistered]);

  return (
    <IonPage className="centerItem">
      <IonContent className="ion-padding signinregion">
        <h1>Log into your account</h1>
        <div className="signin">
          <div className="signin-block">
            <IonButton
              className="login-button"
              expand="block"
              fill="solid"
              color="secondary"
              onClick={handleLogin}
            >
              <IonIcon className="iconSize" icon={personAddOutline} />
              &nbsp;&nbsp;Continue with Google
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AuthMain;
