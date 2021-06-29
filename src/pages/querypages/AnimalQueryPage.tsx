import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonButton, IonText, IonDatetime, IonRow, IonItem, IonCol, IonLabel, IonInput, IonSelectOption, IonSelect, IonAvatar, IonSegment, IonSegmentButton, IonChip, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonCardSubtitle, IonLoading, IonList, IonItemDivider } from '@ionic/react';
import React, { useState, Component, useRef } from 'react';
import './AnimalQueryPage.css';

import { gql, NetworkStatus, useMutation, useQuery } from '@apollo/client';

const AnimalQueryPage: React.FC = () => {

    type LocationInput = {
        lat: String
        lon: String
        name: String
    };

    // trying without location for now
    const FIND_ANIMAL_QUERY = gql`
        query FindAnimals(
            $breed: [String!]
            $type: [String!]
            $color: [String!]
            $location: LocationInput
        ){
            findAnimals(params: {breed: $breed, type: $type, color: $color, location: $location}){
                _id
                files
                color
                breed
                type
                location {
                    lat 
                    lon
                    name
                }
            }
        }
    `;

    // Animal Related USER INPUT Variables:
    const [animalBreed, setAnimalBreed] = useState<string | null>();
    const [animalBreedArray, setAnimalBreedArray] = useState<string[]>();

    const [animalType, setAnimalType] = useState<string | null>();
    const [animalTypeArray, setAnimalTypeArray] = useState<string[]>();

    const [animalColor, setAnimalColor] = useState<string | null>();
    const [animalColorArray, setAnimalColorArray] = useState<string[]>();

    const [animalApproxLocation, setAnimalApproxLocation] = useState<LocationInput | null>();


    const onBreedChange = (breedString: string) => {
        setAnimalBreed(breedString);

        if (breedString?.indexOf(",") == -1) {
            var tempArr: string[] = [breedString];
            setAnimalBreedArray(tempArr);
        }
        else if (breedString?.indexOf(",") !== -1) {
            setAnimalBreedArray(breedString?.split(", ", 10));
        }
    }

    const onTypeChage = (typeString: string) => {
        setAnimalType(typeString);

        if (typeString?.indexOf(",") == -1) {
            var tempArr: string[] = [typeString];
            setAnimalTypeArray(tempArr);
        }
        else if (typeString?.indexOf(",") !== -1) {
            setAnimalTypeArray(typeString?.split(", ", 10));
        }
    }

    const onColorChange = (colorString: string) => {
        setAnimalColor(colorString);

        if (colorString?.indexOf(",") == -1) {
            var tempArr: string[] = [colorString];
            setAnimalColorArray(tempArr);
        }
        else if (colorString?.indexOf(",") !== -1) {
            setAnimalColorArray(colorString?.split(", ", 10));
        }
    }

    const { loading, data, error, refetch, networkStatus } = useQuery(FIND_ANIMAL_QUERY, {
        variables: {
            breed: animalBreedArray,
            type: animalTypeArray,
            color: animalColorArray,
            location: animalApproxLocation,
        },
        fetchPolicy: "no-cache",
        notifyOnNetworkStatusChange: true,
    });

    if (networkStatus == NetworkStatus.refetch) console.log("refetching!")
    if (loading) console.log("loading");
    if (error) console.log("error: " + error.networkError);

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
                        onIonChange={event => onTypeChage(event.detail.value!)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel>Please Type: </IonLabel>
                    <IonInput value={animalBreed}
                        placeholder="Animal Breed"
                        onIonChange={event => onBreedChange(event.detail.value!)}></IonInput>
                </IonItem>

                <IonItem>
                    <IonLabel>Please Type: </IonLabel>
                    <IonInput value={animalColor}
                        placeholder="Animal Color (i.e. black, blue, etc.)"
                        onIonChange={event => onColorChange(event.detail.value!)}></IonInput>
                </IonItem>
                {/* <IonItem>
                    <IonLabel>Please Type: </IonLabel>
                    <IonInput value={animalApproxLocation}
                        placeholder="Animal Approximate Community Location"
                        onIonChange={event => setAnimalApproxLocation(event.detail.value!)}></IonInput>
                </IonItem> */}
                {/* <IonButton color="light" expand="block" onClick={() => reset()}>
                    Refetch!    
                </IonButton>    */}
                {/* {
                    console.log("animal color string: " + animalColor)
                }
                {
                    console.log(animalColorArray)
                } */}

                {
                    (animalType || animalColor || animalBreed || animalApproxLocation) && // || animalColor1 || animalColor2 || animalColor3
                    <IonContent>
                        {!loading && data.findAnimals.map((animal: any) => (
                            <IonCard button={false} color="light">
                                <IonCardContent>
                                    <h5>Type: {animal.type}</h5>
                                    <h5>Breed: {animal.breed}</h5>
                                    <h5>Color: {animal.color}</h5>
                                    <h5>Location: [ {animal.location.lat} , {animal.location.lon} ]</h5>
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
export { }
export default AnimalQueryPage;
