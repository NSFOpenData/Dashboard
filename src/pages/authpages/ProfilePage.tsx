import {
  IonGrid,
  IonCol,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonRow,
  IonLabel,
  IonButton,
  IonIcon,
  IonItem,
  IonList,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";
import "./ProfilePage.css";

import React, { useState } from "react";
import { Plugins, CameraResultType } from "@capacitor/core";
import { RefresherEventDetail } from "@ionic/core";
import { getAuth, getRedirectResult, GoogleAuthProvider } from "firebase/auth"

/* GraphQL for API Calls */
import { gql, NetworkStatus, useQuery, useMutation } from "@apollo/client";

// for number of animals contributed
import { numAnimalsUploaded } from "../../pages/uploadpages/UploadPageAnimal";

// to get rid of token when logging out
// import {
//   AUTH_TOKEN,
//   userName,
//   userEmail,
//   userNeighborhood,
//   userRole,
// } from "../../pages/authpages/LoginPage";
import { caretDownOutline, chevronDownCircleOutline } from "ionicons/icons";


var AUTH_TOKEN = "";
var userName = "";
var userEmail = "";
var userNeighborhood = "";
var userRole = "";
const { Camera } = Plugins;

const ProfilePage: React.FC = () => {
  const auth = getAuth();
  getRedirectResult(auth)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result!);
    const token = credential!.accessToken;
    // The signed-in user info.
    const user = result!.user;
    userEmail = user.email!
    userName = user.displayName!
    console.log(credential)
    console.log(user)
    console.log(user.email)
    login({variables : {token, userEmail}});    
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

  const [photo, setPhoto] = useState(
    "https://k00228961.github.io/RWD/img/picon.png"
  );

  const LOGIN_MUTATION = gql`
    mutation ($idToken: String!, $email: String!) {
      login(email: $email, password: $password) {
        isRegistered
        token
        user {
          name
          email
          neighborhood {
            name
          }
          role
        }
      }
    }
  `;

  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted: ({ login }) => {
        if(login.isRegistered) {          
          console.log("User was registered")
          // userName = login.user.name;
          // userEmail = login.user.email;
          // userNeighborhood = login.user.neighborhood.name;
          // userRole = login.user.role;
    
          // console.log(userName, userEmail, userNeighborhood, userRole);
          // localStorage.setItem(AUTH_TOKEN, login.token);
        }
        else {
          console.log("User wasn't registered!")
          //pass the token to the registration page
          //or store it so that it automatically registers after they login
        }
    },
  });

  const USER_QUERY = gql`
    query getAll {
      me {
        name
        email
        role
        neighborhood {
          name
        }
      }
    }
  `;

  const { loading, data, error, refetch, networkStatus } = useQuery(
    USER_QUERY,
    {
      // errorPolicy: "ignore",
      fetchPolicy: "network-only",
      notifyOnNetworkStatusChange: true,
      // nextFetchPolicy: "cache-first",
    }
  );

  if (networkStatus == NetworkStatus.refetch) console.log("refetching!");

  async function takePicture() {
    // take phot with Camera - it's editable as well
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });

    var imageUrl = image.webPath;
    console.log(imageUrl);

    // Can be set to the src of an image now
    setPhoto(imageUrl!);
  }

  function upgrade() {
    // send to upgrading page OR external website
  }

  // for the purpose of logging out
  // const [token, setToken] = useState<string | null>(
  //   localStorage.getItem(AUTH_TOKEN)
  // );
  // function logOut() {
  //   localStorage.setItem(AUTH_TOKEN, "");
  //   setToken("");
  // }

  // a dummy boolean variable to reset the UI!
  const [reloadPage, setReloadPage] = useState<boolean>(false);
  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    console.log("Begin async operation");

    refetch();
    setReloadPage(!reloadPage);
    console.log(userName);
    // setUserName(data?.me?.name);

    setTimeout(() => {
      console.log("Async operation has ended");
      event.detail.complete();
    }, 1000);
  }

  return (
    <IonPage>
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

      <IonContent className="profilePage">
        <div style={{ margin: 3 }}>
          <IonIcon icon={caretDownOutline}></IonIcon>
          <text style={{ fontSize: 13, margin: 3 }}>pull to reload</text>
        </div>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent
            pullingIcon={chevronDownCircleOutline}
            pullingText="Pull to refresh"
            refreshingSpinner="circles"
            refreshingText="Refreshing..."
          ></IonRefresherContent>
        </IonRefresher>
        <IonList>
          <IonGrid>
            <IonCol>
              <div className="centerItem">
                <IonItem lines="none" className="profileImage">
                  <img
                    style={{ height: 150, width: 150, borderRadius: 30 }}
                    src={photo}
                  ></img>
                </IonItem>
              </div>

              <div className="centerItem">
                <IonRow>
                  <IonItem lines="none">
                    <IonButton
                      color="light"
                      size="small"
                      onClick={() => takePicture()}
                    >
                      Change Profile Picture
                    </IonButton>
                  </IonItem>
                </IonRow>
              </div>
            </IonCol>
          </IonGrid>

          {/* Personal Info */}
          {!loading && (
            <IonList>
              <IonItem lines="none">
                <h4 className="personalInfo">Personal Info</h4>
              </IonItem>
              <IonItem>
                <IonLabel>Name: {userName}</IonLabel>
              </IonItem>

              <IonItem>
                <IonLabel>Email: {userEmail}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Neighborhood: {userNeighborhood}</IonLabel>
              </IonItem>

              <IonItem>
                <IonLabel>Role/Privilege Level: {userRole}</IonLabel>
              </IonItem>
            </IonList>
          )}

          {/* Contribution */}
          {!loading && (
            <IonList>
              <IonItem lines="none">
                <h4 className="personalInfo">Contribution</h4>
              </IonItem>
              <IonItem>
                <IonLabel># Pets Reported: {numAnimalsUploaded}</IonLabel>
              </IonItem>
            </IonList>
          )}
        </IonList>

        <div className="centerItem">
          <IonButton color="light" size="small" onClick={() => upgrade()}>
            Press Here to Upgrade Your Accessbility
          </IonButton>
        </div>

        {/* <div className="bottomItem">
          <IonButton color="danger" size="small" onClick={() => logOut()}>
            Log Out
          </IonButton>
        </div> */}
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
