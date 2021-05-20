
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonButton, IonText, IonDatetime, IonRow, IonLabel, IonSelect, IonSelectOption, IonItem } from '@ionic/react';
import { Datepicker } from '@mobiscroll/react';
import React, {useState} from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './DeliveryDashboard.css';

const DeliveryDashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('2012-12-15T13:47:20.789');

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

      <IonContent fullscreen>
        <IonButton color="secondary" expand="full" disabled={true}>Delivery Dashboard</IonButton>
        <IonTitle>
            <IonText>
              <h5 style={{fontWeight: "bold"}}>Date and Time:</h5>
            </IonText>
            {/*<IonText>
              <h6>
                <IonDatetime displayFormat="MMM DD, YYYY HH:mm" min="1990" max="2030" value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!) }></IonDatetime>
              </h6>
            </IonText>*/}
            <Datepicker
                controls={['datetime']}
                select="range"
                display="inline"
                touchUi={true}
            />
            <IonRow>
              <IonButton color="light" size="small" routerLink={"/extendedDateAndTime3"}>Click Here for Advanced Time Setting</IonButton>
            </IonRow>
            

          </IonTitle>

        <IonTitle>
          <IonText>
            <h5 style={{fontWeight: "bold"}}>Type:</h5>
          </IonText>
          <IonItem>
            <IonText>
              Please Choose One: 
            </IonText>
            <IonSelect interface="popover">
              <IonSelectOption value="usps">USPS (United States Postal Service)</IonSelectOption>
              <IonSelectOption value="ups">UPS (United Postal Service)</IonSelectOption>
              <IonSelectOption value="fedex">FedEx</IonSelectOption>
              <IonSelectOption value="amazon">Amazon</IonSelectOption>
           </IonSelect>
          </IonItem>
          
        </IonTitle>

        <IonTitle>
          <IonText>
            <h5 style={{fontWeight: "bold"}}>Location:</h5>
          </IonText>
        </IonTitle>
      
      </IonContent>
    </IonPage>

 
  );
};

export default DeliveryDashboard;