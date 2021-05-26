
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonButton, IonText, IonDatetime,IonRow, IonItem, IonLabel, IonSelect, IonSelectOption, IonAvatar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonLoading } from '@ionic/react';
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
        {/* <IonLoading isOpen={loading} message="Loading..." /> */}
        <IonButton color="light" expand="full" disabled={true}>Animal Dashboard</IonButton>
        <IonTitle>
          <IonText>
            <h5 style={{fontWeight: "bold"}}>Date and Time:</h5>
          </IonText>
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
            <h5 style={{fontWeight: "bold"}}>Location:</h5>
          </IonText>

          <IonItem>
              <IonLabel>Choose Location:</IonLabel>
              <IonSelect value="01">
                <IonSelectOption value="01">None</IonSelectOption>
                <IonSelectOption value="02">East Nashville</IonSelectOption>
                <IonSelectOption value="03">Ingle Wood</IonSelectOption>
                <IonSelectOption value="04">Madison</IonSelectOption>
                <IonSelectOption value="05">Bordeaux</IonSelectOption>
                <IonSelectOption value="06">Whites Creek</IonSelectOption>
                <IonSelectOption value="07">Donelson</IonSelectOption>
                <IonSelectOption value="08">Hermitage</IonSelectOption>
                <IonSelectOption value="09">Berry Hill</IonSelectOption>
                <IonSelectOption value="10">Green HIlls</IonSelectOption>
                <IonSelectOption value="11">West Meade</IonSelectOption>
                <IonSelectOption value="12">Belle Meade</IonSelectOption>
                <IonSelectOption value="13">Oak Hill</IonSelectOption>
                <IonSelectOption value="14">Crieve Hall</IonSelectOption>
              </IonSelect>
            </IonItem>
        </IonTitle>

        <IonAvatar></IonAvatar>

        <IonTitle>
          <IonText>
            <h5 style={{fontWeight: "bold"}}>Type:</h5>
          </IonText>

          <IonItem>
              <IonLabel>Choose Type:</IonLabel>
              <IonSelect value="00">
                <IonSelectOption value="00">None</IonSelectOption>
                <IonSelectOption value="01">Dog</IonSelectOption>
                <IonSelectOption value="02">Cat</IonSelectOption>
                <IonSelectOption value="03">Rabbit</IonSelectOption>
                <IonSelectOption value="04">Bird</IonSelectOption>
                <IonSelectOption value="05">Lizard</IonSelectOption>
                <IonSelectOption value="06">Snake</IonSelectOption>
              </IonSelect>
            </IonItem>
        </IonTitle>

        <IonAvatar></IonAvatar>

        <IonTitle>
          <IonText>
            <h5 style={{fontWeight: "bold"}}>Color:</h5>
          </IonText>

          <IonItem>
            <IonLabel>Choose Color:</IonLabel>
            <IonSelect value="00">
              <IonSelectOption value="00">None</IonSelectOption>
              <IonSelectOption value="01">Black</IonSelectOption>
              <IonSelectOption value="02">Brown</IonSelectOption>
              <IonSelectOption value="03">White</IonSelectOption>
              <IonSelectOption value="04">Cream</IonSelectOption>
              <IonSelectOption value="05">Gold</IonSelectOption>
              <IonSelectOption value="06">Grey</IonSelectOption>
              <IonSelectOption value="07">Red</IonSelectOption>
              <IonSelectOption value="08">Orange</IonSelectOption>

              <IonSelectOption value="09">Yellow</IonSelectOption>
              <IonSelectOption value="10">Green</IonSelectOption>
              <IonSelectOption value="11">Mint</IonSelectOption>

              <IonSelectOption value="12">Blue</IonSelectOption>
              <IonSelectOption value="13">Purple</IonSelectOption>
              {/* I have no idea how to set colors for snake as they have 
              differnt colors - do we allow people to choose multiple color */}
            </IonSelect>
          </IonItem>
        </IonTitle>
        
        <IonTitle>
          <IonText>
            <h5 style={{fontWeight: "bold"}}>Animal Info:</h5>
          </IonText>


        </IonTitle>

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
    </IonPage>


  );
};

export default AnimalDashboard;