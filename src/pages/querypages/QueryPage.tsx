import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButton,
  IonAvatar,
} from "@ionic/react";
import React from "react";
import "./QueryPage.css";

const QueryPage: React.FC = () => {
  return (
    <IonPage>

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

export {};
export default QueryPage;
