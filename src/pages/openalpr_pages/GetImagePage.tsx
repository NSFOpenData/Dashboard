
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonicSafeString, IonRow, IonAvatar } from '@ionic/react';
import React, { Component, useEffect, useState } from 'react';
import './GetImagePage.css';

import {OpenalprResultPage} from './OpenalprResultPage';
import { CameraPhoto, CameraResultType, Capacitor } from "@capacitor/core";
import { useCamera, availableFeatures } from "@ionic/react-hooks/camera";
import {
  MediaFile,
  VideoCapturePlusOptions,
  VideoCapturePlus,
} from "@ionic-native/video-capture-plus";

// const [photoToScan, setPhotoToScan] = useState<CameraPhoto | null>();

let photoToScan: CameraPhoto | null;

// const OpenalprPage: React.FC = () => {
const GetImagePage: React.FC = () => {
  const { photo, getPhoto } = useCamera();

  const takePhoto = () => {
    if (availableFeatures.getPhoto) {
      getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        saveToGallery: false,
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

  useEffect(() => {
    photoToScan = photo!
    console.log("PHOTO STATE: ", photo)
  })
  
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
            VIDEO 
        </IonButton>
        <IonButton onClick={() => takePhoto()}>
            PHOTO
        </IonButton>
        {/* BUTTON TO GO TO THE ALPR PAGE */}
        <IonButton color="danger" routerLink={'/openalprPage'}>
            SCAN
        </IonButton>

        {/* <IonButton onClick={() => scan('camera')}>Scan Live With Camera</IonButton>
        <IonButton onClick={() => scan('library')}>Scan Picture</IonButton> */}
        <h2 className="titleItem">openalpr welcome</h2>

    </IonContent>
    </IonPage>
);
}

export {photoToScan}
export default GetImagePage;