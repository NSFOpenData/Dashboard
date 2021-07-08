
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


  // For User's input from dropdown menus
  const [deliveryType, setDeliveryType] = useState<string>("");
  
  // for date selection and readability
  let dateTime = new Date();
  let myMap = new Map([
    ["Jan", "01"],
    ["Feb", "02"],
    ["Mar", "03"],
    ["Apr", "04"],
    ["May", "05"],
    ["Jun", "06"],
    ["Jul", "07"],
    ["Aug", "08"],
    ["Sep", "09"],
    ["Oct", "10"],
    ["Nov", "11"],
    ["Dec", "12"]
  ]);
  var quickTimePicker = "";
  var startDate = "";
  var endDate = "";

  return (
    
    <IonPage>
      {/* {
      console.log(deliveryType)
      } */}
      <IonHeader>
          <IonToolbar>
              <div className="centerItem">
                <img src="http://sensys.acm.org/2014/resources/images/IsisLogo.jpg"></img>
              </div>
          </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
          {/* generalized date string formats! */}
          {/* {quickTimePicker = myMap.get(dateTime.toString().substring(4, 7)) + " " + dateTime.toString().substring(8, 21)}
          {startDate = selectedStartDate.substring(5,7) + " " + selectedStartDate.substring(8, 10) + " " + selectedStartDate.substring(0, 4) + " " + selectedStartDate.substring(11, 16)}
          {endDate = selectedEndDate.substring(5,7) + " " + selectedEndDate.substring(8, 10) + " " + selectedEndDate.substring(0, 4) + " " + selectedEndDate.substring(11, 16)} */}
          

        {/* <IonButton color="secondary" expand="full" disabled={true}>Delivery Dashboard</IonButton> */}
        
            <h5 className="centerItem" style={{fontWeight: "bold"}}>Date and Time</h5>
            
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

            <div className="centerItem">
              <h6>
                Start Date and Time:
                <IonDatetime displayFormat="MMM DD, YYYY HH:mm" min="1990" max="2030" value={selectedStartDate} onIonChange={e => setSelectedStartDate(e.detail.value!) }></IonDatetime>
              </h6>
              <IonAvatar></IonAvatar>
              <h6>
                End Date and Time:
                <IonDatetime displayFormat="MMM DD, YYYY HH:mm" min="1990" max="2030" value={selectedEndDate} onIonChange={e => setSelectedEndDate(e.detail.value!) }></IonDatetime>
              </h6>
            </div>
        
        <IonAvatar></IonAvatar>
        
          <h5 className="centerItem" style={{fontWeight: "bold"}}>Type</h5>
         
          <IonItem>
            <IonLabel>
              Choose Delivery Type:
            </IonLabel>
            <IonSelect value={deliveryType} placeholder="Select One" onIonChange={e => setDeliveryType(e.detail.value)}>
              <IonSelectOption value="usps">USPS (United States Postal Service)</IonSelectOption>
              <IonSelectOption value="ups">UPS (United Postal Service)</IonSelectOption>
              <IonSelectOption value="fedex">FedEx</IonSelectOption>
              <IonSelectOption value="amazon">Amazon</IonSelectOption>
           </IonSelect>
          </IonItem>

        <IonAvatar></IonAvatar>

          {/* <h5 className="centerItem" style={{fontWeight: "bold"}}>Location</h5> */}
          

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