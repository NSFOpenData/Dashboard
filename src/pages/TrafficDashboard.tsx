import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonRow, IonFooter, IonDatetime, IonButton, IonAvatar, IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';
import React, { useState, Component } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './TrafficDashboard.css';
import ExtendedDateAndTime from '../pages/subpages/ExtendedDateAndTime';


/* Reactive Google Map */
import { ReactiveBase, SingleList } from '@appbaseio/reactivesearch';
import { ReactiveGoogleMap, ReactiveOpenStreetMap } from '@appbaseio/reactivemaps';

/* Reactive Open Street Map */
import { MapContainer, TileLayer, Marker, Popup, MapConsumer} from 'react-leaflet'

import 'leaflet/dist/leaflet.css';

/* Mobiscrall */
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Datepicker, Input, Page, setOptions } from '@mobiscroll/react';
import { render } from '@testing-library/react';
import { flagOutline } from 'ionicons/icons';


setOptions({
  theme: 'ios',
  themeVariant: 'light'
});

/* Important Components */
//import { DatePickerModule } from 'ionic-calendar-date-picker';

const TrafficDashboard: React.FC = () => {
  // for date and time ranges
  const [selectedStartDate, setSelectedStartDate] = useState<string>('2021-06-01T13:47:20.789');
  const [selectedEndDate, setSelectedEndDate] = useState<string>('2021-06-01T13:47:20.789');
  const [start, startRef] = React.useState<any>(null);
  const [end, endRef] = React.useState<any>(null);

  const mapProps = {
    dataField: "location",
    defaultMapStyle: "Light Monochrome",
    defaultZoom: 13,
    react: {
      and: "places"
    },
    showMapStyles: true,
    
    //onPopoverClick: (item: { place: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => <div>{item.place}</div>,
    //renderData: (result: { magnitude: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
    //  console.log(result);
    //  return {
    //    label: <div>{}</div>
    //  };
    //}
  }; // for other properties: https://opensource.appbase.io/reactive-manual/map-components/reactivegooglemap.html

  
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

          <IonButton color="tertiary" expand="full" disabled={true}>Traffic Dashboard</IonButton>
          <IonTitle>
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
           
          </IonTitle>

          <IonAvatar></IonAvatar>

          <IonTitle>
            <IonText>
              <h5 style={{fontWeight: "bold"}}>Number of Cars:</h5>
            </IonText>
          </IonTitle>

          <IonAvatar></IonAvatar>

          <IonTitle>
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
                  This is Nashville.
                </Popup>
              </Marker>
              <Marker position={[36.1627, -86.796]}>
                <Popup>
                  This is close to Nashville.
                </Popup>
              </Marker>
            </MapContainer> 
          </IonTitle>
         
            
         
          
  
      </IonContent>

      
    </IonPage>

 
  );
};

export default TrafficDashboard;