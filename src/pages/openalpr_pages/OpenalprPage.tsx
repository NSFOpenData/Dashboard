
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonicSafeString, IonRow, IonAvatar } from '@ionic/react';
import React, { Component } from 'react';
import {ModalController,  AlertController, Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { OpenALPR, OpenALPROptions, OpenALPRResult } from 'cordova-plugin-openalpr/native';
import './OpenalprPage.css';

import {OpenalprResultPage} from './OpenalprResultPage';
import { CameraResultType, Capacitor } from "@capacitor/core";
import { useCamera, availableFeatures } from "@ionic/react-hooks/camera";
import {
  MediaFile,
  VideoCapturePlusOptions,
  VideoCapturePlus,
} from "@ionic-native/video-capture-plus";

const OpenalprPage: React.FC = () => {

  const { photo, getPhoto } = useCamera();

  const takePhoto = () => {
    if (availableFeatures.getPhoto) {
      getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
      });
    }
  };

  const doMediaCapture = async () => {
    let options: VideoCapturePlusOptions = { 
        limit: 1, duration: 30 
    };
    let capture:any = await VideoCapturePlus.captureVideo(options);
    console.log((capture[0] as MediaFile).fullPath)
  };
    
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
        <IonButton onClick={() => doMediaCapture()}>
          VIDEO CAPATURE
        </IonButton>
      {/* <IonButton onClick={() => scan('camera')}>Scan Live With Camera</IonButton>
      <IonButton onClick={() => scan('library')}>Scan Picture</IonButton> */}
      <h2 className="titleItem">openalpr welcome</h2>
  
      </IonContent>
      </IonPage>

      
      );
};

export default OpenalprPage;