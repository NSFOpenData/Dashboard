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
} from "@ionic/react";
import { Datepicker } from "@mobiscroll/react";
import React, { useState, Component } from "react";
import ExploreContainer from "../components/ExploreContainer";
import "./AnimalDashboard.css";

/* GraphQL for API Calls */
import { gql, NetworkStatus, useQuery } from "@apollo/client";
import { useHistory } from "react-router";

// icons
import { cloudUploadOutline, cloudDownloadOutline } from "ionicons/icons";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { types } from "util";

const AnimalDashboard: React.FC = () => {
  const [selectedStartDate, setSelectedStartDate] = useState<string>(
    "2021-06-01T13:47:20.789"
  );
  const [selectedEndDate, setSelectedEndDate] = useState<string>(
    "2021-06-01T13:47:20.789"
  );

  // for USER input on dropdown menus
  // const [location, setLocation] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [color, setColor] = useState<string>("");

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
  var quickTimePicker = "";
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

  const mapProps = {
    dataField: "location",
    defaultMapStyle: "Light Monochrome",
    defaultZoom: 13,
    react: {
      and: "places",
    },
    showMapStyles: true,

    //onPopoverClick: (item: { place: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => <div>{item.place}</div>,
    //renderData: (result: { magnitude: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
    //  console.log(result);
    //  return {
    //    label: <div>{}</div>
    //  };
    //}
  }; // for other properties: https://opensource.appbase.io/reactive-manual/map-components/reactivegooglemap.html

  // const history = useHistory();
  let individualCardPhotoSource = [];

  const ANIMAL_POST_QUERY = gql`
    query Animals {
      animals {
        _id
        color
        breed
        type
        createdAt
        location {
          lat
          lon
          name
        }
        files
      }
    }
  `;

  const { loading, data, error, refetch, networkStatus } = useQuery(
    ANIMAL_POST_QUERY,
    {
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

  // for number of animal being shown
  const [numCard, setNumCard] = useState<number>(data?.animals?.length);

  // for getting live geolocation
  interface LocationError {
    showError: boolean;
    message?: string;
  }

  return (
    <IonPage>
      {/* {
      console.log(location + " " + type + " " + color)
    } */}

      <IonContent fullscreen>
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
        {/* generalized date string formats! */}
        {/* {quickTimePicker = myMap.get(dateTime.toString().substring(4, 7)) + " " + dateTime.toString().substring(8, 21)}
        {startDate = selectedStartDate.substring(5,7) + " " + selectedStartDate.substring(8, 10) + " " + selectedStartDate.substring(0, 4) + " " + selectedStartDate.substring(11, 16)}
        {endDate = selectedEndDate.substring(5,7) + " " + selectedEndDate.substring(8, 10) + " " + selectedEndDate.substring(0, 4) + " " + selectedEndDate.substring(11, 16)} */}

        {/* <IonLoading isOpen={loading} message="Loading..." /> */}
        {/* <IonButton color="light" expand="full" disabled={true}>Animal Dashboard</IonButton> */}

        <div className="centerItem">
          <h5 style={{ fontWeight: "bold" }}>Upload Data</h5>
          <IonButton
            className="uploadMargin"
            color="secondary"
            routerLink={"/uploadPageA"}
          >
            <IonIcon className="iconSize" icon={cloudUploadOutline} />
          </IonButton>
        </div>

        <div className="centerItem">
          <h5 className="animalSelectionMargin" style={{ fontWeight: "bold" }}>
            Animal Selection{" "}
          </h5>

          <div className="centerItem">
            <IonButton
              className="buttonLeftMargin"
              size="small"
              onClick={() => setNumCard(10)}
            >
              View Recent Pets
            </IonButton>
          </div>
        </div>
        <div className="centerItem">
          <IonButton
            className="customQueryMargin"
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
          Type
        </h5>

        <IonItem>
          <IonLabel>Choose Type:</IonLabel>
          <IonSelect
            value={type}
            placeholder="Select One"
            onIonChange={(e) => setType(e.detail.value)}
          >
            <IonSelectOption value="dog">Dog</IonSelectOption>
            <IonSelectOption value="cat">Cat</IonSelectOption>
            <IonSelectOption value="rabbit">Rabbit</IonSelectOption>
            <IonSelectOption value="bird">Bird</IonSelectOption>
            <IonSelectOption value="lizard">Lizard</IonSelectOption>
            <IonSelectOption value="snake">Snake</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonAvatar></IonAvatar>

        <h5 className="centerItem" style={{ fontWeight: "bold" }}>
          Color
        </h5>

        <IonItem>
          <IonLabel>Choose Color:</IonLabel>
          <IonSelect
            value={color}
            placeholder="Select One"
            onIonChange={(e) => setColor(e.detail.value)}
          >
            <IonSelectOption value="black">Black</IonSelectOption>
            <IonSelectOption value="brown">Brown</IonSelectOption>
            <IonSelectOption value="white">White</IonSelectOption>
            <IonSelectOption value="cream">Cream</IonSelectOption>
            <IonSelectOption value="gold">Gold</IonSelectOption>
            <IonSelectOption value="grey">Grey</IonSelectOption>
            <IonSelectOption value="red">Red</IonSelectOption>
            <IonSelectOption value="orange">Orange</IonSelectOption>
            <IonSelectOption value="yellow">Yellow</IonSelectOption>
            <IonSelectOption value="green">Green</IonSelectOption>
            <IonSelectOption value="mint">Mint</IonSelectOption>
            <IonSelectOption value="blue">Blue</IonSelectOption>
            <IonSelectOption value="purple">Purple</IonSelectOption>
            {/* I have no idea how to set colors for snake as they have 
              differnt colors - do we allow people to choose multiple color */}
          </IonSelect>
        </IonItem>

        <IonAvatar></IonAvatar>

        <h5 className="centerItem" style={{ fontWeight: "bold" }}>
          Animal Info
        </h5>

        {animalLat != 0 && animalLon != 0 && (
          <MapContainer
            style={{ height: "350px" }}
            id="mapid"
            center={[36.1627, -86.7816]}
            zoom={12.5}
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

        <IonContent>
          {!loading &&
            data?.animals
              ?.slice(0, numCard)
              .reverse()
              .map((animal: any) => (
                <div className="centerItem">
                  {type.length > 0 && type == animal.type && (
                    <IonItem lines="none">
                      <IonCard
                        button={true}
                        color="light"
                        onClick={() =>
                          animalOnMap(animal.location.lat, animal.location.lon)
                        }
                      >
                        {animal.files !== undefined &&
                          animal.files.length != 0 && (
                            <img
                              style={{ height: 170, width: 320 }}
                              src={
                                "https://nsf-scc1.isis.vanderbilt.edu/file/animal/" +
                                animal._id +
                                "/" +
                                animal.files[0]
                              }
                            ></img>
                          )}
                        <IonCardContent>
                          <IonCardSubtitle>Animal Information</IonCardSubtitle>
                          <h5>Type: {animal.type}</h5>
                          <h5>Breed: {animal.breed}</h5>
                          <h5>Color: {animal.color}</h5>
                          <h5>Location: {animal.location.name}</h5>
                          <h5>
                            Date:{" "}
                            {new Date(animal.createdAt)
                              .toString()
                              .substr(
                                0,
                                new Date(animal.createdAt)
                                  .toString()
                                  .indexOf("GMT")
                              ) + "(CDT)"}{" "}
                          </h5>
                        </IonCardContent>
                      </IonCard>
                    </IonItem>
                  )}
                  {type.length == 0 && (
                    <IonItem lines="none">
                      <IonCard
                        button={true}
                        color="light"
                        onClick={() =>
                          animalOnMap(animal.location.lat, animal.location.lon)
                        }
                      >
                        {animal.files !== undefined &&
                          animal.files.length != 0 && (
                            <img
                              style={{ height: 170, width: 320 }}
                              src={
                                "https://nsf-scc1.isis.vanderbilt.edu/file/animal/" +
                                animal._id +
                                "/" +
                                animal.files[0]
                              }
                            ></img>
                          )}
                        <IonCardContent>
                          <IonCardSubtitle>Animal Information</IonCardSubtitle>
                          <h5>Type: {animal.type}</h5>
                          <h5>Breed: {animal.breed}</h5>
                          <h5>Color: {animal.color}</h5>
                          <h5>Location: {animal.location.name}</h5>
                          <h5>
                            Date:{" "}
                            {new Date(animal.createdAt)
                              .toString()
                              .substr(
                                0,
                                new Date(animal.createdAt)
                                  .toString()
                                  .indexOf("GMT")
                              ) + "(CDT)"}{" "}
                          </h5>
                        </IonCardContent>
                      </IonCard>
                    </IonItem>
                  )}
                </div>
              ))}
        </IonContent>
        <IonAvatar></IonAvatar>
      </IonContent>
    </IonPage>
  );
};

export default AnimalDashboard;

function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
  throw new Error("Function not implemented.");
}
