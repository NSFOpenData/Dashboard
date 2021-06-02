import { IonContent, IonText, IonRow, IonCol, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonImg, IonAvatar } from '@ionic/react';
import React, { Component } from 'react';
import './LoginPage.css';


const LoginPage: React.FC = () => {
    
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
           <h5>login</h5>
        </IonContent>
      </IonPage >
    );
  
  }
  
  export default LoginPage;