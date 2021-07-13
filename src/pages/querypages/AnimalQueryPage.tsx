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
  IonItem,
  IonCol,
  IonLabel,
  IonInput,
  IonSelectOption,
  IonSelect,
  IonAvatar,
  IonSegment,
  IonSegmentButton,
  IonChip,
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonCardSubtitle,
  IonLoading,
  IonList,
  IonItemDivider,
} from "@ionic/react";
import React, { useState, Component, useRef } from "react";
import "./AnimalQueryPage.css";

import { gql, NetworkStatus, useMutation, useQuery } from "@apollo/client";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const AnimalQueryPage: React.FC = () => {
  type LocationInput = {
    lat: String;
    lon: String;
    name: String;
  };

  // trying without location for now
  const FIND_ANIMAL_QUERY = gql`
    query FindAnimals(
      $breed: [String!]
      $type: [String!]
      $color: [String!]
      $location: LocationInput
    ) {
      findAnimals(
        params: {
          breed: $breed
          type: $type
          color: $color
          location: $location
        }
      ) {
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
        createdAt
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

  const [animalApproxLocation, setAnimalApproxLocation] =
    useState<LocationInput | null>();

  const onBreedChange = (breedString: string) => {
    setAnimalBreed(breedString);

    if (breedString?.indexOf(",") == -1) {
      var tempArr: string[] = [breedString];
      setAnimalBreedArray(tempArr);
    } else if (breedString?.indexOf(",") !== -1) {
      setAnimalBreedArray(breedString?.split(", ", 10));
    }
  };

  const onTypeChage = (typeString: string) => {
    setAnimalType(typeString);

    if (typeString?.indexOf(",") == -1) {
      var tempArr: string[] = [typeString];
      setAnimalTypeArray(tempArr);
    } else if (typeString?.indexOf(",") !== -1) {
      setAnimalTypeArray(typeString?.split(", ", 10));
    }
  };

  const onColorChange = (colorString: string) => {
    setAnimalColor(colorString);

    if (colorString?.indexOf(",") == -1) {
      var tempArr: string[] = [colorString];
      setAnimalColorArray(tempArr);
    } else if (colorString?.indexOf(",") !== -1) {
      setAnimalColorArray(colorString?.split(", ", 10));
    }
  };

  const { loading, data, error, refetch, networkStatus } = useQuery(
    FIND_ANIMAL_QUERY,
    {
      variables: {
        breed: animalBreedArray,
        type: animalTypeArray,
        color: animalColorArray,
        location: animalApproxLocation,
      },
      fetchPolicy: "no-cache",
      notifyOnNetworkStatusChange: true,
    }
  );

  if (networkStatus == NetworkStatus.refetch) console.log("refetching!");
  if (loading) console.log("loading");
  if (error) console.log("error: " + error.networkError);

  // for the map
  const [animalLat, setAnimalLat] = useState<number>(0);
  const [animalLon, setAnimalLon] = useState<number>(0);

  const animalOnMap = (latitude: number, longitude: number) => {
    setAnimalLat(latitude);
    setAnimalLon(longitude);
    console.log(animalLat, ", ", animalLon);
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonHeader>
          <IonToolbar>
            <div className="centerItem">
              <img src="http://sensys.acm.org/2014/resources/images/IsisLogo.jpg"></img>
            </div>
          </IonToolbar>
        </IonHeader>
        <IonButton expand="full" color="secondary" disabled={true}>
          Animal Advanced Search Query
        </IonButton>

        <IonItem>
          <IonLabel>Please Type: </IonLabel>
          <IonInput
            value={animalType}
            placeholder="Animal Type (i.e. dog, cat, etc.)"
            onIonChange={(event) => onTypeChage(event.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Please Type: </IonLabel>
          <IonInput
            value={animalBreed}
            placeholder="Animal Breed"
            onIonChange={(event) => onBreedChange(event.detail.value!)}
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel>Please Type: </IonLabel>
          <IonInput
            value={animalColor}
            placeholder="Animal Color (i.e. black, blue, etc.)"
            onIonChange={(event) => onColorChange(event.detail.value!)}
          ></IonInput>
        </IonItem>
        {/* <IonItem>
                    <IonLabel>Please Type: </IonLabel>
                    <IonInput value={animalApproxLocation}
                        placeholder="Animal Approximate Community Location"
                        onIonChange={event => setAnimalApproxLocation(event.detail.value!)}></IonInput>
                </IonItem> */}

        {(animalType || animalColor || animalBreed || animalApproxLocation) && ( // || animalColor1 || animalColor2 || animalColor3
          <IonContent>
            {!loading &&
              data.findAnimals.map((animal: any) => (
                <IonCard
                  button={false}
                  color="light"
                  onClick={() =>
                    animalOnMap(animal.location.lat, animal.location.lon)
                  }
                >
                  <IonCardContent>
                    <h5>Type: {animal.type}</h5>
                    <h5>Breed: {animal.breed}</h5>
                    <h5>Color: {animal.color}</h5>
                    <h5>
                      Location: [ {animal.location.lat}, {animal.location.lon} ]
                    </h5>
                    <h5>Date: {new Date(animal.createdAt).toString()} </h5>
                  </IonCardContent>
                </IonCard>
              ))}
          </IonContent>
        )}

        {animalLat != 0 && animalLon != 0 && (
          <MapContainer
            id="mapid"
            center={[36.1627, -86.7816]}
            zoom={9}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[animalLat, animalLon]}>
              <Popup>Animal Location</Popup>
            </Marker>
          </MapContainer>
        )}
      </IonContent>
      <IonAvatar></IonAvatar>
    </IonPage>
  );
};

// vehicle related variables
//   export {vMake, vModel, vColor, vApproxLoc, vLicense}
// animal related variables
export {};
export default AnimalQueryPage;
