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
      <IonHeader>
        <IonToolbar>
          <div className="centerItem">
            <img
              className="logoPic"
              src="https://www.vanderbilt.edu/communications/brand/images/VUPrint.jpg"
            ></img>{" "}
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

export {};
export default QueryPage;
