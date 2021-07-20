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
  IonIcon,
} from "@ionic/react";
import { Datepicker } from "@mobiscroll/react";
import React, { useState, Component, useRef, useEffect } from "react";
import ExploreContainer from "../components/ExploreContainer";
import "./LicenseDashboard.css";

import { Plugins, CameraResultType } from "@capacitor/core";

/* Reactive Google Map */
import { ReactiveBase, SingleList } from "@appbaseio/reactivesearch";
import {
  ReactiveGoogleMap,
  ReactiveOpenStreetMap,
} from "@appbaseio/reactivemaps";

import "leaflet/dist/leaflet.css";

/* GraphQL for API Calls */
import { gql, NetworkStatus, useQuery } from "@apollo/client";
import { useHistory } from "react-router";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { latLng } from "leaflet";
import { render } from "@testing-library/react";

// icons
import {
  cloudUploadOutline,
  cloudDownloadOutline,
  volumeHighSharp,
} from "ionicons/icons";

const { Camera } = Plugins;

// for uploading files
interface InternalValues {
  file: any;
}

let files: any[] = [];

let readableLocations: Array<string>;

const LicenseDashboard: React.FC = () => {
  const [selectedStartDate, setSelectedStartDate] = useState<string>(
    "2021-06-01T13:47:20.789"
  );
  const [selectedEndDate, setSelectedEndDate] = useState<string>(
    "2021-06-01T13:47:20.789"
  );
  const [photo, setPhoto] = useState(
    "https://images.summitmedia-digital.com/topgear/images/2018/07/12/Toyota-Cressida-MkII---Arvi.jpg"
  ); // "https://upload.wikimedia.org/wikipedia/commons/7/74/Vintage_blue_car.png");
  //60b6e51818ca7fe9e8156888

  // User inputs from dropdown menus
  const [location, setLocation] = useState<string>("");
  const [licensePlate, setLicensePlate] = useState<string>("");

  // for the date and time selection
  const [advancedDate, setAdvancedDate] = useState<boolean>(false);

  // for date selection and readability
  let dateTime = new Date();
  let myMap = new Map([
    ["Jan", "01"],
    ["Feb", "02"],
    ["Mar", "03"],
    ["Apr", "04"],
    ["May", "05"],
    ["Jun", "06"],
    ["Jul", "07"],
    ["Aug", "08"],
    ["Sep", "09"],
    ["Oct", "10"],
    ["Nov", "11"],
    ["Dec", "12"],
  ]);
  var startDate = "";
  var endDate = "";
  var quickTimePicker =
    myMap.get(dateTime.toString().substring(4, 7)) +
    " " +
    dateTime.toString().substring(8, 21);

  //// FOR QUICK DATE TIME PICKER
  function goBack6Hours() {
    // if the subtracted value is negative, call go back 24hours function and subtract that negative value from 24
    var hourEndIndex = 13;
    if (quickTimePicker.length == 15) {
      hourEndIndex = 12;
    }
    var tempTime = +quickTimePicker.substring(11, hourEndIndex);
    var back12Hrs = tempTime - 6;
    // console.log(tempTime.toString())
    // console.log(back12Hrs.toString());
    if (back12Hrs < 0) {
      goBack24Hours();
      var newHour = 24 + back12Hrs;
      quickTimePicker =
        quickTimePicker.substring(0, 10) +
        " " +
        newHour.toString() +
        ":" +
        quickTimePicker.substring(hourEndIndex + 1, quickTimePicker.length);
    } else {
      quickTimePicker =
        quickTimePicker.substring(0, 10) +
        " " +
        back12Hrs.toString() +
        ":" +
        quickTimePicker.substring(hourEndIndex + 1, quickTimePicker.length);
    }

    console.log(quickTimePicker);
  }

  function goBack12Hours() {
    // if the subtracted value is negative, call go back 24hours function and subtract that negative value from 24
    var hourEndIndex = 13;
    if (quickTimePicker.length == 15) {
      hourEndIndex = 12;
    }
    var tempTime = +quickTimePicker.substring(11, hourEndIndex);
    var back12Hrs = tempTime - 12;
    // console.log(tempTime.toString())
    // console.log(back12Hrs.toString());
    if (back12Hrs < 0) {
      goBack24Hours();
      var newHour = 24 + back12Hrs;
      quickTimePicker =
        quickTimePicker.substring(0, 10) +
        " " +
        newHour.toString() +
        ":" +
        quickTimePicker.substring(hourEndIndex + 1, quickTimePicker.length);
    } else {
      quickTimePicker =
        quickTimePicker.substring(0, 10) +
        " " +
        back12Hrs.toString() +
        ":" +
        quickTimePicker.substring(hourEndIndex + 1, quickTimePicker.length);
    }

    console.log(quickTimePicker);
  }

  function goBack24Hours() {
    console.log("i'm here");
    // just change the date
    var tempDay = +quickTimePicker.substring(3, 5); // turning string to integer
    var day = tempDay - 1;
    console.log(day.toString());
    console.log(tempDay.toString());

    quickTimePicker =
      quickTimePicker.substring(0, 3) +
      day.toString() +
      quickTimePicker.substring(5, quickTimePicker.length);
    console.log(quickTimePicker);
  }

  const VEHICLE_POST_QUERY = gql`
    query Vehicles {
      vehicles {
        _id
        location {
          lat
          lon
          name
        }
        model
        make
        color
        license
        createdAt
        files
      }
    }
  `;

  const { loading, data, error, refetch, networkStatus } = useQuery(
    VEHICLE_POST_QUERY,
    {
      fetchPolicy: "no-cache",
      notifyOnNetworkStatusChange: true,
    }
  );
  if (networkStatus == NetworkStatus.refetch) console.log("refetching!");
  if (loading) console.log("loading");
  if (error) console.log("error: " + error.networkError);

  const mapProps = {
    dataField: "location",
    defaultMapStyle: "Light Monochrome",
    defaultZoom: 13.1,
    react: {
      and: "places",
    },
    showMapStyles: true,
  }; // for other properties: https://opensource.appbase.io/reactive-manual/map-components/reactivegooglemap.html

  ////* Uploading Files */
  const values = useRef<InternalValues>({
    file: false,
  });

  const onFileChange = (fileChangeEvent: any) => {
    // values.current.file = fileChangeEvent.target.files[0];
    // console.log(values.current.file);
    console.log("here" + fileChangeEvent.target.files[0].name);
    files = Array.from(fileChangeEvent.target.files);

    {
      files.map((file: any) =>
        console.log("file-to-upload detected: " + file.name)
      );
    }
  };

  const submitFileForm = async () => {
    // if (!values.current.file) {
    //   console.log("we got no file to upload")
    //   return false;
    // }

    let formData = new FormData();
    formData.append("type", "vehicle");
    formData.append("id", "60b6e51818ca7fe9e8156888");
    {
      files.map((file: any) =>
        // console.log(file.name)
        formData.append("images", file, file.name)
      );
    }
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
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (!response.ok) {
        console.log("Error uploading file");
        throw new Error(response.statusText);
      } else if (response.ok) {
        console.log("Success uploading file");
        console.log(response.statusText);
      }

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  // function getLocation(longitude: number, latitude: number) {
  //   // let result = "could not fetch location"
  //   try {
  //     fetch("http://api.positionstack.com/v1/forward?access_key=a57c395fd8950775378564e7e9a95822&query=" + longitude + "," + latitude, {
  //       method: "GET",
  //     }).then(function (res) {
  //       res.json().then(body => {
  //         console.log(body.data)
  //       })
  //     })
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // FOR PLACING SELECTED CAR's location on the map

  const [carLat, setCarLat] = useState<number>(0);
  const [carLon, setCarLon] = useState<number>(0);

  const carOnMap = (latitude: number, longitude: number) => {
    setCarLat(latitude);
    setCarLon(longitude);
    console.log(carLat, ", ", carLon);
  };

  // for number of cars being shown
  const [numCard, setNumCard] = useState<number>(data?.vehicles?.length);

  return (
    // return (
    <IonPage>
      {/* {
        console.log(licensePlate + location)
      } */}

      <IonContent fullscreen>
        <IonHeader mode="ios" collapse="condense">
          <IonToolbar>
            <div className="centerItem">
              <img
                className="logoPic"
                src="https://www.vanderbilt.edu/communications/brand/images/VUPrint.jpg"
              ></img>{" "}
            </div>
          </IonToolbar>
        </IonHeader>

        {/* generalized date string formats! */}
        {/* {quickTimePicker = myMap.get(dateTime.toString().substring(4, 7)) + " " + dateTime.toString().substring(8, 21)}
        {startDate = selectedStartDate.substring(5,7) + " " + selectedStartDate.substring(8, 10) + " " + selectedStartDate.substring(0, 4) + " " + selectedStartDate.substring(11, 16)}
        {endDate = selectedEndDate.substring(5,7) + " " + selectedEndDate.substring(8, 10) + " " + selectedEndDate.substring(0, 4) + " " + selectedEndDate.substring(11, 16)} */}

        <IonLoading isOpen={loading} message="Loading.." />

        {/* <IonButton onClick={() => getLocation()}>Get location temp button</IonButton> */}
        {/* <IonButton color="primary" expand="full" disabled={true}>License Dashboard</IonButton> */}

        <div className="centerItem">
          <h5 style={{ fontWeight: "bold" }}>Upload Data</h5>
          <IonButton
            className="uploadMargin"
            color="secondary"
            routerLink={"/uploadPageL"}
          >
            <IonIcon className="iconSize" icon={cloudUploadOutline} />
          </IonButton>
        </div>

        <div className="centerItem">
          <h5 className="plateSelectionMargin" style={{ fontWeight: "bold" }}>
            Plate Selection{" "}
          </h5>

          <div className="centerItem">
            <IonButton
              className="buttonLeftMargin"
              size="small"
              onClick={() => setNumCard(10)}
            >
              View Recent Plates
            </IonButton>
          </div>
        </div>
        <div className="centerItem">
          <IonButton
            className="customQueryMarginL"
            color="medium"
            size="small"
            onClick={() => setAdvancedDate(!advancedDate)}
          >
            Custom Query
          </IonButton>
        </div>

        {advancedDate && (
          <div>
            <IonSegment color="secondary" value="favorite">
              {/* from the quickTimePicker value, go 24 hrs back */}
              <IonSegmentButton
                value="twentyfourhr"
                onClick={() => goBack24Hours()}
              >
                <IonLabel>Yesterday</IonLabel>
              </IonSegmentButton>

              {/* from the quickTimePicker value, go 12 hrs back */}
              <IonSegmentButton
                value="twelvehr"
                onClick={() => goBack12Hours()}
              >
                <IonLabel>Past 12 Hrs</IonLabel>
              </IonSegmentButton>

              {/* from the quickTimePicker value, go 6 hrs back */}
              <IonSegmentButton value="sixhr" onClick={() => goBack6Hours()}>
                <IonLabel>Past 6 Hrs</IonLabel>
              </IonSegmentButton>
            </IonSegment>

            <div className="centerItem">
              <h6>
                {/* Start Date and Time: */}
                <IonDatetime
                  displayFormat="MMM DD, YYYY HH:mm"
                  min="1990"
                  max="2030"
                  value={selectedStartDate}
                  onIonChange={(e) => setSelectedStartDate(e.detail.value!)}
                ></IonDatetime>
              </h6>
              <IonAvatar></IonAvatar>
              <h6>
                {/* End Date and Time: */}
                <IonDatetime
                  displayFormat="MMM DD, YYYY HH:mm"
                  min="1990"
                  max="2030"
                  value={selectedEndDate}
                  onIonChange={(e) => setSelectedEndDate(e.detail.value!)}
                ></IonDatetime>
              </h6>
            </div>
          </div>
        )}

        <IonAvatar></IonAvatar>

        <h5 className="centerItem" style={{ fontWeight: "bold" }}>
          License Plates
        </h5>

        <IonItem>
          <IonLabel>Choose License Plate:</IonLabel>
          <IonSelect
            value={licensePlate}
            placeholder="Select One"
            onIonChange={(e) => setLicensePlate(e.detail.value)}
          >
            {!loading &&
              data?.vehicles
                ?.slice(0, numCard)
                .reverse()
                .filter((vehicle: string) => vehicle != null)
                .map((vehicle: any) => (
                  // if (vehicle.license != null) {
                  <IonSelectOption value={vehicle.license}>
                    {vehicle.license}
                  </IonSelectOption>
                  // }

                  // if (vehicle.license !== null) {
                  // }
                ))}
          </IonSelect>
        </IonItem>

        <IonAvatar></IonAvatar>

        {carLat != 0 && carLon != 0 && (
          <MapContainer
            style={{ height: "350px" }}
            id="mapid"
            center={[36.1627, -86.7816]}
            zoom={8.3}
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

        <IonAvatar></IonAvatar>

        <IonContent scrollX={true}>
          {!loading &&
            data?.vehicles
              ?.slice(0, numCard)
              .reverse()
              .map((vehicle: any, index: number) => (
                // getLocation(vehicle.location[0], vehicle.location[1])
                // console.log(vehicle.license)
                <div className="centerItem">
                  <IonItem lines="none">
                    <IonCard
                      button={true}
                      color="light"
                      onClick={() =>
                        carOnMap(vehicle.location.lat, vehicle.location.lon)
                      }
                    >
                      {vehicle.files !== undefined &&
                        vehicle.files.length != 0 && (
                          <img
                            className="centerItem"
                            style={{ height: 160, width: 320 }}
                            src={
                              "https://nsf-scc1.isis.vanderbilt.edu/file/vehicle/" +
                              vehicle._id +
                              "/" +
                              vehicle.files[0]
                            }
                          ></img>
                        )}
                      <IonCardContent>
                        <IonCardSubtitle>Car Information</IonCardSubtitle>
                        <h5>Manufacturer: {vehicle.make}</h5>
                        <h5>Model: {vehicle.model}</h5>
                        <h5>Color: {vehicle.color}</h5>
                        {/* {vehicle.neighborhood != null && (
                        <h5>Neighborhood: {vehicle.neighborhood}</h5>
                      )} */}
                        {/* <h5>Location: {readableLocations[index]}</h5>  */}
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
                  </IonItem>
                </div>
                // <div></div>
              ))}
        </IonContent>

        <IonAvatar></IonAvatar>

        {/* <h5 className="centerItem" style={{ fontWeight: "bold" }}>Track</h5> */}

        {/* https://stackoverflow.com/questions/67552020/how-to-fix-error-failed-to-compile-node-modules-react-leaflet-core-esm-pat  */}
      </IonContent>
    </IonPage>
    // );
  );
};

export default LicenseDashboard;
