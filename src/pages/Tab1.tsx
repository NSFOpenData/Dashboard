
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonicSafeString, IonRow } from '@ionic/react';
import React from 'react';
//import { View } from 'react-native';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonRow>
            <IonTitle></IonTitle>
            {/*<IonImg src={"https://cps-iot-week2021.isis.vanderbilt.edu/images/VUISISlogo.png"}></IonImg>*/}
            <img style={{ alignContent: "center", height: 70}} src="https://cps-iot-week2021.isis.vanderbilt.edu/images/VUISISlogo.png"></img>
            {/*<img src=".././resources/mainpage/logo.png"></img>*/}
            <IonTitle></IonTitle>
          </IonRow>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>

        <IonCard button={true} color="tertiary" routerLink={'/trafficDashboard'}>
          <IonCardHeader>
            <IonCardTitle>Traffic Dashboard</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            View Time, Number of Cars, and Street Information
          </IonCardContent>
        </IonCard>


        <IonCard button={true} color="primary" routerLink={'/licenseDashboard'}>
          <IonCardHeader>
            <IonCardTitle>License Dashboard</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            View License, Time, and Location Information
          </IonCardContent>
        </IonCard>

        <IonCard button={true} color="secondary" routerLink={'/deliveryDashboard'}>
          <IonCardHeader>
            <IonCardTitle>Delivery Dashboard</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            View Time, Type, and Location Information
          </IonCardContent>
        </IonCard>

        <IonCard button={true} color="light" routerLink={'/animalDashboard'}>
          <IonCardHeader>
            <IonCardTitle>Animal Dashboard</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            View Time, Color, and Location Information
          </IonCardContent>
        </IonCard>

      
      </IonContent>
    </IonPage>

 
  );
};

export default Tab1;