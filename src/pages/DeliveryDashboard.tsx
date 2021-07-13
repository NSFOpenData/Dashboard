import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonImg,
  IonButton,
  IonText,
  IonDatetime,
  IonRow,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonAvatar,
  IonSegment,
  IonSegmentButton,
  IonIcon,
} from "@ionic/react";
import { Datepicker } from "@mobiscroll/react";
import React, { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import ExploreContainer from "../components/ExploreContainer";
import "./DeliveryDashboard.css";

import "leaflet/dist/leaflet.css";
import { mapOutline } from "ionicons/icons";

const DeliveryDashboard: React.FC = () => {
  const [selectedStartDate, setSelectedStartDate] = useState<string>(
    "2021-06-01T13:47:20.789"
  );
  const [selectedEndDate, setSelectedEndDate] = useState<string>(
    "2021-06-01T13:47:20.789"
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    "2012-12-15T13:47:20.789"
  );

  // for the date and time selection
  const [advancedDate, setAdvancedDate] = useState<boolean>(false);

  // for the map
  const [showMap, setShowMap] = useState<boolean>(false);

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
    ["Dec", "12"],
  ]);
  var quickTimePicker = "";
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

  return (
    <IonPage>
      {/* {
      console.log(deliveryType)
      } */}

      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar>
            <div className="centerItem">
              <img src="http://sensys.acm.org/2014/resources/images/IsisLogo.jpg"></img>
            </div>
          </IonToolbar>
        </IonHeader>
        {/* generalized date string formats! */}
        {/* {quickTimePicker = myMap.get(dateTime.toString().substring(4, 7)) + " " + dateTime.toString().substring(8, 21)}
          {startDate = selectedStartDate.substring(5,7) + " " + selectedStartDate.substring(8, 10) + " " + selectedStartDate.substring(0, 4) + " " + selectedStartDate.substring(11, 16)}
          {endDate = selectedEndDate.substring(5,7) + " " + selectedEndDate.substring(8, 10) + " " + selectedEndDate.substring(0, 4) + " " + selectedEndDate.substring(11, 16)} */}

        {/* <IonButton color="secondary" expand="full" disabled={true}>Delivery Dashboard</IonButton> */}

        <div className="centerItem">
          <h5 className="plateSelectionMargin" style={{ fontWeight: "bold" }}>
            Delivery Selection{" "}
          </h5>

          <div className="centerItem">
            <IonButton className="buttonLeftMargin" size="small">
              View Recent Deliveries
            </IonButton>
          </div>
        </div>
        <div className="centerItem">
          <IonButton
            className="customQueryMarginD"
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

        <h5 className="centerItem" style={{ fontWeight: "bold" }}>
          Type
        </h5>

        <IonItem>
          <IonLabel>Choose Delivery Type:</IonLabel>
          <IonSelect
            value={deliveryType}
            placeholder="Select One"
            onIonChange={(e) => setDeliveryType(e.detail.value)}
          >
            <IonSelectOption value="usps">
              USPS (United States Postal Service)
            </IonSelectOption>
            <IonSelectOption value="ups">
              UPS (United Postal Service)
            </IonSelectOption>
            <IonSelectOption value="fedex">FedEx</IonSelectOption>
            <IonSelectOption value="amazon">Amazon</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonAvatar></IonAvatar>

        {/* <h5 className="centerItem" style={{fontWeight: "bold"}}>Location</h5> */}

        <IonButton
          className="centerItem"
          expand="block"
          color="light"
          onClick={() => setShowMap(!showMap)}
        >
          <IonIcon icon={mapOutline}></IonIcon>
        </IonButton>

        {showMap && (
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
            <Marker position={[36.1627, -86.7816]}>
              <Popup>This is Nashville,</Popup>
            </Marker>
          </MapContainer>
        )}
        {/* </IonTitle> */}
        <IonAvatar></IonAvatar>
      </IonContent>
    </IonPage>
  );
};

export default DeliveryDashboard;
