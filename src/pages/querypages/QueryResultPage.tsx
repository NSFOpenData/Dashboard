
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonButton, IonText, IonDatetime, IonRow, IonItem, IonCol, IonLabel, IonInput, IonSelectOption, IonSelect, IonAvatar, IonSegment, IonSegmentButton, IonChip, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonCardSubtitle, IonLoading, IonList, IonItemDivider } from '@ionic/react';
import React, {useState, Component, useRef} from 'react';
import './QueryResultPage.css';

// import {vMake, vModel, vColor, vApproxLoc, vLicense} from './QueryPage';
import {} from './QueryPage';


const QueryResultPage: React.FC = () => {

    return (
      <IonPage>
        {/* <IonHeader>
            <IonToolbar>
            <IonRow>
                <IonAvatar></IonAvatar>
                <IonAvatar></IonAvatar>
                <img className="logo" src="https://cps-iot-week2021.isis.vanderbilt.edu/images/VUISISlogo.png"></img>
            </IonRow>
            </IonToolbar>
        </IonHeader> */}
  
        <IonContent className="profilePage"> 
            <h5 style={{fontWeight: "bold"}}>| Query Result Page</h5>
            <IonButton color="danger" expand="block" routerLink={'/queryPage'}>Go Back</IonButton>
        </IonContent>
      </IonPage >
    );
  
  }
  
  export default QueryResultPage;
