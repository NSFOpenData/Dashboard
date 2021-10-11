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
import "./UploadPageLicense.css";

// icons
import { chevronBackOutline, images } from "ionicons/icons";

// /* GraphQL for API Calls */
import { gql, useMutation, useQuery } from "@apollo/client";

// getting live geolocation
import { Geolocation, Geoposition } from "@ionic-native/geolocation";
import { on } from "events";

const CREATE_VEHICLE = gql`
  mutation (
    $neighborhood: String
    $color: String
    $make: String
    $model: String
    $license: String
    $location: LocationInput!
    $imagesID: String
  ) {
    createVehicle(
      vehicle: {
        neighborhood: $neighborhood
        color: $color
        make: $make
        model: $model
        license: $license
        location: $location
        imagesID: $imagesID
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

const UploadPageLicense: React.FC = () => {
  type LocationInput = {
    lat: String;
    lon: String;
  };

  /* Making Vehicle */
  const [vehicleid, setVehicleId] = useState<string>("");
  const [imagesID, setImagesID] = useState<string>("");
  const [vehicleCreatedAt, setVehicleCreatedAt] = useState<number>(0);
  const [vehicleLocation, setVehicleLocation] = useState<LocationInput | null>(
    null
  );
  const [vehicleNeighborhood, setVehicleNeighborhood] = useState<string>("");
  const [vehicleColor, setVehicleColor] = useState<string>("");
  const [vehicleMake, setVehicleMake] = useState<string>("");
  const [vehicleModel, setVehicleModel] = useState<string | null>("");
  const [vehicleLicense, setVehicleLicense] = useState<string>("");

  const [filesUpload, setFilesUpload] = useState<boolean>(false);

  var [makeVehicle, { data, loading }] = useMutation(CREATE_VEHICLE, {
    variables: {
      location: vehicleLocation,
      neighborhood: vehicleNeighborhood,
      color: vehicleColor,
      make: vehicleMake,
      model: vehicleModel,
      license: vehicleLicense,
      imagesID: imagesID,
    },
    onCompleted: ({ result }) => {
      console.log(result);
      // setFilesUpload(true);
      // console.log(vehicleid);
    },
  });

  ////* Uploading Files */
  const values = useRef<InternalValues>({
    file: false,
  });

  const onFileChange = (fileChangeEvent: any) => {
    values.current.file = fileChangeEvent.target.files;
  };

  // get uniqueID from the uuid library in the backend
  var { loading, data, error, refetch, networkStatus } = useQuery(UNIQUE_ID, {
    onCompleted: (data) => {
      setImagesID(data.getUniqueID);
    }
    }
    );

  const submitFileForm = async () => {
    if (!values.current.file) {
      console.log("we got no file to upload");
      return false;
    }

    await getLocation(); // todo: do not need to ask user anymore
  
    const formData = new FormData();
    formData.append("type", "vehicle");
    formData.append("id", imagesID);
    formData.append(
      "images",
      values.current.file[0],
      values.current.file[0].name
    );

    try {
      fetch(
        // replace with https://nsf-scc1.isis.vanderbilt.edu/upload for production
        "http://localhost:3000/upload_new",
        {
          method: "POST",
          body: formData,
          mode: "no-cors",
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      // .then(res => res.json())
      .then(res => { 
        console.log(res);
        console.log(res.status);
        if (res.status === 200) {
          console.log("file uploaded");
          // makeVehicle();
        }
      });

      // if (!response.ok) {
      //   console.log("Error uploading file", response.statusText.length);
      //   // print response.statusText
      //   console.log("status", response.status);
      //   console.log("response", response);
      //   throw new Error(response.toString());
      // } else if (response.ok) {
      //   console.log("Success uploading file");
      //   console.log(response.statusText);

      //   // call function to make vehicle 
      //   console.log("make vehicle"); //todo: delete
      //   // makeVehicle();

      //   console.log("Created Vehicle object ID", data?.createVehicle._id);
      // }

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
        // name: "Vanderbilt",
      };
      console.log(vehicleLocation);
      setVehicleLocation(currentLocation);
    } catch (e) {
      // setGeoError({ showError: true, message: e.message });
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
          Upload Vehicle Data
        </h5>
        <IonItem>
          <IonLabel>Make: </IonLabel>
          <IonInput
            placeholder="Toyota, Hyundai, BMW, etc."
            onIonChange={(e) => setVehicleMake(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Model: </IonLabel>
          <IonInput
            placeholder="Camry, Tucsan, X3, etc."
            onIonChange={(e) => setVehicleModel(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Color: </IonLabel>
          <IonInput
            placeholder="black, white, brown, etc."
            onIonChange={(e) => setVehicleColor(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Neighborhood: </IonLabel>
          <IonInput
            placeholder="Sylvan Park, Downtown, Vanderbilt, etc."
            onIonChange={(e) => setVehicleNeighborhood(e.detail.value!)}
          ></IonInput>
        </IonItem>
        
        {/* {filesUpload && (
          <IonButton
            size="small"
            color="medium"
            className="centerItem"
            onClick={() => setVehicleId(data?.createVehicle._id)}
          >
            Press Here To Get Vehicle's Unique ID
          </IonButton>
        )} */}

        {(
          <div className="centerItem">
            <IonItem lines="none">
              <input
                type="file"
                onChange={(event) => onFileChange(event)}
                // accept="image/*,.pdf,.doc"
                multiple
              ></input>
            </IonItem>

            { vehicleColor && vehicleMake && vehicleModel && vehicleNeighborhood && (
              <IonButton
              color="primary"
              expand="block"
              onClick={() => submitFileForm()}
              size="small"
            >
              Upload!
            </IonButton>
            )}
            
          </div>
        )}

        <div className="privacyNotice">
          <IonText className="privacyText">
            Privacy Notice: by uploading the data, your current location will be
            disclosed
          </IonText>
        </div>

        <div className="bottomItems">
          <IonButton
            color="light"
            routerLink={"/licenseDashboard"}
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

export default UploadPageLicense;
