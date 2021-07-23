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
import { gql, useMutation } from "@apollo/client";

// getting live geolocation
import { Geolocation, Geoposition } from "@ionic-native/geolocation";

import { useDropzone } from "react-dropzone";

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

  const [files, setFiles] = useState<{}>({});
  const [fileNameArray, setFileNameArray] = useState<Array<string> | null>(
    null
  );
  const [filesUpload, setFilesUpload] = useState<boolean>(true);

  const [makeAnimal, { data, loading }] = useMutation(CREATE_ANIMAL, {
    variables: {
      files,
      location: animalLocation,
      neighborhood: animalNeighborhood,
      color: animalColor,
      breed: animalBreed,
      type: animalType,
    },
    onCompleted: ({ result }) => {
      // console.log(result);
      setFilesUpload(true);
      setAnimalId(data?.createAnimal._id);
      console.log(animalid);
    },
  });

  const handleSubmit = async () => {
    if (files) {
      makeAnimal({
        variables: {
          files,
          location: animalLocation,
          neighborhood: animalNeighborhood,
          color: animalColor,
          breed: animalBreed,
          type: animalType,
        },
        // add the rest of the form fields to this query
        // refetchQueries: [{ query: FileQuery, variables: file }],
      });
      // setFiles({});
      // post message on form
      console.log("Uploaded successfully: ", files);
    } else {
      // return alertk
      console.log("No files to upload");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFile) => {
      setFiles(
        Object.assign(acceptedFile[0], {
          preview: URL.createObjectURL(acceptedFile[0]),
        })
      );
    },
  });

  ////* Uploading Files */
  // const values = useRef<InternalValues>({
  //   file: false,
  // });
  const values = useRef<InternalValues>({
    file: false,
  });
  const onFileChange = (fileChangeEvent: any) => {
    values.current.file = fileChangeEvent.target.files;
    setFiles(values.current.file);
    var tempArr: string[] = [values.current.file];
    setFileNameArray(tempArr);

    console.log(files);
    console.log(fileNameArray);
  };

  const submitFileForm = async () => {
    if (!values.current.file) {
      console.log("we got no file to upload");
      return false;
    }

    const formData = new FormData();
    formData.append("type", "animal");
    formData.append("id", animalid);
    formData.append(
      "images",
      values.current.file[0],
      values.current.file[0].name
    );

    console.log(values.current.file[0]);
    numAnimalsUploaded = numAnimalsUploaded + 1;
    console.log("num animals added: " + numAnimalsUploaded);

    try {
      const response = await fetch(
        "https://nsf-scc1.isis.vanderbilt.edu/upload",
        {
          method: "POST",
          body: formData,
          mode: "no-cors",
          headers: {
            "Content-type": "undefined",
          },
        }
      );

      if (!response.ok) {
        console.log("Error uploading file");
        console.log(response.toString());
        throw new Error(response.toString());
      } else if (response.ok) {
        console.log("Success uploading file");
        console.log(response.statusText);
      }

      console.log(response);
    } catch (err) {
      console.log(err);
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
      setGeoError({ showError: true, message: e.message });
      setGeoLoading(false);
    }
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
        <IonLoading
          isOpen={geoLoading}
          onDidDismiss={() => setGeoLoading(false)}
          message={"Getting Location..."}
        />

        <h5 className="centerItem" style={{ fontWeight: "bold" }}>
          Upload Animal Data
        </h5>
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
            placeholder="black, white, brown, etc."
            onIonChange={(e) => setAnimalColor(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Neighborhood: </IonLabel>
          <IonInput
            placeholder="Nashville, Sylvan Park, Downtown, etc."
            onIonChange={(e) => setAnimalNeighborhood(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonButton
          size="small"
          className="centerItem"
          onClick={() => getLocation()}
        >
          Fetch Your Location
        </IonButton>

        {/* {filesUpload && (
          <IonButton
            size="small"
            color="medium"
            className="centerItem"
            onClick={() => setAnimalId(data?.createAnimal._id)}
          >
            Press Here To Get Animal's Unique ID
          </IonButton>
        )} */}

        {filesUpload && !loading && (
          <div className="centerItem">
            <IonItem lines="none">
              {/* <input
                type="file"
                onChange={(event) => onFileChange(event)}
                // onChange={() => makeAnimal()}
                // accept="image/*,.pdf,.doc"
                multiple
                required
              ></input> */}

              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some file here, or click to select file</p>
              </div>
            </IonItem>

            {/* <IonButton
              color="primary"
              expand="block"
              onClick={() => submitFileForm()}
              size="small"
            >
              Upload!
            </IonButton> */}
          </div>
        )}
        <IonButton
          size="small"
          className="centerItem"
          onClick={() => handleSubmit()}
          color="secondary"
        >
          Upload
        </IonButton>

        <div className="privacyNotice">
          <IonText className="privacyText">
            Privacy Notice: by uploading the data, your current location will be
            disclosed
          </IonText>
        </div>

        <div className="bottom">
          <IonButton
            color="light"
            routerLink={"/animalDashboard"}
            routerDirection="back"
          >
            <IonIcon icon={chevronBackOutline}></IonIcon>
            back
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UploadPageAnimal;
export { numAnimalsUploaded };
