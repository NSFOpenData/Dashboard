import {
    IonContent,
    IonHeader,
    IonPage,
    IonButton,
    IonButtons,
    IonDatetime,
    IonItem,
    IonLabel,
    IonIcon,
    IonSearchbar,
    IonList,
    IonPopover,
    IonSlides,
    IonSlide,
    useIonPicker,
    useIonViewWillEnter,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  } from "@ionic/react";
  import React, { useState, useEffect, FunctionComponent, useRef } from "react";
  import "./AnimalDashboard.css";
  import moment from "moment";
  import PropTypes, {InferProps} from "prop-types";
  
  /* GraphQL for API Calls */
  import { gql, NetworkStatus, useQuery } from "@apollo/client";
  
  // icons
  import {
    calendar,
    paw,
    navigate,
  } from "ionicons/icons";
  import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
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
      if(data) {
        setAnimalLat(data.animals[0].location.lat);
        setAnimalLon(data.animals[0].location.lon);
      }
    }, [data, error, loading]);
  
    if (networkStatus == NetworkStatus.refetch) console.log("refetching!");
    if (loading) console.log("loading");
    if (error) console.log("error: " + error.networkError);
    if (data) console.log(data);
  
    // for the map
    const [animalLat, setAnimalLat] = useState<number>(36.1627);
    const [animalLon, setAnimalLon] = useState<number>(-86.7816);
  
    const animalOnMap = (latitude: number, longitude: number) => {
      setAnimalLat(latitude);
      setAnimalLon(longitude);
      console.log(animalLat, ", ", animalLon);
    };
    const [openMap, setOpenMap] = useState(false);
    const [open, setOpen] = useState(false);
    // for number of animals being shown
    const [numCard, setNumCard] = useState<number>(data?.animals?.length);
  
    const [swiper, setSwiper] = useState<any>({});
    const init = async function(this: any) {
      setSwiper(await this.getSwiper());
  };
    // for getting live geolocation
    interface LocationError {
      showError: boolean;
      message?: string;
    }
  
    const onSearchChange = (e: any) => {
      const value = e.target.value.toLowerCase();
      console.log(data);
      setSearch(({
        animals: data.animals.filter(function (animal: any) {
          return (
            animal.breed.toLowerCase().includes(value) ||
            animal.type.toLowerCase().includes(value) ||
            animal.color.toLowerCase().includes(value)
          );
        }),
        }));
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
    const [map, setMap] = useState(null);
  
    const pushData = () => {
      const max = numCard + 20;
      const min = max - 20;
      const newData = [];
      for (let i = min; i < max; i++) {
        newData.push(data?.animals);
      }
  
      setData([...cardData, ...newData]);
    };
    const slides = useRef<any>(null);
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

    const onBtnClicked = async (direction: string) => {
      if (slides.current) {
        const swiper = await slides.current.getSwiper();
        if (direction === "next") {
          console.log(swiper)
          swiper.slideNext();
        } else if (direction === "prev") {
          swiper.slidePrev();
        }

      }
    };
  
    const propTypes = {
      arr: PropTypes.array.isRequired,
    };
    type Props = InferProps<typeof propTypes>;
    const UpdateLoc: FunctionComponent<Props> = ({arr}) => {
      const map = useMap();
      console.log(arr);
      map.setView([arr[0], arr[1]],map.getZoom());
      return null;
    };
    UpdateLoc.defaultProps = {
      arr: []
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
          <div className="flex-container">
          <div className="flex-child">
  <IonList className="card-list">

{!loading && search && search
    ?.animals
    ?.slice(0, numCard)
    .reverse()
    .map((animal:any, index: any) => (

            type.length === 0 && (
                <div key={JSON.stringify(animal)}><IonItem className="centerItem" button onClick={() => {
                  setAnimalLat(animal.location.lat);
                  setAnimalLon(animal.location.lon);
                }}>
                        < div key = {index}>{animal.files !== undefined && animal.files.length !== 0 && (
                            // eslint-disable-next-line jsx-a11y/alt-text
                            <IonSlides style={{width: '400px', backgroundColor: 'black'}} ref={slides}>
                              {animal.files.map((item: any, index: number) => <IonSlide key={index} tabIndex={index}><button onClick={() => onBtnClicked("next")}><IonIcon name="arrow-back"></IonIcon></button><img
                            style={{
                                minHeight: 170,
                                maxHeight: 170,
                                minWidth: 320,
                                maxWidth: 320,
                            }}
                            src={"https://nsf-scc1.isis.vanderbilt.edu/file/" + item
                            }
                            alt="animal"
                            ></img></IonSlide>)}
                            </IonSlides>
                            
                        )}
                        <div style={{padding: '6px 16px'}}>
                            <h5> Animal: {animal.color} {" "} {animal.breed}</h5>
                             
                            <h5>Location: {animal.neighborhood}</h5>

                            <h5>
                                Time Reported:{" "} {moment(new Date(animal.createdAt)
                                    .toString()
                                    .substr(0, new Date(animal.createdAt).toString().indexOf("GMT"))).format("ddd MMM YYYY h:mm:ss a") + " (CDT)"}{" "}
                            </h5>
                        </div></div>
                       
                </IonItem>
                <hr style={{backgroundColor: 'grey', opacity: .5, margin: 0}}/>
                </div>)
    ))}
    {data && (
      <IonInfiniteScroll
        threshold="100px"
        disabled={isInfiniteDisabled}
        onIonInfinite={loadData}
      >
        <IonInfiniteScrollContent
          loadingSpinner="bubbles"
          loadingText="Loading more data..."
        />
      </IonInfiniteScroll>
    )
    }
</IonList>
</div>
          {data && (
            <div className="flex-child">
              <MapContainer
              className="map-container"
              id="mapid"
              center={[
                animalLat, animalLon
              ]}
              zoom={17}
              scrollWheelZoom={true}
            >
              <UpdateLoc arr={[animalLat, animalLon]}/>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {!loading &&
                search?.animals
                  ?.slice(0, numCard)
                  .reverse()
                  .map((animal: any, index: any) => (
                    <Marker key = {index} position={[animal.location.lat, animal.location.lon]} eventHandlers={{
                      click: () => {
                          setAnimalLat(animal.location.lat);
                          setAnimalLon(animal.location.lon);
                        }
                    }}>
                      
                    </Marker>
                  ))}
            </MapContainer>
            </div>
            
          )}
          </div>
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
  