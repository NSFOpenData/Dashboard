import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonAvatar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonRow>
              <IonAvatar></IonAvatar>
              <IonAvatar></IonAvatar>

              <img className="logo" src="https://cps-iot-week2021.isis.vanderbilt.edu/images/VUISISlogo.png"></img>
          </IonRow>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
