import { IonGrid, IonCol, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonImg, IonLabel, IonButton, IonInput, IonFab, IonFabButton, IonIcon, IonItem, IonList, IonText, IonAvatar } from '@ionic/react';
import './ProfilePage.css';
import './Authentication.css';
import "@codetrix-studio/capacitor-google-auth";

import React, { Component, useRef } from 'react';
import { Plugins, CameraResultType } from '@capacitor/core';
const { Camera } = Plugins;
//import { Dimensions } from 'react-native';
/* Kind of have to figure out to use this later but it keeps throwing an error */

// dimension of the phone
//const windowWidth = Dimensions.get('window').width;
//const windowHeight = Dimensions.get('window').height;

const INITIAL_STATE = {
  photo: 'http://assets.stickpng.com/thumbs/585e4beacb11b227491c3399.png',
  loggedIn: true,
  user: {}
};

//let firstNameInput = useRef<HTMLIonInputElement>(null);
//let secondNameInput = useRef<HTMLIonImgElement>(null);
//let birthdayInput = useRef<HTMLIonImgElement>(null);
//let neighborHoodInput = useRef<HTMLIonImgElement>(null);

export class ProfilePage extends Component {

  state: any = {};
  props: any = {};
  constructor(props: any) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
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

  async resetInputs(){
   /// firstNameInput.current!.value! = '';
  }

  /* FOR AUTHENTICATION */

  componentDidMount(){
    this.getUserInfo();
  }

  async signOut(): Promise<void> {
    const {history} = this.props;
    await Plugins.GoogleAuth.signOut();
    history.goBack();
  }

  async getUserInfo(){
    this.setState({
      user: {
        name: this.props.location.state.name,
        photo: this.props.location.state.image,
        email: this.props.location.state.email
      }
    })
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
            {/*<IonImg className="pictureDimention" src={photo}></IonImg>*/}             
            {/* {this.state.user.name && */}
              <IonList>
                <IonGrid>
                  <IonCol>
                    <IonItem lines="none">
                      <img style={{height: 150, width: 150, borderRadius: 30}} src={photo} ></img>
                    </IonItem>


                    <IonItem lines="none">
                      <IonButton color="light" size="small" onClick={() => this.takePicture()}>Change Profile Picture</IonButton>
                    </IonItem>
                  </IonCol>
                </IonGrid>


                <IonItem>
                  <IonLabel>First Name {this.state.user.name}</IonLabel>
                  <IonInput></IonInput>
                </IonItem>

                <IonItem>
                  <IonLabel>Last Name</IonLabel>
                  <IonInput></IonInput>
                </IonItem>

                <IonItem>
                  <IonLabel>Birthday</IonLabel>
                  <IonInput></IonInput>
                </IonItem>

                <IonItem>
                  <IonLabel>Neighborhood</IonLabel>
                  <IonInput></IonInput>
                </IonItem>

                <IonItem>
                  <IonLabel>Accessbility Level: {level}</IonLabel>
                </IonItem>

                <IonItem>
                  <IonButton className="login-button" onClick={() => this.signOut()} expand="full" fill="solid" color="danger">
                    Logout from Google
                  </IonButton>
                </IonItem>
              </IonList>

            {/* } */}
           
            <IonButton color="light" size="small" onClick={() => this.upgrade()}>Press Here to Upgrade Your Accessbility</IonButton>

            <IonAvatar></IonAvatar>
            <IonAvatar></IonAvatar>

            <IonCol>
              <IonItem >
                <IonButton color="primary" size="small" routerLink={'/authentication'}>Login</IonButton>
              </IonItem>

              <IonItem lines="none">
                <IonButton color="primary" size="small">Submit</IonButton>
                <IonButton color="danger" size="small">Reset</IonButton> 
              </IonItem>
            </IonCol>
            
            
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