import { Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonContent } from "@ionic/react";
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

/* Private routes */
import PrivateRoute from "./PrivateRoute";

/* Auth Pages */
import AuthMain from "./pages/authpages/AuthMain";
//import LoginPage from "./pages/authpages/LoginPage";
import RegisterPage from "./pages/authpages/RegisterPage";
import SignOut from "./pages/authpages/SignOut";

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

import TopMenu from "./components/TopMenu";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      {/* <IonTabs> */}
      <TopMenu />
      <IonContent>
        <IonRouterOutlet>
          <Route path="/tempEmailPage" component={TempEmailPage} />
          {/* Auth Pages */}
          <Route exact path="/authentication" component={AuthMain} />
          <Route exact path="/registerpage" component={RegisterPage} />
          <Route exact path="/mainpage" component={MainPage} />
          <Route exact path="/" component={MainPage} />
          <PrivateRoute path="/profilePage" component={ProfilePage} />

          {/* Dashboard Pages */}
          <PrivateRoute
            exact
            path="/trafficDashboard"
            component={TrafficDashboard}
          />
          <PrivateRoute
            exact
            path="/licenseDashboard"
            component={LicenseDashboard}
          />
          <PrivateRoute
            exact
            path="/deliveryDashboard"
            component={DeliveryDashboard}
          />
          <PrivateRoute
            exact
            path="/animalDashboard"
            component={AnimalDashboard}
          />
          <PrivateRoute
            exact
            path="/uploadPageL"
            component={UploadPageLicense}
          />
          <PrivateRoute
            exact
            path="/uploadPageA"
            component={UploadPageAnimal}
          />
          <PrivateRoute
            exact
            path="/reportLostPetPage"
            component={ReportLostPetPage}
          />
          <PrivateRoute
            exact
            path="/reportLostVehiclePage"
            component={ReportLostVehiclePage}
          />
          <PrivateRoute exact path="/signout" component={SignOut} />

          {/* Query Pages */}
          <PrivateRoute exact path="/queryPage" component={QueryPage} />
          <PrivateRoute
            exact
            path="/queryResultPage"
            component={QueryResultPage}
          />
          <PrivateRoute
            exact
            path="/vehicleQueryPage"
            component={VehicleQueryPage}
          />
          <PrivateRoute
            exact
            path="/animalQueryPage"
            component={AnimalQueryPage}
          />

          {/* Advanced Time Setting Page */}
          <PrivateRoute
            exact
            path="/extendedDateAndTime1"
            component={ExtendedDateAndTime}
            dashBoardNum={1}
          />
          <PrivateRoute
            exact
            path="/extendedDateAndTime2"
            component={ExtendedDateAndTime}
            dashBoardNum={2}
          />
          <PrivateRoute
            exact
            path="/extendedDateAndTime3"
            component={ExtendedDateAndTime}
            dashBoardNum={3}
          />
          <PrivateRoute
            exact
            path="/extendedDateAndTime4"
            component={ExtendedDateAndTime}
            dashBoardNum={4}
          />

          {/* <IonTabBar slot="bottom">
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
        </IonTabBar> */}
          {/* </IonTabs> */}
        </IonRouterOutlet>
      </IonContent>
    </IonReactRouter>
    {/* </IonContent> */}
  </IonApp>
);

export default App;
