
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonRow, IonFooter, IonDatetime, IonButton } from '@ionic/react';
import React, { useState, Component } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './TrafficDashboard.css';
import ExtendedDateAndTime from '../pages/subpages/ExtendedDateAndTime';


/* Reactive Map */
import { ReactiveBase, SingleList } from '@appbaseio/reactivesearch';
import { ReactiveGoogleMap } from '@appbaseio/reactivemaps';


/* Mobiscrall */
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Datepicker, Input, Page, setOptions } from '@mobiscroll/react';
import { render } from '@testing-library/react';
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
              <h5>Street:</h5>
            </IonText>

            <ReactiveBase
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
                {/*<SingleList
                  title="Places"
                  componentId="places"
                  dataField="place.raw"
                  size={50}
                  showSearch={true}
                />*/}

                <ReactiveGoogleMap
                  componentId="map"
                  dataField="location"
                  react={{
                    and: "places"
                  }}
                  // for the earthquake magnitude value --> we can use this function to 
                  // maybe display other sort of data (i.e. # of pets missing, auto-theft rate, etc.)
                  renderData={(result: { mag: any; }) => ({
                    label: result.mag
                  })}
                />
              </div>
            </ReactiveBase>
          </IonTitle>
         
            
         
          
  
      </IonContent>

      
    </IonPage>

 
  );
};

export default TrafficDashboard;