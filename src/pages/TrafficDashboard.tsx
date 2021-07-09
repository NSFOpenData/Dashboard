import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonRow, IonFooter, IonDatetime, IonButton, IonAvatar, IonSegment, IonSegmentButton, IonLabel, IonIcon } from '@ionic/react';
import React, { useState, Component, useRef, useMemo, useCallback } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './TrafficDashboard.css';
import ExtendedDateAndTime from '../pages/subpages/ExtendedDateAndTime';

// icons
import {calendarOutline, albums, cubeOutline, bugOutline} from 'ionicons/icons';

/* Reactive Google Map */
import { ReactiveBase, SingleList } from '@appbaseio/reactivesearch';
import { ReactiveGoogleMap, ReactiveOpenStreetMap } from '@appbaseio/reactivemaps';

/* Reactive Open Street Map */
import { MapContainer, TileLayer, Marker, Popup, MapConsumer } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css';

/* Mobiscrall */
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Datepicker, Input, Page, setOptions } from '@mobiscroll/react';
import { render } from '@testing-library/react';
import { flagOutline } from 'ionicons/icons';

// icons
import {mapOutline} from 'ionicons/icons';



setOptions({
  theme: 'ios',
  themeVariant: 'light'
});

/* Important Components */
//import { DatePickerModule } from 'ionic-calendar-date-picker';


//// FOR LEAFLET MAPS
L.Icon.Default.imagePath = 'images/'

const center1 = {
  lat: 36.1627,
  lng: -86.7816,
}

const center2 = {
  lat: 36.1627,
  lng: -86.7616,
}

var marker1Pos: any = [];
var marker2Pos: any = [];

function DraggableMarker1() {
  const [draggable, setDraggable] = useState(false)
  const [position, setPosition] = useState(center1)
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        var marker: any = markerRef.current
        if (marker != null) {
          // console.log(marker._latlng)

          marker1Pos = marker._latlng
          console.log("marker1: ", marker1Pos)
          setPosition(marker1Pos)
        }
      },
    }),
    [],
  )
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d)
  }, [])

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}>
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? 'Marker is draggable'
            : 'Click here to make marker draggable'}
        </span>
      </Popup>
    </Marker>
  )
}

function DraggableMarker2() {
  const [draggable, setDraggable] = useState(false)
  const [position, setPosition] = useState(center2)
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        var marker: any = markerRef.current
        if (marker != null) {
          marker2Pos = marker._latlng
          console.log("marker2: ", marker2Pos)
          setPosition(marker2Pos)
        }
      },
    }),
    [],
  )
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d)
  }, [])

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}>
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? 'Marker is draggable'
            : 'Click here to make marker draggable'}
        </span>
      </Popup>
    </Marker>
  )
}



const TrafficDashboard: React.FC = () => {
  // for date and time ranges
  const [selectedStartDate, setSelectedStartDate] = useState<string>('2021-06-01T13:47:20.789');
  const [selectedEndDate, setSelectedEndDate] = useState<string>('2021-06-01T13:47:20.789');
  const [start, startRef] = React.useState<any>(null);
  const [end, endRef] = React.useState<any>(null);
  

  // for the map
  const [showMap, setShowMap] = useState<boolean>(false);


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
  var startDate = "";
  var endDate = "";
  var quickTimePicker = myMap.get(dateTime.toString().substring(4, 7)) + " " + dateTime.toString().substring(8, 21);

  //// FOR QUICK DATE TIME PICKER
  function goBack6Hours() {
    // if the subtracted value is negative, call go back 24hours function and subtract that negative value from 24
    var hourEndIndex = 13;
    if (quickTimePicker.length == 15) {
      hourEndIndex = 12;
    }
    var tempTime = +quickTimePicker.substring(11, hourEndIndex);
    var back12Hrs = tempTime - 6;
    // console.log(tempTime.toString())
    // console.log(back12Hrs.toString());
    if (back12Hrs < 0) {
      goBack24Hours();
      var newHour = 24 + back12Hrs;
      quickTimePicker = quickTimePicker.substring(0, 10) + " " + newHour.toString() + ":" + quickTimePicker.substring(hourEndIndex + 1, quickTimePicker.length);
    } else {
      quickTimePicker = quickTimePicker.substring(0, 10) + " " + back12Hrs.toString() + ":" + quickTimePicker.substring(hourEndIndex + 1, quickTimePicker.length);
    }


    console.log(quickTimePicker);
  }

  function goBack12Hours() {
    // if the subtracted value is negative, call go back 24hours function and subtract that negative value from 24
    var hourEndIndex = 13;
    if (quickTimePicker.length == 15) {
      hourEndIndex = 12;
    }
    var tempTime = +quickTimePicker.substring(11, hourEndIndex);
    var back12Hrs = tempTime - 12;
    // console.log(tempTime.toString())
    // console.log(back12Hrs.toString());
    if (back12Hrs < 0) {
      goBack24Hours();
      var newHour = 24 + back12Hrs;
      quickTimePicker = quickTimePicker.substring(0, 10) + " " + newHour.toString() + ":" + quickTimePicker.substring(hourEndIndex + 1, quickTimePicker.length);
    } else {
      quickTimePicker = quickTimePicker.substring(0, 10) + " " + back12Hrs.toString() + ":" + quickTimePicker.substring(hourEndIndex + 1, quickTimePicker.length);
    }

    console.log(quickTimePicker);
  }

  function goBack24Hours() {
    console.log("i'm here")
    // just change the date 
    var tempDay = +quickTimePicker.substring(3, 5); // turning string to integer
    var day = tempDay - 1;
    console.log(day.toString());
    console.log(tempDay.toString());

    quickTimePicker = quickTimePicker.substring(0, 3) + day.toString() + quickTimePicker.substring(5, quickTimePicker.length);
    console.log(quickTimePicker);
  }


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
      

      <IonContent fullscreen>
      
      <IonHeader>
          <IonToolbar>
              <div className="centerItem">
                <img src="http://sensys.acm.org/2014/resources/images/IsisLogo.jpg"></img>
              </div>
          </IonToolbar>
      </IonHeader>
        {/* generalized date string formats! */}
        {/* {quickTimePicker = myMap.get(dateTime.toString().substring(4, 7)) + " " + dateTime.toString().substring(8, 21)} */}
        {/* {startDate = selectedStartDate.substring(5,7) + " " + selectedStartDate.substring(8, 10) + " " + selectedStartDate.substring(0, 4) + " " + selectedStartDate.substring(11, 16)}
          {endDate = selectedEndDate.substring(5,7) + " " + selectedEndDate.substring(8, 10) + " " + selectedEndDate.substring(0, 4) + " " + selectedEndDate.substring(11, 16)} */}


        {/* <IonButton color="tertiary" expand="full" disabled={true}>Traffic Dashboard</IonButton> */}
        
        {/* <div className="centerItem">
          <IonIcon className="icon" icon={calendarOutline} />
        </div> */}

      <h5 className="centerItem" style={{ fontWeight: "bold" }}>Date and Time</h5>


        <IonSegment color="secondary" value="favorite">
          {/* from the quickTimePicker value, go 24 hrs back */}
          <IonSegmentButton value="twentyfourhr" onClick={() => goBack24Hours()}>
            <IonLabel>Yesterday</IonLabel>
          </IonSegmentButton>

          {/* from the quickTimePicker value, go 12 hrs back */}
          <IonSegmentButton value="twelvehr" onClick={() => goBack12Hours()}>
            <IonLabel>Past 12 Hrs</IonLabel>
          </IonSegmentButton>

          {/* from the quickTimePicker value, go 6 hrs back */}
          <IonSegmentButton value="sixhr" onClick={() => goBack6Hours()}>
            <IonLabel>Past 6 Hrs</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        <div className="centerItem">
          <h6>
            {/* Start Date and Time: */}
            <IonDatetime displayFormat="MMM DD, YYYY HH:mm" min="1990" max="2030" value={selectedStartDate} onIonChange={e => setSelectedStartDate(e.detail.value!)}></IonDatetime>
          </h6>
          <IonAvatar></IonAvatar>
          <h6>
            {/* End Date and Time: */}
            <IonDatetime displayFormat="MMM DD, YYYY HH:mm" min="1990" max="2030" value={selectedEndDate} onIonChange={e => setSelectedEndDate(e.detail.value!)}></IonDatetime>
          </h6>
        </div>

        {/* <IonAvatar></IonAvatar> */}

        {/* <h5 className="centerItem" style={{ fontWeight: "bold" }}>Number of Cars</h5> */}

        <IonAvatar></IonAvatar>

        {/* <h5 className="centerItem" style={{ fontWeight: "bold" }}>Location</h5> */}

        {/* <div className="leaflet-container"> */}

        {/* <div className="centerItem"> */}
          <IonButton className="centerItem" expand="block" color="light" onClick={() => setShowMap(!showMap)}>
            <IonIcon icon={mapOutline}></IonIcon>

          </IonButton>

        {/* </div> */}


        {showMap &&
          <MapContainer style={{ height: '350px'}} id="mapid" center={[36.1627, -86.7816]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* <TileLayer
              attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
            /> */}
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

            <DraggableMarker1 />
            <DraggableMarker2 />
          </MapContainer>
        }
          
        {/* </div> */}
        

      </IonContent>


    </IonPage>


  );
};

export default TrafficDashboard;