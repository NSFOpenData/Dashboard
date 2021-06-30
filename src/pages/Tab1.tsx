
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonicSafeString, IonRow, IonAvatar } from '@ionic/react';
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
            <IonAvatar></IonAvatar>
            <IonAvatar></IonAvatar>

          
            <img className="logo" src="https://cps-iot-week2021.isis.vanderbilt.edu/images/VUISISlogo.png"></img>
        
           
          </IonRow>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>

      
        <h2 className="titleItem">Dashboards</h2>
  
        <IonCard button={true} color="tertiary" routerLink={'/trafficDashboard'}>
          <IonCardHeader>
            <IonCardTitle>Traffic Dashboard</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            Time, Number of Cars, and Street Information
          </IonCardContent>
        </IonCard>


        <IonCard button={true} color="primary" routerLink={'/licenseDashboard'}>
          <IonCardHeader>
            <IonCardTitle>License Dashboard</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            License, Time, and Location Information
          </IonCardContent>
        </IonCard>

        <IonCard button={true} color="secondary" routerLink={'/deliveryDashboard'}>
          <IonCardHeader>
            <IonCardTitle>Delivery Dashboard</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            Time, Type, and Location Information
          </IonCardContent>
        </IonCard>

        <IonCard button={true} color="light" routerLink={'/animalDashboard'}>
          <IonCardHeader>
            <IonCardTitle>Animal Dashboard</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            Time, Color, and Location Information
          </IonCardContent>
        </IonCard>

        <h2 className="titleItem">Tools</h2>
        <IonCard button={true} color="medium" routerLink={'/getImagePage'}>
          <IonCardHeader>
            <IonCardTitle>OpenALPR Tool</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            Read License Live-Time
          </IonCardContent>
        </IonCard>

      
      </IonContent>
    </IonPage>

 
  );
};

export default Tab1;