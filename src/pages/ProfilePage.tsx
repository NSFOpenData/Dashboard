import {
  IonGrid,
  IonCol,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonImg,
  IonLabel,
  IonButton,
  IonInput,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonList,
  IonText,
  IonAvatar,
} from "@ionic/react";
import "./ProfilePage.css";

import React, { Component, useRef, useState } from "react";
import { Plugins, CameraResultType } from "@capacitor/core";

/* GraphQL for API Calls */
import { gql, NetworkStatus, useQuery } from "@apollo/client";

// for number of animals contributed
import { numAnimalsUploaded } from "../pages/uploadpages/UploadPageAnimal";

const { Camera } = Plugins;
//import { Dimensions } from 'react-native';
/* Kind of have to figure out to use this later but it keeps throwing an error */

// dimension of the phone
//const windowWidth = Dimensions.get('window').width;
//const windowHeight = Dimensions.get('window').height;

//http://assets.stickpng.com/thumbs/585e4beacb11b227491c3399.png

const ProfilePage: React.FC = () => {
  const [photo, setPhoto] = useState(
    "https://k00228961.github.io/RWD/img/picon.png"
  );
  const [level, setLevel] = useState("Full");

  const USER_QUERY = gql`
    query getAll {
      me {
        name
        email
        role
      }
    }
  `;

  const { loading, data, error, refetch, networkStatus } = useQuery(
    USER_QUERY,
    {
      errorPolicy: "ignore",
      fetchPolicy: "cache-and-network",
      notifyOnNetworkStatusChange: true,
      nextFetchPolicy: "cache-first",

      // errorPolicy: 'ignore',
    }
  );

  if (networkStatus == NetworkStatus.refetch) console.log("refetching!");
  if (!loading) console.log(data.me.name);

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

  function resetInputs() {
    /// firstNameInput.current!.value! = '';
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className="centerItem">
            <img src="https://lh3.googleusercontent.com/proxy/gJcaKgiIGFDEeGC8ywwhYuq6V7ORJXtZDlD6Mnl-f5R41SiV1LUxrUI-DApcn8dsNRtVhphUPnTHNFiJ7A1hscmtB5AmNNJ_s_argNDcZyRLghm2J2Yh5-0au0YODdYKmHcuZvr1BsDk"></img>

            {/* <img src="https://cps-iot-week2021.isis.vanderbilt.edu/images/VUISISlogo.png"></img> */}
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent className="profilePage">
        {/*<IonImg className="pictureDimention" src={photo}></IonImg>*/}
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
                  <IonItem lines="none">
                    <IonButton
                      color="light"
                      size="small"
                      onClick={() => refetch()}
                    >
                      Reload Profile Page
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
                <IonLabel>Name: {data?.me?.name}</IonLabel>
              </IonItem>

              <IonItem>
                <IonLabel>Email: {data?.me?.email}</IonLabel>
              </IonItem>

              <IonItem>
                <IonLabel>Role/Privilege Level: {data?.me?.role}</IonLabel>
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

          {/* {!loading && data?.me?.map((user: any) => (
                <IonItem>
                  <IonLabel>Name: {user.name}</IonLabel>
                  <IonLabel>Email: {user.email}</IonLabel>
                  <IonLabel>Role/Privilege Level: {user.role}</IonLabel>
                </IonItem>

            ))} */}
        </IonList>

        <div className="centerItem">
          <IonButton color="light" size="small" onClick={() => upgrade()}>
            Press Here to Upgrade Your Accessbility
          </IonButton>
        </div>

        <IonAvatar></IonAvatar>

        <IonAvatar></IonAvatar>
        {/*           
          <div className="centerItem">
            <IonButton color="primary" size="small">Submit</IonButton>
            <IonButton color="danger" size="small">Reset</IonButton> 
          </div> */}
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;

// Source: https://enappd.com/blog/camera-and-gallery-in-ionic-react-app-using-capacitor/110/

/*
<IonFab color="primary" vertical="bottom" horizontal="center" slot="fixed">
    <IonFabButton color="primary" onClick={() => this.takePicture()}>
        <IonIcon name="add" />
    </IonFabButton>
</IonFab>
*/
