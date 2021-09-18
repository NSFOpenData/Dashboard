import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonIcon,
} from "@ionic/react";
import React, { useState } from "react";
import "./ReportLostVehiclePage.css";

/* GraphQL for API Calls */
import { gql, useMutation } from "@apollo/client";
import { chevronBackOutline } from "ionicons/icons";

const ReportLostVehiclePage: React.FC = () => {
  const PARTIAL_VEHICLE = gql`
    mutation (
      $color: [String!]!
      $make: String!
      $model: String!
      $license: String
    ) {
      createPartialVehicle(
        partial: {
          color: $color
          make: $make
          model: $model
          license: $license
        }
      ) {
        _id
        createdAt
        neighborhood
        color
        make
        model
        license
      }
    }
  `;
  const [vehicleMake, setVehicleMake] = useState<string | null>("");
  const [vehicleModel, setVehicleModel] = useState<string>("");
  const [vehicleLicense, setVehicleLicense] = useState<string>("");

  const [vehicleColor, setVehicleColor] = useState<string | null>();
  const [vehicleColorArray, setVehicleColorArray] = useState<string[]>();

  const [makePartialVehicle] = useMutation(PARTIAL_VEHICLE, {
    variables: {
      color: vehicleColorArray,
      make: vehicleMake,
      model: vehicleModel,
      license: vehicleLicense,
    },
    onCompleted: ({ result }) => {
      console.log(result);
    },
  });

  const onColorChange = (colorString: string) => {
    setVehicleColor(colorString);

    if (colorString?.indexOf(",") == -1) {
      var tempArr: string[] = [colorString];
      setVehicleColorArray(tempArr);
    } else if (colorString?.indexOf(",") !== -1) {
      setVehicleColorArray(colorString?.split(", ", 10));
    }

    console.log(vehicleColorArray);
  };

  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <div className="centerItem">
            <img
              className="logoPic"
              src="https://www.vanderbilt.edu/communications/brand/images/VUPrint.jpg"
            ></img>{" "}
          </div>
        </IonToolbar>
      </IonHeader> */}
      <IonContent fullscreen>
        <IonItem>
          <IonLabel>Make: </IonLabel>
          <IonInput
            placeholder="Toyota, Hyundai, BMW etc."
            onIonChange={(e) => setVehicleMake(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Model: </IonLabel>
          <IonInput
            placeholder="Camry, Santa Fe, X6 etc."
            onIonChange={(e) => setVehicleModel(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Color: </IonLabel>
          <IonInput
            value={vehicleColor}
            placeholder="black, white, brown, etc."
            onIonChange={(e) => onColorChange(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>License: </IonLabel>
          <IonInput
            placeholder="i.e. ABCDEF"
            onIonChange={(e) => setVehicleLicense(e.detail.value!)}
          ></IonInput>
        </IonItem>

        {vehicleColor && vehicleMake && vehicleModel && vehicleLicense && (
          <IonButton
            expand="block"
            style={{ padding: 8 }}
            onClick={() => makePartialVehicle()}
          >
            Submit
          </IonButton>
        )}

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

export default ReportLostVehiclePage;
