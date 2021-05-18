import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonImg, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';

import React, { Component } from 'react';

const Tab2: React.FC = () => {
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
        <IonTitle>babo</IonTitle>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
