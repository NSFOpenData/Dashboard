
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonicSafeString, IonRow, IonAvatar } from '@ionic/react';
import React, { Component, useEffect } from 'react';
import { ModalController,  AlertController, Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { OpenALPR, OpenALPROptions, OpenALPRResult } from 'cordova-plugin-openalpr/native';
import './OpenalprPage.css';
import {OpenalprResultPage} from './OpenalprResultPage';

import photoToScan from './GetImagePage';


// const OpenalprPage: React.FC = () => {
export default class OpenalprPage extends React.Component{
  //OpenALPR options.
  protected openAlprOptions: OpenALPROptions;

  constructor(protected openalpr: OpenALPR, protected platform: Platform, protected modalController: ModalController) {
    super(openalpr);

    this.openAlprOptions = {
      amount: 3,
      country: this.openalpr.Country?.US
    };
  }

  scan(){
    this.openalpr.scan(photoToScan, this.openAlprOptions).then((result: [OpenALPRResult]) => {
      this.showResult(result);
    }).catch(error => console.error(error));

    if(this.platform.is("ios")){
      
    }
  }

  /**
 * Show the result using a modal.
 *
 * @param result
 */
    async showResult(result: OpenALPRResult[]) {
      // const modal = await this.modalController.create({
      //   component: OpenalprResultPage,
      //   componentProps: { result: result, country: "US" }
      // });

      // await modal.present();
      console.log("RESULT OF SCAN: " + result);
  }
    
  render(){
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

        <IonContent className="ion-padding">
          <IonButton onClick={() => this.scan()}>
            SCAN
          </IonButton>

        {/* <IonButton onClick={() => scan('camera')}>Scan Live With Camera</IonButton>
        <IonButton onClick={() => scan('library')}>Scan Picture</IonButton> */}
        <h2 className="titleItem">openalpr welcome</h2>
    
        </IonContent>
        </IonPage>
      );
    }
}

// export default OpenalprPage;