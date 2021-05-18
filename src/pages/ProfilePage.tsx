import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonImg, IonLabel, IonButton, IonFab, IonFabButton, IonIcon, IonList, IonText, IonAvatar } from '@ionic/react';
import './ProfilePage.css';

import React, { Component } from 'react';
import { Plugins, CameraResultType } from '@capacitor/core';
const { Camera } = Plugins;
//import { Dimensions } from 'react-native';
/* Kind of have to figure out to use this later but it keeps throwing an error */

// dimension of the phone
//const windowWidth = Dimensions.get('window').width;
//const windowHeight = Dimensions.get('window').height;

const INITIAL_STATE = {
  photo: '',
};

export class ProfilePage extends Component {
  state: any = {};
  props: any = {};
  constructor(props: any) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  async takePicture() {
    // take phot with Camera - it's editable as well
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    var imageUrl = image.webPath;
    // Can be set to the src of an image now
    this.setState({
      photo: imageUrl
    })
  }

  async upgrade(){
      // send to upgrading page OR external website
  }

  render() {
    const { photo } = this.state;
    let level = "Full Access"
    return (
      <IonPage>
        <IonHeader>
            <IonToolbar>
            <IonRow>
                <IonTitle></IonTitle>
                <img style={{ alignContent: "center", height: 70}} src="https://cps-iot-week2021.isis.vanderbilt.edu/images/VUISISlogo.png"></img>
                <IonTitle></IonTitle>
            </IonRow>
            </IonToolbar>
        </IonHeader>

        <IonContent className="profilePage">
            <IonAvatar></IonAvatar>
            
            {/*<IonImg className="pictureDimention" src={photo}></IonImg>*/}
            <img style={{height: 150, width: 150, borderRadius: 30}} src={photo} ></img>

            <IonButton color="light" size="small" onClick={() => this.takePicture()}>Change Picture</IonButton>
                    
            
        
            <IonAvatar></IonAvatar>
            <text style={{left: 100}}>First Name</text>
            <text> </text>
            <text>Last Name</text>

            <IonText>
                <h5>Your Accessbility Level: {level}</h5>
            </IonText>
            <IonButton color="light" size="small" onClick={() => this.upgrade()}>Press Here to Upgrade Your Accessbility</IonButton>


            
            
        </IonContent>
      </IonPage >
    );
  };
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