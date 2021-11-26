import {
  IonGrid,
  IonCol,
  IonContent,
  IonPage,
  IonRow,
  IonLabel,
  IonButton,
  IonIcon,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";
import "./ProfilePage.css";

import React, { useState, useEffect } from "react";
import { Plugins, CameraResultType } from "@capacitor/core";
import { RefresherEventDetail } from "@ionic/core";

import { useAuth } from "../../AuthContext";

/* GraphQL for API Calls */
import { gql, NetworkStatus, useQuery, useMutation } from "@apollo/client";

// for number of animals contributed
import { numAnimalsUploaded } from "../../pages/uploadpages/UploadPageAnimal";

import { caretDownOutline, chevronDownCircleOutline } from "ionicons/icons";

const { Camera } = Plugins;

const ProfilePage: React.FC = () => {
  const { logOut, currentUser, getAuthToken } = useAuth();
  const [user, setUser] = useState<any>();
  const [photo, setPhoto] = useState(
    "https://k00228961.github.io/RWD/img/picon.png"
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const LOGIN_MUTATION = gql`
    mutation login($idToken: String!, $email: String!) {
      login(idToken: $idToken, email: $email) {
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
      sessionStorage.setItem("token", login.token);
      setUser(login.user);
      setIsLoading(false);
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

  useEffect(() => {
    getAuthToken().then((token: any) => {
      login({ variables: { idToken: token, email: currentUser.email } });
    });
  }, []);

  const { loading, data, error, refetch, networkStatus } = useQuery(
    USER_QUERY,
    {
      // errorPolicy: "ignore",
      fetchPolicy: "network-only",
      notifyOnNetworkStatusChange: true,
      // nextFetchPolicy: "cache-first",
    }
  );

  if (networkStatus === NetworkStatus.refetch) console.log("refetching!");

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

  // a dummy boolean variable to reset the UI!
  const [reloadPage, setReloadPage] = useState<boolean>(false);
  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    console.log("Begin async operation");
    refetch();
    setReloadPage(!reloadPage);
    setTimeout(() => {
      console.log("Async operation has ended");
      event.detail.complete();
    }, 1000);
  }

  const isNotNull = (input: String) => {
    return input ? <b>{input}</b> : <i className="diluted">Empty</i>;
  };
  const isNotZero = (input: Number) => {
    return input ? <b>{input}</b> : <i className="diluted">--</i>;
  };

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
              alt="profile"
            ></img>
            <button className="pictureButton" onClick={takePicture}>
              <div className="cameraCenter">
                <i className="fas fa-camera fa-2x"></i>
              </div>
            </button>
          </div>
          <br />
        </div>
        <IonLabel className="centerItem username">
          {!loading && !isLoading && isNotNull(user.name)}
        </IonLabel>

        {/* Personal Info */}
        {!loading && !isLoading && (
          <div>
            <div className="centerItem">
              <h4 className="profileTitle">Personal Info</h4>
            </div>

            {/* <br/> */}
            <div className="centerItem">
              <div className="personalInfo profileInfo">
                <IonLabel className="personalDetails">E-mail</IonLabel>
                <br />
                <IonLabel className="personalDetails personalData">
                  {isNotNull(user.email)}
                </IonLabel>
                <br />
                {/* <div style={{lineHeight: "10px"}}> </div> */}

                <IonLabel className="personalDetails">Neighborhood</IonLabel>
                <br />
                <IonLabel className="personalDetails personalData">
                  {isNotNull(user.neighborhood.name)}
                </IonLabel>
                <br />
                <IonLabel className="personalDetails">Role</IonLabel>
                <br />
                <IonLabel className="personalDetails personalData">
                  {isNotNull(user.role)}
                </IonLabel>

                <IonButton
                  className="upgradeButton"
                  color="light"
                  size="small"
                  onClick={upgrade}
                >
                  Upgrade
                </IonButton>
                <br />
              </div>
            </div>
          </div>
        )}
        <br />

        {/* <div className="button-content"> */}
        {!loading && !isLoading && (
          <div>
            <div className="centerItem">
              <h4 className="profileTitle">Contributions</h4>
            </div>
            <div className="centerItem">
              <div className="contributions profileInfo">
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonLabel className="uploadedCount">
                        {isNotZero(numAnimalsUploaded)}
                      </IonLabel>
                      {/* REPLACE */}
                      <br />
                      <IonLabel>Traffic Reported</IonLabel>
                    </IonCol>
                    <IonCol offset-4>
                      <IonLabel className="uploadedCount">
                        {isNotZero(numAnimalsUploaded)}
                      </IonLabel>
                      {/* REPLACE */}
                      <br />
                      <IonLabel>Licenses Reported</IonLabel>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonLabel className="uploadedCount">
                        {isNotZero(numAnimalsUploaded)}
                      </IonLabel>
                      {/* REPLACE */}
                      <br />
                      <IonLabel>Deliveries Reported</IonLabel>
                    </IonCol>
                    <IonCol offset-4>
                      <IonLabel className="uploadedCount">
                        {isNotZero(numAnimalsUploaded)}
                      </IonLabel>
                      <br />
                      <IonLabel>Animals Reported</IonLabel>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </div>
            </div>
          </div>
        )}

        {/* <div className="bottomItem">
          <IonButton color="danger" size="small" onClick={logOut}>
            Log Out
          </IonButton>
        </div>
          {/* Contribution */}
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
