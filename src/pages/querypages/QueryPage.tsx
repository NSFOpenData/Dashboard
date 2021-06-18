import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonButton, IonText, IonDatetime, IonRow, IonItem, IonCol, IonLabel, IonInput, IonSelectOption, IonSelect, IonAvatar, IonSegment, IonSegmentButton, IonChip, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonCardSubtitle, IonLoading, IonList, IonItemDivider } from '@ionic/react';
import React, {useState, Component, useRef} from 'react';
import './QueryPage.css';

const QueryPage: React.FC = () => {
    // choose either vehicle or animal search

    return (
      <IonPage>
        <IonHeader>
            <IonToolbar>
            <IonRow>
                <IonAvatar></IonAvatar>
                <IonAvatar></IonAvatar>
                <div className="logo">
                    <img  src="https://cps-iot-week2021.isis.vanderbilt.edu/images/VUISISlogo.png"></img>
                </div>
            </IonRow>
            </IonToolbar>
        </IonHeader>
  
        <IonContent className="profilePage"> 
        
            <IonAvatar></IonAvatar>
            <IonAvatar></IonAvatar>
            <IonAvatar></IonAvatar>
            <IonAvatar></IonAvatar>


            <text className="title">Advanced Query Page</text>
            
            <IonAvatar></IonAvatar>

            <IonButton fill="solid" expand="block" routerLink={'/vehicleQueryPage'}>Vehicle Search</IonButton>
            <IonButton className="login-button" expand="block" color="secondary" routerLink={'/animalQueryPage'}>Animal Search</IonButton>
            
            
        
        </IonContent>
      </IonPage >
    );
  
  }

  // vehicle related variables
//   export {vMake, vModel, vColor, vApproxLoc, vLicense}
  // animal related variables
  export {}
  export default QueryPage;
