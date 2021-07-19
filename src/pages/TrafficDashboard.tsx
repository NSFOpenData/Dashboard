import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
  IonRow,
  IonFooter,
  IonDatetime,
  IonButton,
  IonAvatar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import React, {
  useState,
  Component,
  useRef,
  useMemo,
  useCallback,
} from "react";
import ExploreContainer from "../components/ExploreContainer";
import "./TrafficDashboard.css";
import ExtendedDateAndTime from "../pages/subpages/ExtendedDateAndTime";

// icons
import {
  calendarOutline,
  albums,
  cubeOutline,
  bugOutline,
} from "ionicons/icons";

/* Reactive Open Street Map */
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  MapConsumer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* Mobiscrall */
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Datepicker, Input, Page, setOptions } from "@mobiscroll/react";
import { render } from "@testing-library/react";
import { flagOutline } from "ionicons/icons";

// icons
import { mapOutline } from "ionicons/icons";

setOptions({
  theme: "ios",
  themeVariant: "light",
});

/* Important Components */
//import { DatePickerModule } from 'ionic-calendar-date-picker';

//// FOR LEAFLET MAPS
L.Icon.Default.imagePath = "images/";

const center1 = {
  lat: 36.1627,
  lng: -86.7816,
};

const center2 = {
  lat: 36.1627,
  lng: -86.7616,
};

var marker1Pos: any = [];
var marker2Pos: any = [];

function DraggableMarker1() {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(center1);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        var marker: any = markerRef.current;
        if (marker != null) {
          // console.log(marker._latlng)

          marker1Pos = marker._latlng;
          console.log("marker1: ", marker1Pos);
          setPosition(marker1Pos);
        }
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? "Marker is draggable"
            : "Click here to make marker draggable"}
        </span>
      </Popup>
    </Marker>
  );
}

function DraggableMarker2() {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(center2);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        var marker: any = markerRef.current;
        if (marker != null) {
          marker2Pos = marker._latlng;
          console.log("marker2: ", marker2Pos);
          setPosition(marker2Pos);
        }
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? "Marker is draggable"
            : "Click here to make marker draggable"}
        </span>
      </Popup>
    </Marker>
  );
}

const TrafficDashboard: React.FC = () => {
  // for date and time ranges
  const [selectedStartDate, setSelectedStartDate] = useState<string>(
    "2021-06-01T13:47:20.789"
  );
  const [selectedEndDate, setSelectedEndDate] = useState<string>(
    "2021-06-01T13:47:20.789"
  );
  const [start, startRef] = React.useState<any>(null);
  const [end, endRef] = React.useState<any>(null);

  // for the date and time selection
  const [advancedDate, setAdvancedDate] = useState<boolean>(false);

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
    ["Dec", "12"],
  ]);
  var startDate = "";
  var endDate = "";
  var quickTimePicker =
    myMap.get(dateTime.toString().substring(4, 7)) +
    " " +
    dateTime.toString().substring(8, 21);

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
      quickTimePicker =
        quickTimePicker.substring(0, 10) +
        " " +
        newHour.toString() +
        ":" +
        quickTimePicker.substring(hourEndIndex + 1, quickTimePicker.length);
    } else {
      quickTimePicker =
        quickTimePicker.substring(0, 10) +
        " " +
        back12Hrs.toString() +
        ":" +
        quickTimePicker.substring(hourEndIndex + 1, quickTimePicker.length);
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
      quickTimePicker =
        quickTimePicker.substring(0, 10) +
        " " +
        newHour.toString() +
        ":" +
        quickTimePicker.substring(hourEndIndex + 1, quickTimePicker.length);
    } else {
      quickTimePicker =
        quickTimePicker.substring(0, 10) +
        " " +
        back12Hrs.toString() +
        ":" +
        quickTimePicker.substring(hourEndIndex + 1, quickTimePicker.length);
    }

    console.log(quickTimePicker);
  }

  function goBack24Hours() {
    console.log("i'm here");
    // just change the date
    var tempDay = +quickTimePicker.substring(3, 5); // turning string to integer
    var day = tempDay - 1;
    console.log(day.toString());
    console.log(tempDay.toString());

    quickTimePicker =
      quickTimePicker.substring(0, 3) +
      day.toString() +
      quickTimePicker.substring(5, quickTimePicker.length);
    console.log(quickTimePicker);
  }

  const mapProps = {
    dataField: "location",
    defaultMapStyle: "Light Monochrome",
    defaultZoom: 13,
    react: {
      and: "places",
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

  // markers to be initiated

  const [m1visible, setM1Visible] = useState<boolean>(false);
  const [m1Lat, setM1Lat] = useState<number>(36.1627);
  const [m1Lon, setM1Lon] = useState<number>(-86.7816);

  const [m2visible, setM2Visible] = useState<boolean>(false);
  const [m2Lat, setM2Lat] = useState<number>(0);
  const [m2Lon, setM2Lon] = useState<number>(0);

  const [m3visible, setM3Visible] = useState<boolean>(false);
  const [m3Lat, setM3Lat] = useState<number>(0);
  const [m3Lon, setM3Lon] = useState<number>(0);

  const [m4visible, setM4Visible] = useState<boolean>(false);
  const [m4Lat, setM4Lat] = useState<number>(0);
  const [m4Lon, setM4Lon] = useState<number>(0);

  const [mIndex, setMIndex] = useState<number>(1);

  const [mapCenterLat, setMapCenterLat] = useState<number>(0);
  const [mapCenterLon, setMapCenterLon] = useState<number>(0);

  function CenterUpdate() {
    const map = useMap();
    console.log(map.getCenter());

    setMapCenterLat(map.getCenter().lat);
    setMapCenterLon(map.getCenter().lng);

    return null;
  }

  // for creating markers
  function AddMarker() {
    switch (mIndex) {
      case 1:
        setM1Visible(true);
        setM1Lat(mapCenterLat);
        setM1Lon(mapCenterLon);
        setMIndex(mIndex + 1);
        break;
      case 2:
        setM2Visible(true);
        setM2Lat(mapCenterLat + 0.5);
        setM2Lon(mapCenterLon + 0.5);
        setMIndex(mIndex + 1);
        break;
      case 3:
        setM3Visible(true);
        setM3Lat(mapCenterLat - 0.5);
        setM3Lon(mapCenterLon - 0.5);
        setMIndex(mIndex + 1);
        break;
      case 4:
        setM4Visible(true);
        setM4Lat(mapCenterLat + 0.5);
        setM4Lon(mapCenterLon - 0.5);
        setMIndex(0);
        break;
    }

    return null;
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar>
            <div className="centerItem">
              <img
                className="logoPic"
                src="https://www.vanderbilt.edu/communications/brand/images/VUPrint.jpg"
              ></img>{" "}
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

        <div className="centerItem">
          <h5 className="plateSelectionMargin" style={{ fontWeight: "bold" }}>
            Traffic Selection{" "}
          </h5>

          <div className="centerItem">
            <IonButton className="buttonLeftMargin" size="small">
              View Recent Traffic
            </IonButton>
          </div>
        </div>
        <div className="centerItem">
          <IonButton
            className="customQueryMarginT"
            color="medium"
            size="small"
            onClick={() => setAdvancedDate(!advancedDate)}
          >
            Custom Query
          </IonButton>
        </div>

        {advancedDate && (
          <div>
            <IonSegment color="secondary" value="favorite">
              {/* from the quickTimePicker value, go 24 hrs back */}
              <IonSegmentButton
                value="twentyfourhr"
                onClick={() => goBack24Hours()}
              >
                <IonLabel>Yesterday</IonLabel>
              </IonSegmentButton>

              {/* from the quickTimePicker value, go 12 hrs back */}
              <IonSegmentButton
                value="twelvehr"
                onClick={() => goBack12Hours()}
              >
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
                <IonDatetime
                  displayFormat="MMM DD, YYYY HH:mm"
                  min="1990"
                  max="2030"
                  value={selectedStartDate}
                  onIonChange={(e) => setSelectedStartDate(e.detail.value!)}
                ></IonDatetime>
              </h6>
              <IonAvatar></IonAvatar>
              <h6>
                {/* End Date and Time: */}
                <IonDatetime
                  displayFormat="MMM DD, YYYY HH:mm"
                  min="1990"
                  max="2030"
                  value={selectedEndDate}
                  onIonChange={(e) => setSelectedEndDate(e.detail.value!)}
                ></IonDatetime>
              </h6>
            </div>
          </div>
        )}

        <IonAvatar></IonAvatar>

        <IonButton
          className="centerItem"
          expand="block"
          color="light"
          size="small"
          onClick={() => setShowMap(!showMap)}
        >
          <IonIcon icon={mapOutline}></IonIcon>
        </IonButton>

        {/* </div> */}

        {showMap && (
          <div>
            <MapContainer
              style={{ height: "350px" }}
              id="mapid"
              center={[36.1627, -86.7816]}
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {/* <TileLayer
                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
              /> */}
              {m1visible && (
                <Marker position={[m1Lat, m1Lon]}>
                  <Popup>M1</Popup>
                </Marker>
              )}
              {m2visible && (
                <Marker position={[m2Lat, m2Lon]}>
                  <Popup>M2</Popup>
                </Marker>
              )}
              {m3visible && (
                <Marker position={[m3Lat, m3Lon]}>
                  <Popup>M3</Popup>
                </Marker>
              )}
              {m4visible && (
                <Marker position={[m4Lat, m4Lon]}>
                  <Popup>M4</Popup>
                </Marker>
              )}

              {/* <DraggableMarker1 />
              <DraggableMarker2 /> */}
              <CenterUpdate />
            </MapContainer>
            <IonButton
              className="rightItem"
              color="danger"
              size="small"
              onClick={() => AddMarker()}
            >
              Add Marker
            </IonButton>
          </div>
        )}

        {/* </div> */}
      </IonContent>
    </IonPage>
  );
};

export default TrafficDashboard;
