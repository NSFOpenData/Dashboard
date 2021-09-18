import {
  IonContent,
  IonPage,
  IonButton,

} from "@ionic/react";
import React from "react";
import "./MainPage.css";


const Tab1: React.FC = () => {
  return (
    <IonPage className="homeBackground">
      
      <IonContent className="ion-padding">
      <h1 className="dash-title"><b>Dashboards</b></h1>
        <div className="button-content">
          <IonButton
            color="traffic"
            routerLink={"/trafficDashboard"}
            className="eachButton"
          >
            <div>
              <h1 className="dashboardText">
                <b>Traffic</b>
              </h1>
              <div className="icon">
                <i className="fas fa-car-alt fa-2x"></i>
                </div>
            </div>
          </IonButton>
          

          <IonButton
            color="license"
            routerLink={"/licenseDashboard"}
            className="eachButton"
          >
            <div>
              <h1 className="dashboardText"><b>License</b></h1>
              <div className="icon">
                <i className="fas fa-id-card-alt fa-2x"></i>
                </div>
            </div>
            
          </IonButton>

          <IonButton
            color="delivery"
            routerLink={"/deliveryDashboard"}
            className="eachButton"
          >
            <div>
              <h1 className="dashboardText"><b>Delivery</b></h1>
              <div className="icon">
                <i className="fas fa-truck fa-2x"></i>
                </div>
            </div>
          </IonButton>

          <IonButton
            color="animal"
            routerLink={"/animalDashboard"}
            className="eachButton"
          >
            <div>
              <h1 className="dashboardText"><b>Animal</b></h1>
              
              <div className="icon">
                <i className="fas fa-dog fa-2x"></i>
                </div>
            </div>
            
          </IonButton>{" "}
        </div>

      </IonContent>
      </IonPage>
  );
};

export default Tab1;
