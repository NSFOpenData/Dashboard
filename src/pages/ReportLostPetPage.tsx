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
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonAvatar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonLoading,
  IonSegment,
  IonSegmentButton,
  IonIcon,
  IonInput,
} from "@ionic/react";
import React, { useState, Component } from "react";
import "./ReportLostPetPage.css";

/* GraphQL for API Calls */
import { gql, NetworkStatus, useMutation } from "@apollo/client";
import { useHistory } from "react-router";

const ReportLostPetPage: React.FC = () => {
  const PARTIAL_ANIMAL = gql`
    mutation ($type: String!, $breed: String!, $color: [String!]!) {
      createPartialAnimal(
        partial: { color: $color, breed: $breed, type: $type }
      ) {
        _id
        color
        createdAt
        breed
        neighborhood
        type
      }
    }
  `;
  const [animalType, setAnimalType] = useState<string | null>("");
  const [animalBreed, setAnimalBreed] = useState<string>("");
  const [animalColor, setAnimalColor] = useState<string | null>();
  const [animalColorArray, setAnimalColorArray] = useState<string[]>();

  const [makePartialAnimal] = useMutation(PARTIAL_ANIMAL, {
    variables: {
      type: animalType,
      breed: animalBreed,
      color: animalColorArray,
    },
    onCompleted: ({ result }) => {
      console.log(result);
    },
  });

  const onColorChange = (colorString: string) => {
    setAnimalColor(colorString);

    if (colorString?.indexOf(",") == -1) {
      var tempArr: string[] = [colorString];
      setAnimalColorArray(tempArr);
    } else if (colorString?.indexOf(",") !== -1) {
      setAnimalColorArray(colorString?.split(", ", 10));
    }

    console.log(animalColorArray);
  };

  return (
    <IonPage>
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
      <IonContent fullscreen>
        <IonItem>
          <IonLabel>Type: </IonLabel>
          <IonInput
            placeholder="dog, cat, bird, etc."
            onIonChange={(e) => setAnimalType(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Breed: </IonLabel>
          <IonInput
            placeholder="poodle, persian, canary etc."
            onIonChange={(e) => setAnimalBreed(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Color: </IonLabel>
          <IonInput
            value={animalColor}
            placeholder="black, white, brown, etc."
            onIonChange={(e) => onColorChange(e.detail.value!)}
          ></IonInput>
        </IonItem>

        {animalType && animalBreed && animalColor && (
          <IonButton
            expand="block"
            style={{ padding: 8 }}
            onClick={() => makePartialAnimal()}
          >
            Submit
          </IonButton>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ReportLostPetPage;

function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
  throw new Error("Function not implemented.");
}
