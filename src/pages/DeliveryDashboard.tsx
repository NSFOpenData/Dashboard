
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonButton, IonText, IonDatetime, IonRow, IonLabel, IonSelect, IonSelectOption, IonItem, IonAvatar, IonSegment, IonSegmentButton } from '@ionic/react';
import { Datepicker } from '@mobiscroll/react';
import React, {useState} from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import ExploreContainer from '../components/ExploreContainer';
import './DeliveryDashboard.css';

import 'leaflet/dist/leaflet.css';


const DeliveryDashboard: React.FC = () => {
  const [selectedStartDate, setSelectedStartDate] = useState<string>('2021-06-01T13:47:20.789');
  const [selectedEndDate, setSelectedEndDate] = useState<string>('2021-06-01T13:47:20.789');
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
        {/* <IonTitle> */}
            <IonText>
              <h5 style={{fontWeight: "bold"}}>Date and Time:</h5>
            </IonText>
            
            <IonSegment color="secondary" value="favorite">
              <IonSegmentButton value="yesterday">
                <IonLabel>Yesterday</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="sixhr">
                <IonLabel>Past 12 Hrs</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="onehr">
                <IonLabel>Past 6 Hrs</IonLabel>
              </IonSegmentButton>
            </IonSegment>

            <IonText>
              <h6>
                | Start Date and Time:
                <IonDatetime displayFormat="MMM DD, YYYY HH:mm" min="1990" max="2030" value={selectedStartDate} onIonChange={e => setSelectedStartDate(e.detail.value!) }></IonDatetime>
              </h6>
              <h6>
                | End Date and Time:
                <IonDatetime displayFormat="MMM DD, YYYY HH:mm" min="1990" max="2030" value={selectedEndDate} onIonChange={e => setSelectedEndDate(e.detail.value!) }></IonDatetime>
              </h6>
            </IonText>
            

        {/* </IonTitle> */}
        
        <IonAvatar></IonAvatar>
        
        {/* <IonTitle> */}
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
          
        {/* </IonTitle> */}

        <IonAvatar></IonAvatar>


        {/* <IonTitle> */}
          <IonText>
            <h5 style={{fontWeight: "bold"}}>Location:</h5>
          </IonText>

          <MapContainer id="mapid" center={[36.1627, -86.7816]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[36.1627, -86.7816]}>
              <Popup>
                This is Nashville,
              </Popup>
            </Marker>
          </MapContainer> 
        {/* </IonTitle> */}
      
      </IonContent>
    </IonPage>

 
  );
};

export default DeliveryDashboard;