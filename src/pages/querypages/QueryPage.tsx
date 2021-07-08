import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonButton, IonText, IonDatetime, IonRow, IonItem, IonCol, IonLabel, IonInput, IonSelectOption, IonSelect, IonAvatar, IonSegment, IonSegmentButton, IonChip, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonCardSubtitle, IonLoading, IonList, IonItemDivider } from '@ionic/react';
import React, {useState, Component, useRef} from 'react';
import './QueryPage.css';

const QueryPage: React.FC = () => {
    // choose either vehicle or animal search

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
        
            <IonAvatar></IonAvatar>
            <IonAvatar></IonAvatar>
            <IonAvatar></IonAvatar>
            <IonAvatar></IonAvatar>

            <text className="title">Advanced Query Page</text>
            
            <IonAvatar></IonAvatar>

            <IonButton fill="solid" expand="block" routerLink={'/vehicleQueryPage'}>
              <div className="iconSize">
                <i className="fas fa-car-side"></i>
              </div>
              <IonAvatar></IonAvatar>
              Vehicle Search
            </IonButton>
            <IonButton className="login-button" expand="block" color="secondary" routerLink={'/animalQueryPage'}>
              <div className="iconSize">
                <i className="fas fa-paw"></i>
              </div>
              <IonAvatar></IonAvatar>
              Animal Search
            </IonButton>
            
            
        
        </IonContent>
      </IonPage >
    );
  
  }

  // vehicle related variables
//   export {vMake, vModel, vColor, vApproxLoc, vLicense}
  // animal related variables
  export {}
  export default QueryPage;
