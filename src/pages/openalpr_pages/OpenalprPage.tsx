
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonicSafeString, IonRow, IonAvatar } from '@ionic/react';
import React from 'react';
import {ModalController,  AlertController, Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { OpenALPR, OpenALPROptions, OpenALPRResult } from 'cordova-plugin-openalpr/native';
import './OpenalprPage.css';

import {OpenalprResultPage} from './OpenalprResultPage';


//const OpenalprPage: React.FC = () => {
export class OpenalprPage extends React.Component{
    private cameraOptions: CameraOptions;
    public scanOptions: OpenALPROptions;
  
    constructor(private camera: Camera, private openALPR: OpenALPR, private alertCtrl: AlertController, private modalCtrl: ModalController, private platform: Platform) {
      super(camera, openALPR)
      this.cameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.CAMERA
      }
  
      this.scanOptions = {
        country: this.openALPR.Country.US,
        amount: 3
      }
  
    }
  
    /**
     * Take picture and send it to OpenALPR
     * @param input 
     */
    scan(input: string) {
      this.cameraOptions.sourceType = input === 'camera' ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.PHOTOLIBRARY;
  
      this.camera.getPicture(this.cameraOptions)
        .then((imageData) => {
          
          this.openALPR.scan(imageData, this.scanOptions)
            .then((result: [OpenALPRResult]) => {
  
              if (result.length < 1) {
                this.showError('No license plates found');
                return;
              }
  
              const bestResult = result[0];
              this.showResult(bestResult);
  
            }).catch((error: Error) => console.error(error));
        }).catch((error: Error) => console.error(error));
  
      if (this.platform.is('ios')) {
        this.camera.cleanup();
      }
    }
  
    /**
     * Show error using a popup
     * @param text {string}
     */
    showError(text: string) {
      const alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: text,
        buttons: ['OK']
      });
  
      alert.present();
    }
  
    /**
     * Show result using a popup
     * @param result {OpenALPRResult}
     */
    showResult(result: OpenALPRResult) {
      const modal = this.modalCtrl.create(OpenalprResultPage, { licensePlate: result.number });
      modal.present();
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

            <IonButton onClick={() => this.scan('camera')}>Scan Live With Camera</IonButton>
            <IonButton onClick={() => this.scan('library')}>Scan Picture</IonButton>
            <h2 className="titleItem">openalpr welcome</h2>
        
            </IonContent>
            </IonPage>

        
        );
    }
};

export default OpenalprPage;