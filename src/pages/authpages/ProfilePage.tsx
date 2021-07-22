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

/* GraphQL for API Calls */
import { gql, NetworkStatus, useQuery } from "@apollo/client";

// for number of animals contributed
import { numAnimalsUploaded } from "../../pages/uploadpages/UploadPageAnimal";

// to get rid of token when logging out
import {
  AUTH_TOKEN,
  userName,
  userEmail,
  userNeighborhood,
  userRole,
} from "../../pages/authpages/LoginPage";
import { caretDownOutline, chevronDownCircleOutline } from "ionicons/icons";

const { Camera } = Plugins;

const ProfilePage: React.FC = () => {
  const [photo, setPhoto] = useState(
    "https://k00228961.github.io/RWD/img/picon.png"
  );

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
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(AUTH_TOKEN)
  );
  function logOut() {
    localStorage.setItem(AUTH_TOKEN, "");
    setToken("");
  }

  // a dummy boolean variable to reset the UI!
  const [reloadPage, setReloadPage] = useState<boolean>(false);
  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    console.log("Begin async operation");

    refetch();
    setReloadPage(!reloadPage);
    // setUserName(data?.me?.name);
    // console.log(userName);
    // setUserName(data?.me?.name);

    setTimeout(() => {
      console.log("Async operation has ended");
      event.detail.complete();
    }, 1000);
  }

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

        <div className="bottomItem">
          <IonButton color="danger" size="small" onClick={() => logOut()}>
            Log Out
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
