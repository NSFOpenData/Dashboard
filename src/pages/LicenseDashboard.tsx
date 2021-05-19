
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonButton, IonText, IonDatetime, IonRow, IonItem, IonCol, IonLabel, IonInput } from '@ionic/react';
import { Datepicker } from '@mobiscroll/react';
import React, {useState, Component} from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './LicenseDashboard.css';

import { Plugins, CameraResultType } from '@capacitor/core';
const { Camera } = Plugins;

const INITIAL_STATE = {
  photo: 'http://assets.stickpng.com/thumbs/585e4beacb11b227491c3399.png',
};

export class LicenseDashboard extends Component{
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

  render(){
    const { photo } = this.state;

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

        <IonContent fullscreen>
          <IonButton color="primary" expand="full" disabled={true}>License Dashboard</IonButton>
          <IonTitle>
              <IonText>
                <h5>Date and Time:</h5>
              </IonText>
              {/*<IonText>
                <h6>
                  <IonDatetime displayFormat="MMM DD, YYYY HH:mm" min="1990" max="2030" value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!) }></IonDatetime>
                </h6>
              </IonText>*/}
              <Datepicker
                  controls={['datetime']}
                  select="range"
                  display="inline"
                  touchUi={true}
              />
              <IonRow>
                <IonButton color="light" size="small" routerLink={"/extendedDateAndTime2"}>Click Here for Advanced Time Setting</IonButton>
              </IonRow>
              

            </IonTitle>

          <IonTitle>
            <IonText>
              <h5>License Information:</h5>
            </IonText>

            <IonItem lines="none">
              <IonButton color="light" size="small" onClick={() => this.takePicture()}>Upload A Picture</IonButton>
              {/* Now, the variable "photo" has the image source */}
            </IonItem>
            <IonRow>
              <IonItem>
                <IonLabel>Write License Information:</IonLabel>
                <IonInput></IonInput>
              </IonItem>
              <IonItem lines="none">
                <IonButton>Submit</IonButton>
              </IonItem>
            </IonRow>

          </IonTitle>

          <IonTitle>
            <IonText>
              <h5>Location:</h5>
            </IonText>
          </IonTitle>
        </IonContent>
      </IonPage>
    );
  };
};

export default LicenseDashboard;