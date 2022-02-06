import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButton,
  IonItem,
  IonIcon,
  IonInput,
  IonLabel,
  IonLoading,
  IonText,
} from "@ionic/react";
import React, { useState, useRef } from "react";
import "./UploadPageAnimal.css";

// icons
import { chevronBackOutline } from "ionicons/icons";

// /* GraphQL for API Calls */
import { gql, useMutation, useQuery } from "@apollo/client";

// getting live geolocation
import { Geolocation, Geoposition } from "@ionic-native/geolocation";

const CREATE_ANIMAL = gql`
  mutation (
    $neighborhood: String
    $color: String
    $breed: String
    $type: String
    $location: LocationInput!
    $files: [Upload!]
  ) {
    createAnimal(
      animal: {
        neighborhood: $neighborhood
        color: $color
        breed: $breed
        type: $type
        location: $location
        files: $files
      }
    ) {
      _id
      neighborhood
    }
  }
`;

const UNIQUE_ID = gql`
query UniqeId{
  getUniqueID
}`

// for uploading files
interface InternalValues {
  file: any;
}

// number of animals uploaded
var numAnimalsUploaded = 0;

const UploadPageAnimal: React.FC = () => {
  type LocationInput = {
    lat: String;
    lon: String;
  };

  /* Making Animal */
  const [animalid, setAnimalId] = useState<string>("");
  const [animalCreatedAt, setAnimalCreatedAt] = useState<number>(0);
  const [animalLocation, setAnimalLocation] = useState<LocationInput | null>(
    null
  );
  const [animalNeighborhood, setAnimalNeighborhood] = useState<string>("");
  const [animalColor, setAnimalColor] = useState<string>("");
  const [animalBreed, setAnimalBreed] = useState<string>("");
  const [animalType, setAnimalType] = useState<string | null>("");
  const [imagesID, setImagesID] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");



  // const [fileNameArray, setFileNameArray] = useState<Array<string> | null>(
  //   null
  // );

  const [filesUpload, setFilesUpload] = useState<boolean>(true);

  var [makeAnimal, { data, loading }] = useMutation(CREATE_ANIMAL, {
    variables: {
      location: animalLocation,
      neighborhood: animalNeighborhood,
      color: animalColor,
      breed: animalBreed,
      type: animalType,
      files: [fileName],
    },
    onCompleted: ({ result }) => {
      console.log(result);
    },
    onError: (error) => {
      console.log(error);
    }
    
  });

  ////* Uploading Files */
  const values = useRef<InternalValues>({
    file: false,
  });

  // get uniqueID from the uuid library in the backend
  var { loading, data, error, refetch, networkStatus } = useQuery(UNIQUE_ID, {
    onCompleted: (data) => {
      setImagesID(data.getUniqueID);
    }
  });

  const onFileChange = (fileChangeEvent: any) => {
    if(!fileChangeEvent.target.files[0]) {
      setFileName("");
    } else {
      values.current.file = fileChangeEvent.target.files;
      setFileName(`animal/${imagesID}/${fileChangeEvent.target.files[0].name}`);
    }
  };

  const submitFileForm = async () => {

    await getLocation(); // getting location

    const formData = new FormData();
    formData.append("type", "animal");
    formData.append("id", imagesID);

    values.current.file[0] && formData.append(
      "images",
      values.current.file[0],
      values.current.file[0].name
    );

    console.log(values.current.file[0]);
    numAnimalsUploaded = numAnimalsUploaded + 1;
    console.log("num animals added: " + numAnimalsUploaded);

    let resUrl = "http://localhost:3000/upload"
    let productionUrl = "https://nsf-scc1.isis.vanderbilt.edu/upload"
    const response = await fetch(productionUrl, {
      method: "POST",
      body: formData,
    });
    
    if (response.status === 200) {
      console.log(fileName);
      makeAnimal();
    } else {
      console.log("file upload failed");
    }
  };

  // live geo location
  interface LocationError {
    showError: boolean;
    message?: string;
  }

  const [geoLoading, setGeoLoading] = useState<boolean>(false);
  const [geoError, setGeoError] = useState<LocationError>({ showError: false });
  const [position, setPosition] = useState<Geoposition>();

  const getLocation = async () => {
    setGeoLoading(true);

    try {
      const position = await Geolocation.getCurrentPosition();
      setPosition(position);
      setGeoLoading(false);
      setGeoError({ showError: false });
      let currentLocation = {
        lat: position.coords.latitude.toString(),
        lon: position.coords.longitude.toString(),
      };
      console.log(animalLocation);
      setAnimalLocation(currentLocation);
    } catch (e) {
      // setGeoError({ showError: true, message: e.message });
      setGeoLoading(false);
    }
  };

  return (
    <IonPage className="centerItem">

      <IonContent className="profilePage signinregion ion-padding">
        <IonLoading
          isOpen={geoLoading}
          onDidDismiss={() => setGeoLoading(false)}
          message={"Getting Location..."}
        />
        

        <h1>
          Report Lost Pet
        </h1>
        <div className="signin">
        <div className="register-block">
          <h3>Type: </h3>
          <IonInput
            placeholder="Dog, Cat, Bird, etc."
            className="registerInput"
            onIonChange={(e) => setAnimalType(e.detail.value!)}
          ></IonInput>
          <h3>Breed: </h3>
          <IonInput
            placeholder="Poodle, Persian, Canary etc."
            className="registerInput"
            onIonChange={(e) => setAnimalBreed(e.detail.value!)}
          ></IonInput>
          <h3>Color: </h3>
          <IonInput
            placeholder="Black, White, Brown, etc."
            className="registerInput"
            onIonChange={(e) => setAnimalColor(e.detail.value!)}
          ></IonInput>
          <h3>Neighborhood: </h3>
          <IonInput
            placeholder="Nashville, Sylvan Park, Downtown, etc."
            className="registerInput"
            onIonChange={(e) => setAnimalNeighborhood(e.detail.value!)}
          ></IonInput>
        
        {filesUpload && !loading && (
              <input
                type="file"
                onChange={(event) => onFileChange(event)}
                // accept="image/*,.pdf,.doc"
                style={{marginBottom: '15px'}}
                multiple
              ></input>
        )}
              <IonButton
              color="danger"
              className="reportButton"
              expand="block"
              onClick={() => submitFileForm()}
              disabled={!(animalColor && animalBreed && animalType && animalNeighborhood)}
            >
              Report Lost Pet
            </IonButton>
        </div>
        </div>

          <IonButton
            color="light"
            routerLink={"/animalDashboard"}
            routerDirection="back"
            className="backButton"
          >
            <IonIcon icon={chevronBackOutline}></IonIcon>
            back
          </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default UploadPageAnimal;
export { numAnimalsUploaded };
