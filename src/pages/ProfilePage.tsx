import { IonGrid, IonCol, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonImg, IonLabel, IonButton, IonInput, IonFab, IonFabButton, IonIcon, IonItem, IonList, IonText, IonAvatar } from '@ionic/react';
import './ProfilePage.css';

import React, { Component, useRef, useState } from 'react';
import { Plugins, CameraResultType } from '@capacitor/core';

/* GraphQL for API Calls */
import {gql, useQuery} from '@apollo/client';

const { Camera } = Plugins;
//import { Dimensions } from 'react-native';
/* Kind of have to figure out to use this later but it keeps throwing an error */

// dimension of the phone
//const windowWidth = Dimensions.get('window').width;
//const windowHeight = Dimensions.get('window').height;


//http://assets.stickpng.com/thumbs/585e4beacb11b227491c3399.png

const ProfilePage: React.FC = () => {
  const [photo, setPhoto] = useState("https://k00228961.github.io/RWD/img/picon.png")
  const [level, setLevel] = useState("Full");

  const USER_QUERY = gql`
    query getAll{
      me{
        name
        email
        role
      }
    }
  `;

  const { loading, data, error } = useQuery(USER_QUERY);

  async function takePicture() {
    // take phot with Camera - it's editable as well
    const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      });

      var imageUrl = image.webPath;
      console.log(imageUrl);
      
      // Can be set to the src of an image now
      setPhoto(imageUrl!);
    }

    function upgrade(){
          // send to upgrading page OR external website
    }

    function resetInputs(){
      /// firstNameInput.current!.value! = '';

    }

  return (
    <IonPage>
      <IonHeader>
          <IonToolbar>
          <IonRow>
              <IonAvatar></IonAvatar>
              <IonAvatar></IonAvatar>

              <img className="logo" src="https://cps-iot-week2021.isis.vanderbilt.edu/images/VUISISlogo.png"></img>
          </IonRow>
          </IonToolbar>
      </IonHeader>

      <IonContent className="profilePage">            
          {/*<IonImg className="pictureDimention" src={photo}></IonImg>*/}             
          
          <IonList>
            <IonGrid>
              <IonCol>
                <div className="centerItem">
                  <IonItem lines="none" className="profileImage">
                    <img style={{height: 150, width: 150, borderRadius: 30}} src={photo} ></img>
                  </IonItem>
                </div>
                

                <div className="centerItem">
                  <IonItem lines="none">
                    <IonButton color="light" size="small" onClick={() => takePicture()}>Change Profile Picture</IonButton>
                  </IonItem>
                </div>
                
              </IonCol>
            </IonGrid>

           
            {!loading && 
            <IonList>
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
                
            }

            {/* {!loading && data?.me?.map((user: any) => (
                <IonItem>
                  <IonLabel>Name: {user.name}</IonLabel>
                  <IonLabel>Email: {user.email}</IonLabel>
                  <IonLabel>Role/Privilege Level: {user.role}</IonLabel>
                </IonItem>

            ))} */}
          </IonList>

          <div className="centerItem">
            <IonButton color="light" size="small" onClick={() => upgrade()}>Press Here to Upgrade Your Accessbility</IonButton>
                 
          </div>

          <IonAvatar></IonAvatar>
          {/*           
          <div className="centerItem">
            <IonButton color="primary" size="small">Submit</IonButton>
            <IonButton color="danger" size="small">Reset</IonButton> 
          </div> */}
          
      </IonContent>
    </IonPage >
  );

}

export default ProfilePage;

// Source: https://enappd.com/blog/camera-and-gallery-in-ionic-react-app-using-capacitor/110/

/*
<IonFab color="primary" vertical="bottom" horizontal="center" slot="fixed">
    <IonFabButton color="primary" onClick={() => this.takePicture()}>
        <IonIcon name="add" />
    </IonFabButton>
</IonFab>
*/