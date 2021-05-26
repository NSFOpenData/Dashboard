
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonButton, IonText, IonDatetime, IonRow, IonLabel, IonSelect, IonSelectOption, IonItem, IonAvatar } from '@ionic/react';
import React, {Component, useState} from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './MultipleUpload.css';

// import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';


export class MultipleUpload extends Component {

    constructor(private imagePicker: ImagePicker) {
        super(imagePicker);
    }

    getPictures() {
        
        let options: ImagePickerOptions = {  
              //here Quality of images, defaults to 100  
              quality: 100,  
              //here Width of an Image  
              width: 600,  
              //here Height of an Image  
              height: 600,  
              /** Output type, defaults to 0 (FILE_URI). 
              * FILE_URI :0 (number) it returns a actual path for an image 
              */  
              
              outputType: 1, 
              
              maximumImagesCount: 8
              // max images to be selected, defaults to 15. 
        }; 
        
        this.imagePicker.getPictures(options).then((results) => {
            for (var i = 0; i < results.length; i++) {
                console.log('Image URI: ' + results[i]);
            }
        }, (err) => { });
    }

    render(){
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
                <IonAvatar></IonAvatar>
                <IonAvatar></IonAvatar>
                <IonAvatar></IonAvatar>
                <IonRow>
                    <IonAvatar></IonAvatar>

                    <IonButton size="default" onClick={() => this.getPictures()}>Click to Upload Multiple</IonButton>
                </IonRow>


            </IonContent>
          </IonPage>
      
       
        );

    };
};

export default MultipleUpload;