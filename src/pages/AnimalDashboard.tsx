import {
    IonContent,
    IonHeader,
    IonTitle,
    IonPage,
    IonToolbar,
    IonButton,
    IonButtons,
    IonDatetime,
    IonItem,
    IonLabel,
    IonIcon,
    IonSearchbar,
    IonList,
    IonPopover,
    useIonPicker,
    useIonViewWillEnter,
  } from "@ionic/react";
  import React, { useState, useEffect } from "react";
  import "./AnimalDashboard.css";
  import TopMenu from "./../components/TopMenu";
  import moment from "moment";
  
  /* GraphQL for API Calls */
  import { gql, NetworkStatus, useQuery } from "@apollo/client";
  
  // icons
  import {
    cloudUploadOutline,
    calendar,
    paw,
    locate,
    map,
    navigateCircleOutline,
  } from "ionicons/icons";
  import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
  import { getByDisplayValue } from "@testing-library/react";
  
  const AnimalDashboard: React.FC = () => {
    const [selectedStartDate, setSelectedStartDate] = useState<string>(
      "2021-06-01T13:47:20.789"
    );
    const [selectedEndDate, setSelectedEndDate] = useState<string>(
      "2021-06-01T13:47:20.789"
    );
  
    // for USER input on dropdown menus
    const [pastTime, setPastTime] = useState<string>("");
  
    // for the date and time selection
    const [advancedDate, setAdvancedDate] = useState<boolean>(false);
    const [type, setType] = useState<string>("");
  
    const [present] = useIonPicker();
    const [value, setValue] = useState("");
  
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
    var quickTimePicker = "";
    var quickTimePicker =
      myMap.get(dateTime.toString().substring(4, 7)) +
      " " +
      dateTime.toString().substring(8, 21);
  
    //// FOR QUICK DATE TIME PICKER
    function goBack6Hours() {
      // if the subtracted value is negative, call go back 24hours function and
      // subtract that negative value from 24
      var hourEndIndex = 13;
      if (quickTimePicker.length == 15) {
        hourEndIndex = 12;
      }
      var tempTime = +quickTimePicker.substring(11, hourEndIndex);
      var back12Hrs = tempTime - 6;
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
      // if the subtracted value is negative, call go back 24hours function and
      // subtract that negative value from 24
      var hourEndIndex = 13;
      if (quickTimePicker.length == 15) {
        hourEndIndex = 12;
      }
      var tempTime = +quickTimePicker.substring(11, hourEndIndex);
      var back12Hrs = tempTime - 12;
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
          neighborhood
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
  
    const [search, setSearch] = useState(data);
  
    useEffect(() => {
      if (!error && !loading) {
        setSearch(data);
      }
    }, [data, error, loading]);
  
    if (networkStatus == NetworkStatus.refetch) console.log("refetching!");
    if (loading) console.log("loading");
    if (error) console.log("error: " + error.networkError);
    if (data) console.log(data);
  
    // for the map
    const [animalLat, setAnimalLat] = useState<number>(0);
    const [animalLon, setAnimalLon] = useState<number>(0);
  
    const animalOnMap = (latitude: number, longitude: number) => {
      setAnimalLat(latitude);
      setAnimalLon(longitude);
      console.log(animalLat, ", ", animalLon);
    };
    const [openMap, setOpenMap] = useState(false);
    const [open, setOpen] = useState(false);
    // for number of animals being shown
    const [numCard, setNumCard] = useState<number>(data?.animals?.length);
  
    // for getting live geolocation
    interface LocationError {
      showError: boolean;
      message?: string;
    }
  
    const onSearchChange = (e: any) => {
      const value = e.target.value.toLowerCase();
      console.log(data);
      var temp = data.animals;
      var result = temp.filter(function (animal: {
        breed: string;
        type: string;
        color: string;
      }) {
        return (
          animal.breed.toLowerCase().includes(value) ||
          animal.type.toLowerCase().includes(value) ||
          animal.color.toLowerCase().includes(value)
        );
      });
      setSearch({ animals: result });
    };
  
    function focusMe(event: any) {
      var elem = document.getElementsByClassName(" button-selected")[0];
      if (event.target.classList && event.target.classList.value.indexOf("selectable") === -1){
        const doc = document.getElementById("customDate");
        if(event.target.classList.value.indexOf("ionDatetime") === -1 || doc!.classList.value.indexOf("button-selected") === -1){
          focusMe({target: doc});
        }
      }
      else if (elem) {
        if( elem.className!==event.target.className) {
        event.target.classList += " button-selected";
        }
        elem.className = elem.className.replace(" button-selected", "");
      } else {
        event.target.classList += " button-selected";

      }
    }
  
    //TODO: Animal Dashboard Title needs to be centered
    //TODO: prepare collection of data for infinite scroll
    // can create a dictionary for the animal data
    // img, type, breed, color, location, date
    // type User = typeof initUser;
    // const initUser = {name: 'Jon'}
    //...
    //  const [user, setUser] = useState<User>(initUser);
  
    // TODO: implement the search functin
    // TODO: get the date picker to function
    // TODO: screen size fitting using css and adjust colors a bit
    // TODO: dark mode
    // TODO: create data structure to store the animal card information
    // TODO: clean up the code
    // TODO: apply changes to the other web pages
  
    // cardData and isInifiniteDisabled pertain to the infinite scroll
    // a dictionary needs to be setup for storing the animal data attributes to push onto the data set
  
    const [cardData, setData] = useState<string[]>([]);
    const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  
    const pushData = () => {
      const max = numCard + 20;
      const min = max - 20;
      const newData = [];
      for (let i = min; i < max; i++) {
        newData.push(data?.animals);
      }
  
      setData([...cardData, ...newData]);
    };
    const loadData = (animal: any) => {
      setTimeout(() => {
        pushData();
        console.log("Loaded data");
        animal.target.complete();
        if (numCard == 1000) {
          setInfiniteDisabled(true);
        }
      }, 500);
    };
  
    useIonViewWillEnter(() => {
      pushData();
    });
  
    return (
      <IonPage>
        <IonHeader className="dashboard-header">
            <IonButtons className="header-buttons">
              <div>
              <IonSearchbar
                className="searchbar-input"
                placeholder="Search pets..."
                color="light"
                autoCapitalize="true"
                onIonChange={onSearchChange}
              ></IonSearchbar>

              </div>
              <br/>
              <div className="button-div">
                
              <IonButton
                fill="solid"
                className="mobile-button customQueryMargin"
                size="small"
                color="medium"
                onClick={() => setOpen(true)}
              >
                <IonLabel> Custom Query</IonLabel>
                <IonIcon style={{ marginLeft: "5px" }} icon={calendar} />
              </IonButton>
              <IonButton
                fill="solid"
                routerLink={"/uploadPageA"}
                size="small"
                color="danger"
                className="mobile-button reportLostPet"

                slot="end"
              >
                <IonLabel> Report Lost Pet</IonLabel>
                <IonIcon style={{ marginLeft: "5px" }} icon={paw} />
              </IonButton>
              </div>
            </IonButtons>
              
        </IonHeader>
        <IonContent>
          {data && (
            <MapContainer
              className="mapContainer"
              id="mapid"
              center={[
                data.animals[0].location.lat,
                data.animals[0].location.lon,
              ]}
              zoom={17}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {!loading &&
                search?.animals
                  ?.slice(0, numCard)
                  .reverse()
                  .map((animal: any) => (
                    <Marker position={[animal.location.lat, animal.location.lon]}>
                      <Popup>
                        {animal.files !== undefined && animal.files.length !== 0 && (
                          // eslint-disable-next-line jsx-a11y/alt-text
                          <img
                            style={{
                              height: 170,
                              width: 320,
                            }}
                            src={
                              "https://nsf-scc1.isis.vanderbilt.edu/file/animal/" +
                              animal._id +
                              "/" +
                              animal.files[0]
                            }
                          ></img>
                        )}
  
                        <h5>
                          {" "}
                          <b>Animal:</b> {animal.color} {animal.breed}
                        </h5>
  
                        <h5>
                          <b>Location:</b> {animal.neighborhood}
                        </h5>
  
                        <h5>
                          <i>
                            <b>Time Reported:</b>{" "}
                            {moment(
                              new Date(animal.createdAt)
                                .toString()
                                .substr(
                                  0,
                                  new Date(animal.createdAt)
                                    .toString()
                                    .indexOf("GMT")
                                )
                            ).format("ddd MMM YYYY h:mm:ss a") + " (CDT)"}{" "}
                          </i>
                        </h5>
                      </Popup>
                    </Marker>
                  ))}
            </MapContainer>
          )}
        </IonContent>
        <IonPopover isOpen={open} onDidDismiss={() => setOpen(false)}>
          <div className="customQueryPopup">
            <h2>
              <b>Custom Query</b>
            </h2>
            <IonButtons slot="fill">
              <button className="timeButton selectable" slot="fill" onClick={focusMe}>
                <IonLabel>Yesterday</IonLabel>
              </button>
            </IonButtons>
            <IonButtons slot="fill">
              <button className="timeButton timeBottomLeft selectable" slot="start" onClick={focusMe}>
                <IonLabel>Past 12 Hrs</IonLabel>
              </button>
              <button className="timeButton timeBottomRight selectable" onClick={focusMe}>
                <IonLabel>Past 6 Hrs</IonLabel>
              </button>
            </IonButtons>
            <h5>
              {" "}
              <b>Or</b>{" "}
            </h5>
            <IonButtons slot="fill" >
              <div className="calendarButton selectable" id="customDate" slot="fill" onClick={focusMe}>
                <h6 className="calendarTitle">Start Date</h6>
                <IonDatetime
                  className="ionDatetime"
                  value={new Date().toISOString()}
                  picker-format="MMM-DD-YYYYThh:mm A"
                  display-format="MMM DD, YYYY hh:mm A"
                  // placeholder="Start Date"
                />
                <h6 className="calendarTitle">End Date</h6>
                <IonDatetime
                  className="ionDatetime"
                  value={new Date().toISOString()}
                  picker-format="MMM-DD-YYYYThh:mm A"
                  display-format="MMM DD, YYYY hh:mm A"
                  // placeholder="Start Date"
                />
              </div>
            </IonButtons>
            <IonButtons slot="fill">
              <button
                className="submitButton"
                slot="fill"
                onClick={() => setOpen(false)}
              >
                <IonLabel>VIEW ANIMALS</IonLabel>
              </button>
            </IonButtons>
          </div>
        </IonPopover>
      </IonPage>
    );
  };
  export default AnimalDashboard;
  