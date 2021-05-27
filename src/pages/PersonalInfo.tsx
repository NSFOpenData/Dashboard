import { IonGrid, IonCol, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonImg, IonLabel, IonButton, IonInput, IonFab, IonFabButton, IonIcon, IonItem, IonList, IonText, IonAvatar } from '@ionic/react';
import './PersonalInfo.css';

import React, { Component, useRef, useState } from 'react';
import { Plugins, CameraResultType } from '@capacitor/core';


const PersonalInfo: React.FC = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [privileged, setPrivileged] = useState(true);

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

        <IonContent className="profilePage">            
            
        </IonContent>
      </IonPage >
    );
}

export default PersonalInfo;
