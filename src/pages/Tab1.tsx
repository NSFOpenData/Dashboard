
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonicSafeString, IonRow, IonAvatar, IonCol, IonLabel, IonIcon } from '@ionic/react';
import React from 'react';
//import { View } from 'react-native';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

// icons
import {carOutline, albums, cubeOutline, bugOutline} from 'ionicons/icons';


const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className="centerItem">
            <img src="http://sensys.acm.org/2014/resources/images/IsisLogo.jpg"></img>
          </div>
        </IonToolbar>
      
      </IonHeader>

      <IonContent className="ion-padding">  
        {/* <head>
          <script src="https://kit.fontawesome.com/9b94afdf90.js" crossOrigin="anonymous"></script>
        </head> */}
        <IonAvatar></IonAvatar>
        <IonButton expand="block" size="large" color="primary" routerLink={"/trafficDashboard"}>
          <div className="icon">
            <i className="fas fa-car-alt"></i>
          </div>
          <IonAvatar></IonAvatar>
          <IonAvatar></IonAvatar>
          <IonLabel>Traffic Dashboard</IonLabel>
        </IonButton>
    
        <IonButton expand="block" size="large" color="secondary" routerLink={"/licenseDashboard"}>
          <IonIcon className="icon" icon={albums} />
          <IonAvatar></IonAvatar>
          <IonAvatar></IonAvatar>
          <IonLabel>License Dashboard</IonLabel>
        </IonButton>

      <IonButton expand="block" size="large" color="medium" routerLink={"/deliveryDashboard"}>
        <div className="truckIcon">
          <i className="fas fa-truck"></i>
        </div>
        <IonAvatar></IonAvatar>
        <IonAvatar></IonAvatar>
        <IonLabel>Delivery Dashboard</IonLabel>
      </IonButton>

      <IonButton expand="block" size="large" color="light" routerLink={"/animalDashboard"}>
        <div className="icon">
          <i className="fas fa-dog"></i>
        </div>
        <IonAvatar></IonAvatar>
        <IonAvatar></IonAvatar>
        <IonLabel>Animal Dashboard</IonLabel>
      </IonButton>      
        
      </IonContent>
    </IonPage>

 
  );
};

export default Tab1;