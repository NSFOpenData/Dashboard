
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonButton, IonText, IonDatetime, IonRow, IonItem, IonCol, IonLabel, IonInput, IonSelectOption, IonSelect, IonAvatar, IonSegment, IonSegmentButton, IonChip, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonCardSubtitle, IonLoading, IonList } from '@ionic/react';
import { Datepicker } from '@mobiscroll/react';
import React, { useState, Component, useRef } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './LicenseDashboard.css';

import { Plugins, CameraResultType } from '@capacitor/core';

/* Reactive Google Map */
import { ReactiveBase, SingleList } from '@appbaseio/reactivesearch';
import { ReactiveGoogleMap, ReactiveOpenStreetMap } from '@appbaseio/reactivemaps';

/* PersonalInfo For Privilege Attribute */
import PersonalInfo from './PersonalInfo'

import 'leaflet/dist/leaflet.css';

/* GraphQL for API Calls */
import { gql, useQuery } from '@apollo/client';
import { useHistory } from 'react-router';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const { Camera } = Plugins;

// for uploading files
interface InternalValues {
  file: any;
}

const LicenseDashboard: React.FC = () => {
  const [selectedStartDate, setSelectedStartDate] = useState<string>('2021-06-01T13:47:20.789');
  const [selectedEndDate, setSelectedEndDate] = useState<string>('2021-06-01T13:47:20.789');
  const [photo, setPhoto] = useState("https://nsf-scc1.isis.vanderbilt.edu/file/vehicle/60ad6a891cf9295d5d661ce5/car1.jpg")  // "https://upload.wikimedia.org/wikipedia/commons/7/74/Vintage_blue_car.png");
  //60b6e51818ca7fe9e8156888

  // User inputs from dropdown menus
  const [location, setLocation] = useState<string>("");
  const [licensePlate, setLicensePlate] = useState<string>("");


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


  const VEHICLE_POST_QUERY = gql`
    query getAll{
      vehicles {
        location,
        model,
        make,
        color,
        license
      }
    }
  `;

  const { loading, data, error } = useQuery(VEHICLE_POST_QUERY);

  const mapProps = {
    dataField: "location",
    defaultMapStyle: "Light Monochrome",
    defaultZoom: 13.1,
    react: {
      and: "places"
    },
    showMapStyles: true,
  }; // for other properties: https://opensource.appbase.io/reactive-manual/map-components/reactivegooglemap.html

  ////* Uploading Files */
  const values = useRef<InternalValues>({
    file: false,
  });

  const onFileChange = (fileChangeEvent: any) => {
    values.current.file = fileChangeEvent.target.files[0];
    console.log(values.current.file);
  };

  const submitFileForm = async () => {
    if (!values.current.file) {
      return false;
    }

    let formData = new FormData();
    formData.set("type", "vehicle");
    formData.set("id", "60b6e51818ca7fe9e8156888");
    // formData.set("images", values.current.file.name);

    console.log(values.current.file.name);
    console.log(formData.get("type"));
    console.log(formData.get("id"));

    try {
      const response = await fetch("https://nsf-scc1.isis.vanderbilt.edu/upload", {
        method: "POST",
        body: formData,
        mode: 'no-cors',
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (!response.ok) {
        console.log("Error uploading file");
        throw new Error(response.statusText);
      }
      else if (response.ok) {
        console.log("Success uploading file");
        console.log(response.statusText);
      }

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <IonPage>
      {/* {
        console.log(licensePlate + location)
      } */}
      <IonHeader>
        <IonToolbar>
          <IonRow>
            <IonAvatar></IonAvatar>
            <IonAvatar></IonAvatar>
            <img style={{ alignContent: "center", height: 70, width: 180 }} src="https://cps-iot-week2021.isis.vanderbilt.edu/images/VUISISlogo.png"></img>
          </IonRow>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* generalized date string formats! */}
        {/* {quickTimePicker = myMap.get(dateTime.toString().substring(4, 7)) + " " + dateTime.toString().substring(8, 21)}
        {startDate = selectedStartDate.substring(5,7) + " " + selectedStartDate.substring(8, 10) + " " + selectedStartDate.substring(0, 4) + " " + selectedStartDate.substring(11, 16)}
        {endDate = selectedEndDate.substring(5,7) + " " + selectedEndDate.substring(8, 10) + " " + selectedEndDate.substring(0, 4) + " " + selectedEndDate.substring(11, 16)} */}

        <IonLoading isOpen={loading} message="Loading.." />

        <IonButton color="primary" expand="full" disabled={true}>License Dashboard</IonButton>

        <h5 className="centerItem" style={{ fontWeight: "bold" }}>Upload/Retrieve Data</h5>
        <div className="centerItem">
          <IonItem lines="none">
            {/* <form action="https://nsf-scc1.isis.vanderbilt.edu/upload" encType="multipart/form-data" method="post"> */}
            {/* <input type="text" placeholder="Object ID" name="id"></input>
            <input type="text" placeholder="Please type: 'vehicle'" name="type"></input> */}
            <input name="images" type="file" onChange={(event) => onFileChange(event)} accept="image/*,.pdf,.doc" multiple></input>
            {/* <input type="submit" value="upload"></input> */}
            {/* </form> */}
          </IonItem>
        </div>

        <IonButton color="primary" expand="block" onClick={() => submitFileForm()}>Submit</IonButton>
        <IonButton color="danger" expand="block" onClick={() => console.log("Trying to Get Picture From DB")}>
          Retrieve
        </IonButton>

        <IonAvatar></IonAvatar>

        <h5 className="centerItem" style={{ fontWeight: "bold" }}>Date and Time</h5>


        <IonSegment color="secondary" value="favorite">
          <IonSegmentButton value="twentyfourhr" onClick={() => goBack24Hours()}>
            <IonLabel>Yesterday</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="twelvehr" onClick={() => goBack12Hours()}>
            <IonLabel>Past 12 Hrs</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="sixhr" onClick={() => goBack6Hours()}>
            <IonLabel>Past 6 Hrs</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        <div className="centerItem">
          <h6>
            Start Date and Time:
            <IonDatetime displayFormat="MMM DD, YYYY HH:mm" min="1990" max="2030" value={selectedStartDate} onIonChange={e => setSelectedStartDate(e.detail.value!)}></IonDatetime>
          </h6>
          <IonAvatar></IonAvatar>
          <h6>
            End Date and Time:
            <IonDatetime displayFormat="MMM DD, YYYY HH:mm" min="1990" max="2030" value={selectedEndDate} onIonChange={e => setSelectedEndDate(e.detail.value!)}></IonDatetime>
          </h6>
        </div>


        <IonAvatar></IonAvatar>
        <h5 className="centerItem" style={{ fontWeight: "bold" }}>Location</h5>
        <IonItem>
          <IonLabel>Choose Location:</IonLabel>
          <IonSelect value={location} placeholder="Select One" onIonChange={e => setLocation(e.detail.value)}>
            <IonSelectOption value="eastnashville">East Nashville</IonSelectOption>
            <IonSelectOption value="inglewood">Ingle Wood</IonSelectOption>
            <IonSelectOption value="madison">Madison</IonSelectOption>
            <IonSelectOption value="bordeaux">Bordeaux</IonSelectOption>
            <IonSelectOption value="whitescreek">Whites Creek</IonSelectOption>
            <IonSelectOption value="donelson">Donelson</IonSelectOption>
            <IonSelectOption value="hermitage">Hermitage</IonSelectOption>
            <IonSelectOption value="berryhill">Berry Hill</IonSelectOption>
            <IonSelectOption value="greenhills">Green Hills</IonSelectOption>
            <IonSelectOption value="westmeade">West Meade</IonSelectOption>
            <IonSelectOption value="bellemeade">Belle Meade</IonSelectOption>
            <IonSelectOption value="oakhill">Oak Hill</IonSelectOption>
            <IonSelectOption value="crievehall">Crieve Hall</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonAvatar></IonAvatar>

        <h5 className="centerItem" style={{ fontWeight: "bold" }}>License Plates</h5>


        <IonItem>
          <IonLabel>Choose License Plate:</IonLabel>
          <IonSelect value={licensePlate} placeholder="Select One" onIonChange={e => setLicensePlate(e.detail.value)}>
            <IonSelectOption value="8A59S5">8A59S5</IonSelectOption>
            <IonSelectOption value="NBT410">NBT410</IonSelectOption>
            <IonSelectOption value="ATN684">ATN684</IonSelectOption>
            <IonSelectOption value="7L19V8">7L19V8</IonSelectOption>
            <IonSelectOption value="280QVG">280QVG</IonSelectOption>
            <IonSelectOption value="BVH711">BVH711</IonSelectOption>
            <IonSelectOption value="DLG208">DLG208</IonSelectOption>
            <IonSelectOption value="BPD626">BPD626</IonSelectOption>
          </IonSelect>
        </IonItem>


        <IonContent scrollX={true}>
          {!loading && data?.vehicles?.map((vehicle: any) => (
            // console.log(vehicle.license)
            <div className="centerItem">
              <IonItem lines="none">
                <IonCard button={true} color="light">
                  <img style={{ height: 160, width: 300 }} src={photo} ></img>
                  <IonCardContent>
                    <IonCardSubtitle>Car Information</IonCardSubtitle>
                    <h5>Manufacturer: {vehicle.make}</h5>
                    <h5>Model: {vehicle.model}</h5>
                    <h5>Color: {vehicle.color}</h5>
                    <h5>Location: [ {vehicle.location[0]} , {vehicle.location[1]} ]</h5>
                    {/* <h5>Time: {JSON.parse(vehicle).time}</h5>      */}
                    <h5>License Plate: {vehicle.license} </h5>
                  </IonCardContent>
                </IonCard>
              </IonItem>
            </div>

          ))}

        </IonContent>

        <IonAvatar></IonAvatar>

        <h5 className="centerItem" style={{ fontWeight: "bold" }}>Track</h5>

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
        {/* https://stackoverflow.com/questions/67552020/how-to-fix-error-failed-to-compile-node-modules-react-leaflet-core-esm-pat  */}

      </IonContent>
    </IonPage>
  );
};

export default LicenseDashboard;