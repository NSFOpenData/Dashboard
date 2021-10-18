import {
  IonGrid,
  IonCol,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonCard,
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

import React, { useState, useEffect } from "react";
import { Plugins, CameraResultType } from "@capacitor/core";
import { RefresherEventDetail } from "@ionic/core";
import { getAuth, getRedirectResult, GoogleAuthProvider } from "firebase/auth"
import authHelper from './../../auth-helper'

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
  useEffect(() => {
    var result;

    // result = authHelper.getLoginInfo();
    
    // console.log(result)

    // userEmail = result.user.email!
    // userName = result.user.displayName!

    // const firebase = getFirebase()
    getRedirectResult(auth)
      .then((result) => {
        if(result)
          authHelper.addLoginInfo(result)
        console.log(authHelper.getLoginInfo())
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result!);
        const token = credential!.accessToken;
        const user = authHelper.getLoginInfo()!.user
        // The signed-in user info.
        // const user = result!.user;
        userEmail = user.email!
        userName = user.displayName!
        // console.log(credential)
        // console.log(user)
        // console.log(user.email)
        auth.currentUser?.getIdToken(true).then(function (tok) {
          login({ variables: { idToken: tok, email: "test@acc.com" } });
        }).catch(function (error) {
          console.log("Error obtaining token: ", error);
        });
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
      result = authHelper.getLoginInfo();
      if(result) {
        userEmail = result.user.email!
        userName = result.user.displayName!
      }
      
  }, []);

  const [photo, setPhoto] = useState(
    "https://k00228961.github.io/RWD/img/picon.png"
  );

  const LOGIN_MUTATION = gql`
    mutation login($idToken: String!, $email: String!) {
      login(idToken: $idToken, email: $email) {
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

  const isNotNull = (input: String) => {
    return input ? <b>{input}</b> : <i className="diluted">Empty</i>;
  }
  const isNotZero = (input: Number) => {
    return input ? <b>{input}</b> : <i className="diluted">--</i>;
  }

  return (
    <IonPage className="homeBackground">

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
              <div className="centerItem">
                <div className="profileImage">
                  <img
                    style={{ height: 150, width: 150, borderRadius: 30 }}
                    src={photo}
                  ></img>
                  <button className="pictureButton" onClick={takePicture}>
                    <div className="cameraCenter">
                      <i className="fas fa-camera fa-2x"></i>
                    </div>
                  </button>
                </div>
                <br/>
                
              </div>
              <IonLabel className="centerItem username">
                    {!loading &&
                      isNotNull(userName)
                    }
                  </IonLabel>


          {/* Personal Info */}
          {!loading && (
            <div>
              <div className="centerItem">
                <h4 className="profileTitle">Personal Info</h4>
              </div>

                
              {/* <br/> */}
              <div className="centerItem">
                <div className="personalInfo profileInfo">

                  <IonLabel className="personalDetails">E-mail</IonLabel>
                  <br/>
                  <IonLabel className="personalDetails personalData">{isNotNull(userEmail)}</IonLabel>
                  <br/>
                  {/* <div style={{lineHeight: "10px"}}> </div> */}

                  <IonLabel className="personalDetails">Neighborhood</IonLabel>
                  <br/>
                  <IonLabel className="personalDetails personalData">{isNotNull(userNeighborhood)}</IonLabel>
                  <br/>
                  <IonLabel className="personalDetails">Role</IonLabel>
                  <br/>
                  <IonLabel className="personalDetails personalData">{isNotNull(userRole)}</IonLabel>

                  <IonButton className="upgradeButton" color="light" size="small" onClick={upgrade}>
                    Upgrade
                  </IonButton>
                  <br/>
                </div>
              </div>
            </div>
          )}
          <br/>
 
          {/* <div className="button-content"> */}
          {!loading && (
            <div>
              <div className="centerItem">
                <h4 className="profileTitle">Contributions</h4>
              </div>
              <div className="centerItem">
                <div className="contributions profileInfo">
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        <IonLabel className="uploadedCount">{isNotZero(numAnimalsUploaded)}</IonLabel>{/* REPLACE */}
                        <br/>
                    <IonLabel>Traffic Reported</IonLabel>
                    </IonCol>
                    <IonCol offset-4>
                        <IonLabel className="uploadedCount">{isNotZero(numAnimalsUploaded)}</IonLabel>{/* REPLACE */}
                        <br/>
                    <IonLabel>Licenses Reported</IonLabel>
                    </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol>
                        <IonLabel className="uploadedCount">{isNotZero(numAnimalsUploaded)}</IonLabel>{/* REPLACE */}
                        <br/>
                    <IonLabel>Deliveries Reported</IonLabel>
                    </IonCol>
                    <IonCol offset-4>
                    <IonLabel className="uploadedCount">{isNotZero(numAnimalsUploaded)}</IonLabel>
                    <br/>
                    <IonLabel>Animals Reported</IonLabel>
                    </IonCol>
                    </IonRow>
                  </IonGrid>
                  </div>
                </div>
            </div>
          )}

        {/* <div className="bottomItem">
          <IonButton color="danger" size="small" onClick={() => logOut()}>
            Log Out
          </IonButton>
        </div>
          {/* Contribution */}
          
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
