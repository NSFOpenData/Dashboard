import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonImg,
  IonButton,
  IonAvatar,
} from "@ionic/react";
import React, { useState, Component, useRef } from "react";
import "./QueryPage.css";

const QueryPage: React.FC = () => {
  // choose either vehicle or animal search

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className="centerItem">
            <img src="https://lh3.googleusercontent.com/proxy/gJcaKgiIGFDEeGC8ywwhYuq6V7ORJXtZDlD6Mnl-f5R41SiV1LUxrUI-DApcn8dsNRtVhphUPnTHNFiJ7A1hscmtB5AmNNJ_s_argNDcZyRLghm2J2Yh5-0au0YODdYKmHcuZvr1BsDk"></img>
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

        <IonButton fill="solid" expand="block" routerLink={"/vehicleQueryPage"}>
          <div className="iconSize">
            <i className="fas fa-car-side"></i>
          </div>
          <IonAvatar></IonAvatar>
          Vehicle Search
        </IonButton>
        <IonButton
          className="login-button"
          expand="block"
          color="secondary"
          routerLink={"/animalQueryPage"}
        >
          <div className="iconSize">
            <i className="fas fa-paw"></i>
          </div>
          <IonAvatar></IonAvatar>
          Animal Search
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

// vehicle related variables
//   export {vMake, vModel, vColor, vApproxLoc, vLicense}
// animal related variables
export {};
export default QueryPage;
