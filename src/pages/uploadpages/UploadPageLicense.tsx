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
import { chevronBackOutline } from "ionicons/icons";

// /* GraphQL for API Calls */
import { gql, useMutation } from "@apollo/client";

// getting live geolocation
import { Geolocation, Geoposition } from "@ionic-native/geolocation";

const CREATE_VEHICLE = gql`
  mutation (
    $neighborhood: String
    $color: String
    $make: String
    $model: String
    $license: String
    $location: LocationInput!
  ) {
    createVehicle(
      vehicle: {
        neighborhood: $neighborhood
        color: $color
        make: $make
        model: $model
        license: $license
        location: $location
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

const UploadPageLicense: React.FC = () => {
  type LocationInput = {
    lat: String;
    lon: String;
  };

  /* Making Vehicle */
  const [vehicleid, setVehicleId] = useState<string>("");
  const [vehicleCreatedAt, setVehicleCreatedAt] = useState<number>(0);
  const [vehicleLocation, setVehicleLocation] = useState<LocationInput | null>(
    null
  );
  const [vehicleNeighborhood, setVehicleNeighborhood] = useState<string>("");
  const [vehicleColor, setVehicleColor] = useState<string>("");
  const [vehicleMake, setVehicleMake] = useState<string>("");
  const [vehicleModel, setVehicleModel] = useState<string | null>("");

  const [filesUpload, setFilesUpload] = useState<boolean>(false);

  const [makeVehicle, { data, loading }] = useMutation(CREATE_VEHICLE, {
    variables: {
      location: vehicleLocation,
      neighborhood: vehicleNeighborhood,
      color: vehicleColor,
      make: vehicleMake,
      model: vehicleModel,
    },
    onCompleted: ({ result }) => {
      console.log(result);
      setFilesUpload(true);
      console.log(vehicleid);
    },
  });

  ////* Uploading Files */
  const values = useRef<InternalValues>({
    file: false,
  });

  const onFileChange = (fileChangeEvent: any) => {
    values.current.file = fileChangeEvent.target.files;
  };

  const submitFileForm = async () => {
    if (!values.current.file) {
      console.log("we got no file to upload");
      return false;
    }

    const formData = new FormData();
    formData.append("type", "vehicle");
    formData.append("id", vehicleid);
    formData.append(
      "images",
      values.current.file[0],
      values.current.file[0].name
    );

    console.log(values.current.file[0]);

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
        <IonButton
          size="small"
          className="centerItem"
          onClick={() => getLocation()}
        >
          Fetch Your Location
        </IonButton>
        <IonButton
          size="small"
          className="centerItem"
          onClick={() => makeVehicle()}
          color="secondary"
        >
          Upload Picture
        </IonButton>

        {filesUpload && (
          <IonButton
            size="small"
            color="medium"
            className="centerItem"
            onClick={() => setVehicleId(data?.createVehicle._id)}
          >
            Press Here To Get Vehicle's Unique ID
          </IonButton>
        )}

        {filesUpload && !loading && (
          <div className="centerItem">
            <IonItem lines="none">
              <input
                type="file"
                onChange={(event) => onFileChange(event)}
                // accept="image/*,.pdf,.doc"
                multiple
              ></input>
            </IonItem>

            <IonButton
              color="primary"
              expand="block"
              onClick={() => submitFileForm()}
              size="small"
            >
              Upload!
            </IonButton>
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
