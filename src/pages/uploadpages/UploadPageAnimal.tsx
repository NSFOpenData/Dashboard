import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButton,
  IonAvatar,
  IonItem,
  IonIcon,
} from "@ionic/react";
import React, { useState, useRef } from "react";
import "./UploadPageAnimal.css";

// icons
import { chevronBackOutline } from "ionicons/icons";

// /* GraphQL for API Calls */
import { gql, useMutation } from "@apollo/client";

const CREATE_ANMIAL = gql`
  mutation (
    $_id: ID!
    $createdAt: Float!
    $location: Location!
    $neighborhood: String!
    $color: String
    $breed: String
    $type: String
    $files: [String!]
  ) {
    createVehicle(
      vehicle: {
        id: $_id
        createdAt: $createdAt
        location: $location
        neighborhood: $neighborhood
        color: $color
        breed: $breed
        type: $type
        files: $files
      }
    ) {
      type
    }
  }
`;

// for uploading files
interface InternalValues {
  file: any;
}

let files: any[] = [];

const UploadPage: React.FC = () => {
  type Location = {
    lat: String;
    lon: String;
    name: String;
  };

  /* Making Animal */
  const [animalid, setAnimalId] = useState<string>("");
  const [animalCreatedAt, setAnimalCreatedAt] = useState<number>(0);
  const [animalLocation, setAnimalLocation] = useState<Location | null>(null);
  const [animalNeighborhood, setAnimalNeighborhood] = useState<string>("");
  const [animalColor, setAnimalColor] = useState<string>("");
  const [animalBreed, setAnimalBreed] = useState<string>("");
  const [animalType, setAnimalType] = useState<string>("");
  const [animalFiles, setAnimalFiles] = useState<Array<string> | null>(null);

  const [makeAnimal] = useMutation(CREATE_ANMIAL, {
    variables: {
      id: animalid,
      createdAt: animalCreatedAt,
      location: animalLocation,
      neighborhood: animalNeighborhood,
      color: animalColor,
      breed: animalBreed,
      type: animalType,
      files: animalFiles,
    },
    onCompleted: ({ result }) => {
      console.log(result);
    },
  });

  ////* Uploading Files */
  const values = useRef<InternalValues>({
    file: false,
  });

  const onFileChange = (fileChangeEvent: any) => {
    values.current.file = fileChangeEvent.target.files;
    // console.log(values.current.file);
    // console.log("here: " + fileChangeEvent.target.files[0].name);
    // files = Array.from(fileChangeEvent.target.files);

    // {
    //   files.map((file: any) =>
    //     console.log("file-to-upload detected: " + file.name)
    //   );
    // }
  };

  const submitFileForm = async () => {
    if (!values.current.file) {
      console.log("we got no file to upload");
      return false;
    }

    const formData = new FormData();
    formData.append("type", "vehicle");
    formData.append("id", "60db8c13d0ff05f382fd8707");
    // console.log(values.current.file[0].name);
    formData.append(
      "images",
      values.current.file[0],
      values.current.file[0].name
    );

    console.log(values.current.file[0]);
    // {
    //   values.current.file.map(
    //     (file: any) => console.log(file)
    //     // formData.append("images", file, file.name)
    //   );
    // }
    // console.log(values.current.file.name);
    // console.log(formData.get("type"));
    // console.log(formData.get("id"));

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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className="centerItem">
            <img src="http://sensys.acm.org/2014/resources/images/IsisLogo.jpg"></img>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <h5 className="centerItem" style={{ fontWeight: "bold" }}>
          Upload Animal Data
        </h5>
        <div className="centerItem">
          <IonItem lines="none">
            {/* <form action="https://nsf-scc1.isis.vanderbilt.edu/upload" encType="multipart/form-data" method="post"> */}
            {/* <input type="text" placeholder="Object ID" name="id"></input>
            <input type="text" placeholder="Please type: 'vehicle'" name="type"></input> */}
            {/* <input name="images" type="file" onChange={(event) => onFileChange(event)} accept="image/*,.pdf,.doc" multiple></input> */}
            <input
              type="file"
              onChange={(event) => onFileChange(event)}
              // accept="image/*,.pdf,.doc"
              multiple
            ></input>
            {/* <input type="submit" value="upload"></input> */}
            {/* </form> */}
          </IonItem>
        </div>

        <IonButton
          color="primary"
          expand="block"
          onClick={() => submitFileForm()}
        >
          Submit
        </IonButton>

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

export default UploadPage;
