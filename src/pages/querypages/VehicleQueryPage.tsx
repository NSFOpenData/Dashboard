import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonAvatar,
  IonCard,
  IonCardContent,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import "./VehicleQueryPage.css";

import { gql, useLazyQuery } from "@apollo/client";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const VehicleQueryPage: React.FC = () => {
  type LocationInput = {
    lat: String;
    lon: String;
    name: String | null;
  };

  // trying without location for now
  const FIND_VEHICLE_QUERY = gql`
    query FindVehicles(
      $make: [String!]
      $model: [String!]
      $color: [String!]
      $license: [String!]
      $location: LocationInput
    ) {
      findVehicles(
        params: {
          make: $make
          model: $model
          location: $location
          color: $color
          license: $license
        }
      ) {
        _id
        make
        model
        files
        color
        location {
          lat
          lon
          name
        }
        createdAt
        license
      }
    }
  `;

  // Vehicle Related USER INPUT Variables:
  const [vehicleCompany, setVehicleCompany] = useState<string | null>();
  const [vehicleCompanyArray, setVehicleCompanyArray] = useState<string[]>();

  const [vehicleModel, setVehicleModel] = useState<string | null>();
  const [vehicleModelArray, setVehicleModelArray] = useState<string[]>();

  const [vehicleColor, setVehicleColor] = useState<string | null>();
  const [vehicleColorArray, setVehicleColorArray] = useState<string[]>();

  const [vehicleLicense, setVehicleLicense] = useState<string | null>();
  const [vehicleLicenseArray, setVehicleLicenseArray] = useState<string[]>();

  const [vehicleApproxLocation, setVehicleApproxLocation] =
    useState<LocationInput | null>();

  const onCompanyChange = (company: string) => {
    setVehicleCompany(company);

    if (company?.indexOf(",") == -1) {
      var tempArr: string[] = [company];
      setVehicleCompanyArray(tempArr);
    } else if (company?.indexOf(",") !== -1) {
      setVehicleCompanyArray(company?.split(", ", 10));
    }
  };

  const onModelChange = (model: string) => {
    setVehicleModel(model);

    if (model?.indexOf(",") == -1) {
      var tempArr: string[] = [model];
      setVehicleModelArray(tempArr);
    } else if (model?.indexOf(",") !== -1) {
      setVehicleModelArray(model?.split(", ", 10));
    }
  };

  const onColorChange = (color: string) => {
    setVehicleColor(color);

    if (color?.indexOf(",") == -1) {
      var tempArr: string[] = [color];
      setVehicleColorArray(tempArr);
    } else if (color?.indexOf(",") !== -1) {
      setVehicleColorArray(color?.split(", ", 10));
    }
  };

  const onLicenseChange = (license: string) => {
    setVehicleLicense(license);

    if (license?.indexOf(",") == -1) {
      var tempArr: string[] = [license];
      setVehicleLicenseArray(tempArr);
    } else if (license?.indexOf(",") !== -1) {
      setVehicleLicenseArray(license?.split(", ", 10));
    }
  };

  const [getSearchResults, { loading, data, error }] = useLazyQuery(
    FIND_VEHICLE_QUERY,
    {
      variables: {
        make: vehicleCompanyArray,
        model: vehicleModelArray,
        location: vehicleApproxLocation,
        color: vehicleColorArray,
        license: vehicleLicenseArray,
      },

      fetchPolicy: "network-only",
    }
  );

  useEffect(() => {
    getSearchResults();
  }, [vehicleCompany, vehicleModel, vehicleColor, vehicleLicense]);

  // if (loading) console.log("loading");
  if (error) console.log("error");

  // for the map
  const [carLat, setCarLat] = useState<number>(0);
  const [carLon, setCarLon] = useState<number>(0);

  const carOnMap = (latitude: number, longitude: number) => {
    setCarLat(latitude);
    setCarLon(longitude);
    console.log(carLat, ", ", carLon);
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
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
        <IonButton expand="full" disabled={true}>
          Vehicle Advanced Search Query
        </IonButton>
        <IonItem>
          <IonLabel>Please Type: </IonLabel>
          <IonInput
            value={vehicleCompany}
            placeholder="Vehicle Manufacturer/Company Name"
            onIonChange={(event) => onCompanyChange(event.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Please Type: </IonLabel>
          <IonInput
            value={vehicleModel}
            placeholder="Vehicle Model Name"
            onIonChange={(event) => onModelChange(event.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Please Type: </IonLabel>
          <IonInput
            value={vehicleColor}
            placeholder="Vehicle Color"
            onIonChange={(event) => onColorChange(event.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Please Type: </IonLabel>
          <IonInput
            value={vehicleLicense}
            placeholder="Vehicle License"
            onIonChange={(event) => onLicenseChange(event.detail.value!)}
          ></IonInput>
        </IonItem>

        {(vehicleCompany ||
          vehicleColor ||
          vehicleModel ||
          vehicleColor ||
          vehicleApproxLocation ||
          vehicleLicense) && (
          <IonContent>
            {!loading &&
              data.findVehicles
                .slice(0)
                .reverse()
                .map((vehicle: any) => (
                  // console.log(vehicle)
                  <IonCard
                    button={false}
                    color="light"
                    onClick={() =>
                      carOnMap(vehicle.location.lat, vehicle.location.lon)
                    }
                  >
                    <IonCardContent>
                      <h5>Manufacturer: {vehicle.make}</h5>
                      <h5>Model: {vehicle.model}</h5>
                      <h5>Color: {vehicle.color}</h5>
                      <h5>Location: {vehicle.location.name}</h5>
                      <h5>
                        Date:{" "}
                        {new Date(vehicle.createdAt)
                          .toString()
                          .substr(
                            0,
                            new Date(vehicle.createdAt)
                              .toString()
                              .indexOf("GMT")
                          ) + "(CDT)"}{" "}
                      </h5>
                      <h5>License Plate: {vehicle.license} </h5>
                    </IonCardContent>
                  </IonCard>
                ))}
          </IonContent>
        )}

        {carLat != 0 && carLon != 0 && (
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
            <Marker position={[carLat, carLon]}>
              <Popup>Vehicle Location</Popup>
            </Marker>
          </MapContainer>
        )}
      </IonContent>

      <IonAvatar></IonAvatar>
    </IonPage>
  );
};

export {};
export default VehicleQueryPage;
