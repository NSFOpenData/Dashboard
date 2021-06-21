import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonButton, IonText, IonDatetime, IonRow, IonItem, IonCol, IonLabel, IonInput, IonSelectOption, IonSelect, IonAvatar, IonSegment, IonSegmentButton, IonChip, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonCardSubtitle, IonLoading, IonList, IonItemDivider } from '@ionic/react';
import React, {useState, Component, useRef} from 'react';
import './AnimalQueryPage.css';

import {gql, NetworkStatus, useMutation, useQuery} from '@apollo/client';

const AnimalQueryPage: React.FC = () => {
    
    // trying without location for now
    const FIND_ANIMAL_QUERY = gql`
        query FindAnimals(
            $breed: String
            $type: String
            $color: String
            $location: [String!]
        ){
            findAnimals(params: {breed: $breed, type: $type, color: $color, location: $location}){
                _id
                location
                files
                color
                breed
                type
            }
        }
    `;

    // Animal Related USER INPUT Variables:
    const [animalBreed, setAnimalBreed] = useState<string | null>();
    const [animalType, setAnimalType] = useState<string| null>();
    const [animalColor, setAnimalColor] = useState<string| null>();
    const [animalApproxLocation, setAnimalApproxLocation] = useState<string| null>();

    const { loading, data, error, refetch, networkStatus } = useQuery(FIND_ANIMAL_QUERY, {
        variables: {
            breed: animalBreed,
            type: animalType,
            color: animalColor, 
            location: animalApproxLocation,
            //////
        },
        fetchPolicy: "no-cache",
        notifyOnNetworkStatusChange: true,
        // pollInterval: 40,
    }); 

    if (networkStatus == NetworkStatus.refetch) console.log("refetching!")
    if (loading) console.log("loading");
    if (error) console.log("error");

    return (
      <IonPage>
        <IonHeader>
            <IonToolbar>
            <IonRow>
                <IonAvatar></IonAvatar>
                <IonAvatar></IonAvatar>
                <img className="logo" src="https://cps-iot-week2021.isis.vanderbilt.edu/images/VUISISlogo.png"></img>
            </IonRow>
            </IonToolbar>
        </IonHeader>
  
        <IonContent className="ion-padding"> 
            <IonButton expand="full" color="secondary" disabled={true}>
                Animal Advanced Search Query
            </IonButton>
            
            <IonItem>
                <IonLabel>Please Type: </IonLabel>
                <IonInput value={animalType} 
                placeholder="Animal Type (i.e. dog, cat, etc.)"
                onIonChange={event => setAnimalType(event.detail.value!)}></IonInput>
            </IonItem>  
            <IonItem>
                <IonLabel>Please Type: </IonLabel>
                <IonInput value={animalBreed} 
                placeholder="Animal Breed"
                onIonChange={event => setAnimalBreed(event.detail.value!)}></IonInput>
            </IonItem>
             
            <IonItem>
                <IonLabel>Please Type: </IonLabel>
                <IonInput value={animalColor} 
                placeholder="Animal Color"
                onIonChange={event => setAnimalColor(event.detail.value!)}></IonInput>
            </IonItem> 
            <IonItem>
                <IonLabel>Please Type: </IonLabel>
                <IonInput value={animalApproxLocation} 
                placeholder="Animal Approximate Community Location"
                onIonChange={event => setAnimalApproxLocation(event.detail.value!)}></IonInput>
            </IonItem>  
            {/* <IonButton color="light" expand="block" onClick={() => reset()}>
                Refetch!    
            </IonButton>    */}
            {
                (animalType || animalBreed || animalColor || animalApproxLocation) &&
                <IonContent>
                    
                    {!loading && data.findAnimals.map((animal: any) => (
                        <IonCard button={false} color="light">
                           <IonCardContent>
                             <h5>Type: {animal.type}</h5>
                             <h5>Breed: {animal.breed}</h5>
                             <h5>Color: {animal.color}</h5>
                             <h5>Location: [ {animal.location[0]} , {animal.location[1]} ]</h5>         
                           </IonCardContent>
                       </IonCard>
                    ))}
                </IonContent>
            }


            </IonContent>
      </IonPage >
    );
  
  }

  // vehicle related variables
//   export {vMake, vModel, vColor, vApproxLoc, vLicense}
  // animal related variables
  export {}
  export default AnimalQueryPage;
