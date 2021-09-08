import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  homeOutline,
  personCircleOutline,
  searchCircleOutline,
} from "ionicons/icons";
import MainPage from "./pages/MainPage";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

import "@mobiscroll/react/dist/css/mobiscroll.min.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/* Auth Pages */
import AuthMain from "./pages/authpages/AuthMain";
import LoginPage from "./pages/authpages/LoginPage";
import RegisterPage from "./pages/authpages/RegisterPage";

/* Sub Pages */
import React from "react";
import TrafficDashboard from "./pages/TrafficDashboard";
import DeliveryDashboard from "./pages/DeliveryDashboard";
import LicenseDashboard from "./pages/LicenseDashboard";
import AnimalDashboard from "./pages/AnimalDashboard";
import ExtendedDateAndTime from "./pages/subpages/ExtendedDateAndTime";
import ProfilePage from "./pages/authpages/ProfilePage";
import UploadPageLicense from "./pages/uploadpages/UploadPageLicense";
import UploadPageAnimal from "./pages/uploadpages/UploadPageAnimal";
import ReportLostPetPage from "./pages/reportLostPages/ReportLostPetPage";
import ReportLostVehiclePage from "./pages/reportLostPages/ReportLostVehiclePage";

/* Query Pages */
import QueryPage from "./pages/querypages/QueryPage";
import QueryResultPage from "./pages/querypages/QueryResultPage";
import VehicleQueryPage from "./pages/querypages/VehicleQueryPage";
import AnimalQueryPage from "./pages/querypages/AnimalQueryPage";

import TempEmailPage from "./pages/TempEmailPage";


const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/tempEmailPage">
            <TempEmailPage />
          </Route>
          {/* Auth Pages */}
          <Route path="/authentication">
            <AuthMain />
          </Route>
          <Route path="/registerpage">
            <RegisterPage />
          </Route>
          <Route path="/loginpage">
            <LoginPage />
          </Route>

          <Route exact path="/mainPage">
            <MainPage />
          </Route>
          <Route exact path="/">
            <Redirect to="/mainPage" />
          </Route>
          <Route path="/profilePage">
            <ProfilePage />
          </Route>

          {/* Dashboard Pages */}
          <Route path="/trafficDashboard">
            <TrafficDashboard />
          </Route>
          <Route path="/licenseDashboard">
            <LicenseDashboard />
          </Route>
          <Route path="/deliveryDashboard">
            <DeliveryDashboard />
          </Route>
          <Route path="/animalDashboard">
            <AnimalDashboard />
          </Route>
          <Route path="/uploadPageL">
            <UploadPageLicense />
          </Route>
          <Route path="/uploadPageA">
            <UploadPageAnimal />
          </Route>
          <Route path="/reportLostPetPage">
            <ReportLostPetPage />
          </Route>
          <Route path="/reportLostVehiclePage">
            <ReportLostVehiclePage />
          </Route>

          {/* Query Pages */}
          <Route path="/queryPage">
            <QueryPage />
          </Route>
          <Route path="/queryResultPage">
            <QueryResultPage />
          </Route>
          <Route path="/vehicleQueryPage">
            <VehicleQueryPage />
          </Route>
          <Route path="/animalQueryPage">
            <AnimalQueryPage />
          </Route>

          {/* Advanced Time Setting Page */}
          <Route path="/extendedDateAndTime1">
            <ExtendedDateAndTime dashBoardNum={1} />
          </Route>

          <Route path="/extendedDateAndTime2">
            <ExtendedDateAndTime dashBoardNum={2} />
          </Route>

          <Route path="/extendedDateAndTime3">
            <ExtendedDateAndTime dashBoardNum={3} />
          </Route>

          <Route path="/extendedDateAndTime4">
            <ExtendedDateAndTime dashBoardNum={4} />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/mainPage">
            <IonIcon icon={homeOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/authentication">
            <IonIcon icon={personCircleOutline} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/queryPage">
            <IonIcon icon={searchCircleOutline} />
            <IonLabel>Search</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
