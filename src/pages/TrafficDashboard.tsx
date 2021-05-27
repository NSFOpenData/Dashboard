
import { IonContent, IonIcon, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonRow, IonFooter, IonDatetime, IonButton } from '@ionic/react';
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
  const [selectedDate, setSelectedDate] = useState<string>('2012-12-15T13:47:20.789');
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
              <h5>Date and Time:</h5>
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
              <IonButton color="light" size="small" routerLink={"/extendedDateAndTime1"}>Click Here for Advanced Time Setting</IonButton>
            </IonRow>
          </IonTitle>

          <IonTitle>
            <IonText>
              <h5>Number of Cars:</h5>
            </IonText>
          </IonTitle>

          <IonTitle>
            <IonText>
              <h5>Location:</h5>
            </IonText>

            <MapContainer id="mapid" center={[36.163, -0.2]} zoom={13} scrollWheelZoom={false}>
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

            {/* <ReactiveBase
              app="earthquake"
              credentials="OrXIHcgHn:d539c6e7-ed14-4407-8214-c227b0600d8e"
              type="places"
              mapKey="AIzaSyCgg0n0UKXaBeq7ve2VVK2qPF8SxcawIxU"
            >
              <div
                style={{
                  width: '100%', 
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
         
                <ReactiveOpenStreetMap 
                  componentID="openstreetMap"
                  defaultCenter={{lat: 36.14, lng: 86.78}} // Nashville, TN
                  {...mapProps}
                />       

              </div>
            </ReactiveBase> */}
          </IonTitle>
         
            
         
          
  
      </IonContent>

      
    </IonPage>

 
  );
};

export default TrafficDashboard;