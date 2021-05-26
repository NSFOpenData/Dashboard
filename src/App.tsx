import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, ellipsisHorizontalCircleOutline, homeOutline, personCircleOutline, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

import '@mobiscroll/react/dist/css/mobiscroll.min.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Sub Pages */
import React from 'react';
import TrafficDashboard from './pages/TrafficDashboard';
import DeliveryDashboard from './pages/DeliveryDashboard';
import LicenseDashboard from './pages/LicenseDashboard';
import AnimalDashboard from './pages/AnimalDashboard';
import ExtendedDateAndTime from './pages/subpages/ExtendedDateAndTime';
import ProfilePage from './pages/ProfilePage'
import MultipleUpload from './pages/MultipleUpload';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/tab1">
            <Tab1 />
          </Route>
          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route path="/tab3">
            <Tab3 />
          </Route>
          <Route exact path="/">
            <Redirect to="/tab1" />
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

          {/* Advanced Time Setting Page */}
          <Route path="/extendedDateAndTime1">
            <ExtendedDateAndTime dashBoardNum = {1}/>
          </Route>

          <Route path="/extendedDateAndTime2">
            <ExtendedDateAndTime dashBoardNum = {2}/>
          </Route>

          <Route path="/extendedDateAndTime3">
            <ExtendedDateAndTime dashBoardNum = {3}/>
          </Route>

          <Route path="/extendedDateAndTime4">
            <ExtendedDateAndTime dashBoardNum = {4}/>
          </Route>

          {/* Multiple Upload Page */}
          <Route path="/multipleUpload">
            <MultipleUpload />
          </Route>


          
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={homeOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/profilePage">
            <IonIcon icon={personCircleOutline} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={ellipsisHorizontalCircleOutline} />
            <IonLabel>Setting</IonLabel>
          </IonTabButton>
        </IonTabBar>

      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
