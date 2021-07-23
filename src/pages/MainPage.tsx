import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButton,
  IonAvatar,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import React from "react";
import "./MainPage.css";

// icons
import { albums } from "ionicons/icons";

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className="centerItem">
            <img
              className="logoPic"
              src="https://www.vanderbilt.edu/communications/brand/images/VUPrint.jpg"
            ></img>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonAvatar></IonAvatar>
        <IonButton
          expand="block"
          size="large"
          color="primary"
          routerLink={"/trafficDashboard"}
          className="eachButton"
        >
          <div className="icon">
            <i className="fas fa-car-alt"></i>
          </div>
          <IonLabel className="trafficDashboardText">
            Traffic Dashboard{" "}
          </IonLabel>
        </IonButton>
        <IonButton
          expand="block"
          size="large"
          color="secondary"
          routerLink={"/licenseDashboard"}
        >
          <IonIcon className="licenseIcon" icon={albums} />
          <IonLabel>License Dashboard</IonLabel>
        </IonButton>
        <IonButton
          expand="block"
          size="large"
          color="medium"
          routerLink={"/deliveryDashboard"}
        >
          <div className="truckIcon">
            <i className="fas fa-truck"></i>
          </div>
          <IonLabel>Delivery Dashboard</IonLabel>
        </IonButton>
        <IonButton
          expand="block"
          size="large"
          color="light"
          routerLink={"/animalDashboard"}
        >
          <div className="petIcon">
            <i className="fas fa-dog"></i>
          </div>

          <IonLabel className="animalDashboardText">Animal Dashboard</IonLabel>
        </IonButton>{" "}
        <IonAvatar></IonAvatar>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
