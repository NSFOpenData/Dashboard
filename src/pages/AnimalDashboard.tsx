
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonButton, IonText, IonDatetime,IonRow, IonItem, IonLabel, IonSelect, IonSelectOption, IonAvatar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonLoading, IonSegment, IonSegmentButton } from '@ionic/react';
import { Datepicker } from '@mobiscroll/react';
import React, {useState, Component} from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './AnimalDashboard.css';

/* Axios for API Calls */
import axios from 'axios';
import { Console } from 'console';

import { thumbsUpSharp } from 'ionicons/icons';

/* GraphQL for API Calls */
import {gql, useQuery} from '@apollo/client';
import { useHistory } from 'react-router';

const AnimalDashboard: React.FC = () => {
  const [selectedStartDate, setSelectedStartDate] = useState<string>('2021-06-01T13:47:20.789');
  const [selectedEndDate, setSelectedEndDate] = useState<string>('2021-06-01T13:47:20.789');
  
  // for USER input on dropdown menus
  const [location, setLocation] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [color, setColor] = useState<string>("");

  
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

  // const history = useHistory();
  let individualCardPhotoSource = [];

  const ANIMAL_POST_QUERY = gql`
    query getAll{
      animals {
        location,
        color,
        breed,
        type,
      }
    }
  `;

  const { loading, data, error } = useQuery(ANIMAL_POST_QUERY);

  return (
    
    <IonPage>
      {/* {
      console.log(location + " " + type + " " + color)
    } */}
      <IonHeader>
        <IonToolbar>
          <IonRow>
            <IonAvatar></IonAvatar>
            <IonAvatar></IonAvatar>
            <img style={{ alignContent: "center", height: 70, width: 180}} src="https://cps-iot-week2021.isis.vanderbilt.edu/images/VUISISlogo.png"></img>
          </IonRow>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* generalized date string formats! */}
        {/* {quickTimePicker = myMap.get(dateTime.toString().substring(4, 7)) + " " + dateTime.toString().substring(8, 21)}
        {startDate = selectedStartDate.substring(5,7) + " " + selectedStartDate.substring(8, 10) + " " + selectedStartDate.substring(0, 4) + " " + selectedStartDate.substring(11, 16)}
        {endDate = selectedEndDate.substring(5,7) + " " + selectedEndDate.substring(8, 10) + " " + selectedEndDate.substring(0, 4) + " " + selectedEndDate.substring(11, 16)} */}
          

        {/* <IonLoading isOpen={loading} message="Loading..." /> */}
        <IonButton color="light" expand="full" disabled={true}>Animal Dashboard</IonButton>
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

          <h5 className="centerItem" style={{fontWeight: "bold"}}>Location</h5>
          

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

          <h5 className="centerItem" style={{fontWeight: "bold"}}>Type</h5>
        

          <IonItem>
              <IonLabel>Choose Type:</IonLabel>
              <IonSelect value={type} placeholder="Select One" onIonChange={e => setType(e.detail.value)}>
                <IonSelectOption value="dog">Dog</IonSelectOption>
                <IonSelectOption value="cat">Cat</IonSelectOption>
                <IonSelectOption value="rabbit">Rabbit</IonSelectOption>
                <IonSelectOption value="bird">Bird</IonSelectOption>
                <IonSelectOption value="lizard">Lizard</IonSelectOption>
                <IonSelectOption value="snake">Snake</IonSelectOption>
              </IonSelect>
            </IonItem>

        <IonAvatar></IonAvatar>

          <h5 className="centerItem" style={{fontWeight: "bold"}}>Color</h5>
         
          <IonItem>
            <IonLabel>Choose Color:</IonLabel>
            <IonSelect value={color} placeholder="Select One" onIonChange={e => setColor(e.detail.value)}>
              <IonSelectOption value="black">Black</IonSelectOption>
              <IonSelectOption value="brown">Brown</IonSelectOption>
              <IonSelectOption value="white">White</IonSelectOption>
              <IonSelectOption value="cream">Cream</IonSelectOption>
              <IonSelectOption value="gold">Gold</IonSelectOption>
              <IonSelectOption value="grey">Grey</IonSelectOption>
              <IonSelectOption value="red">Red</IonSelectOption>
              <IonSelectOption value="orange">Orange</IonSelectOption>
              <IonSelectOption value="yellow">Yellow</IonSelectOption>
              <IonSelectOption value="green">Green</IonSelectOption>
              <IonSelectOption value="mint">Mint</IonSelectOption>
              <IonSelectOption value="blue">Blue</IonSelectOption>
              <IonSelectOption value="purple">Purple</IonSelectOption>
              {/* I have no idea how to set colors for snake as they have 
              differnt colors - do we allow people to choose multiple color */}
            </IonSelect>
          </IonItem>

          <IonAvatar></IonAvatar>
        
          <h5 className="centerItem" style={{fontWeight: "bold"}}>Animal Info</h5>

        <IonContent>

          {!loading && data?.animals?.map((animal: any) => (
            // console.log(vehicle.license)
            <IonItem lines="none">
              <IonCard button={true} color="light">
                <img style={{height: 120, width: 300}} src={""} ></img>
                <IonCardContent>
                  <IonCardSubtitle>Animal Information</IonCardSubtitle>
                  <h5>Type: {animal.type}</h5>
                  <h5>Breed: {animal.breed}</h5>
                  <h5>Color: {animal.color}</h5>
                  <h5>Location: [ {animal.location[0]} , {animal.location[1]} ]</h5>
                  {/* <h5>Time: {JSON.parse(vehicle).time}</h5>      */}
                </IonCardContent>
              </IonCard>
            </IonItem>
          ))}
        </IonContent>
        
      </IonContent>
    </IonPage>


  );
};

export default AnimalDashboard;