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
    IonSelect,
    IonSelectOption,
    IonAvatar,
    IonCard,
    IonCardSubtitle,
    IonCardContent,
    IonSegment,
    IonSegmentButton,
    IonIcon,
    IonSearchbar,
    IonList,
    IonPopover,
    useIonPicker,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    useIonViewWillEnter
} from "@ionic/react";
import React, { useState } from "react";
import "./AnimalDashboard.css";
import TopMenu from './../components/TopMenu';
import moment from "moment";

/* GraphQL for API Calls */
import { gql, NetworkStatus, useQuery } from "@apollo/client";

// icons
import { cloudUploadOutline, calendar, paw, locate, map, navigate } from "ionicons/icons";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const AnimalDashboard: React.FC = () => {
    const [selectedStartDate,
        setSelectedStartDate] = useState<string>("2021-06-01T13:47:20.789");
    const [selectedEndDate,
        setSelectedEndDate] = useState<string>("2021-06-01T13:47:20.789");

    // for USER input on dropdown menus
    const [pastTime,
        setPastTime] = useState<string>("");

    // for the date and time selection
    const [advancedDate,
        setAdvancedDate] = useState<boolean>(false);
    const [type,
        setType] = useState<string>("");

    const [present] = useIonPicker();
    const [value,
        setValue] = useState('');

    // for date selection and readability
    let dateTime = new Date();
    let myMap = new Map([
        [
            "Jan", "01"
        ],
        [
            "Feb", "02"
        ],
        [
            "Mar", "03"
        ],
        [
            "Apr", "04"
        ],
        [
            "May", "05"
        ],
        [
            "Jun", "06"
        ],
        [
            "Jul", "07"
        ],
        [
            "Aug", "08"
        ],
        [
            "Sep", "09"
        ],
        [
            "Oct", "10"
        ],
        [
            "Nov", "11"
        ],
        ["Dec", "12"]
    ]);
    var startDate = "";
    var endDate = "";
    var quickTimePicker = "";
    var quickTimePicker = myMap.get(dateTime.toString().substring(4, 7)) + " " + dateTime
        .toString()
        .substring(8, 21);

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
            quickTimePicker = quickTimePicker.substring(0, 10) + " " + newHour.toString() + ":" + quickTimePicker.substring(hourEndIndex + 1, quickTimePicker.length);
        } else {
            quickTimePicker = quickTimePicker.substring(0, 10) + " " + back12Hrs.toString() + ":" + quickTimePicker.substring(hourEndIndex + 1, quickTimePicker.length);
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
            quickTimePicker = quickTimePicker.substring(0, 10) + " " + newHour.toString() + ":" + quickTimePicker.substring(hourEndIndex + 1, quickTimePicker.length);
        } else {
            quickTimePicker = quickTimePicker.substring(0, 10) + " " + back12Hrs.toString() + ":" + quickTimePicker.substring(hourEndIndex + 1, quickTimePicker.length);
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

        quickTimePicker = quickTimePicker.substring(0, 3) + day.toString() + quickTimePicker.substring(5, quickTimePicker.length);
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

    const { loading, data, error, refetch, networkStatus } = useQuery(ANIMAL_POST_QUERY, {
        fetchPolicy: "no-cache",
        notifyOnNetworkStatusChange: true
    });

    if (networkStatus == NetworkStatus.refetch)
        console.log("refetching!");
    if (loading)
        console.log("loading");
    if (error)
        console.log("error: " + error.networkError);

    // for the map
    const [animalLat,
        setAnimalLat] = useState<number>(0);
    const [animalLon,
        setAnimalLon] = useState<number>(0);

    const animalOnMap = (latitude: number, longitude: number) => {
        setAnimalLat(latitude);
        setAnimalLon(longitude);
        console.log(animalLat, ", ", animalLon);
    };
    const [openMap, setOpenMap] = useState(false);
    // for number of animals being shown
    const [numCard,
        setNumCard] = useState<number>(data
            ?.animals
            ?.length);

    // for getting live geolocation
    interface LocationError {
        showError: boolean;
        message?: string;
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
    const [animalSearch, setAnimalSearch] = useState('');

    const formatSearch = (input: string) => {
        setAnimalSearch(input.toLowerCase())
    }



    const [cardData,
        setData] = useState<string[]>([]);
    const [isInfiniteDisabled,
        setInfiniteDisabled] = useState(false);

    const pushData = () => {
        const max = numCard + 20;
        const min = max - 20;
        const newData = [];
        for (let i = min; i < max; i++) {
            newData.push(data?.animals);
        }

        setData([
            ...cardData,
            ...newData
        ]);
    }
    const loadData = (animal: any) => {
        setTimeout(() => {
            pushData();
            console.log('Loaded data');
            animal.target.complete();
            if (numCard == 1000) {
                setInfiniteDisabled(true);
            }
        }, 500);
    }

    useIonViewWillEnter(() => {
        pushData();
    });


    return (

        <IonPage >

            {/* generalized date string formats! */}
            {/* {
          (quickTimePicker =
            myMap.get(dateTime.toString().substring(4, 7)) +
            " " +
            dateTime.toString().substring(8, 21))
        }
        {
          (startDate =
            selectedStartDate.substring(5, 7) +
            " " +
            selectedStartDate.substring(8, 10) +
            " " +
            selectedStartDate.substring(0, 4) +
            " " +
            selectedStartDate.substring(11, 16))
        }
        {
          (endDate =
            selectedEndDate.substring(5, 7) +
            " " +
            selectedEndDate.substring(8, 10) +
            " " +
            selectedEndDate.substring(0, 4) +
            " " +
            selectedEndDate.substring(11, 16))
        } */}

            {/* <IonLoading isOpen={loading} message="Loading..." /> */}
            {/* <IonButton color="light" expand="full" disabled={true}>Animal Dashboard</IonButton> */}


            <IonContent fullscreen={false}>
                <div className="centerItem">
                    <IonHeader  >

                        <IonToolbar color="white" class="ion-padding">
                            <IonButtons slot="start">
                                <IonButton slot="start" color="white" size="small">
                                    <IonSearchbar
                                        className="searchbar-input"
                                        placeholder="search pet"
                                        color="light"
                                        autoCapitalize="true"
                                        value={animalSearch}>

                                    </IonSearchbar>
                                </IonButton>

                                <IonButton
                                     fill = "solid"
                                    routerLink={"/uploadPageA"}
                                    size="small" className = "reportLostPet" >
                                    <IonLabel> Report Lost Pet </IonLabel>
                                    <IonIcon icon = {paw}>
                                       
                                    </IonIcon>
                                </IonButton>

                                <IonButton
                                    className="customQueryMargin"
                                    size="small"
                                    onClick={() => present([
                                        {

                                            name: 'number',
                                            options: [
                                                {
                                                    text: 'One',
                                                    value: 1
                                                }, {
                                                    text: 'Two',
                                                    value: 2,
                                                }, {
                                                    text: 'Three',
                                                    value: 3
                                                },
                                                {
                                                    text: 'Four',
                                                    value: 4
                                                }
                                            ]
                                        }, {
                                            name: 'time',
                                            options: [
                                                {
                                                    text: 'Day(s)',
                                                    value: 'day'
                                                }, {
                                                    text: 'Week(s)',
                                                    value: 'week'
                                                }, {
                                                    text: 'Month(s)',
                                                    value: 'month'
                                                },
                                                {
                                                    text: 'Year(s)',
                                                    value: 'year'

                                                }

                                            ]
                                        }
                                    ], [
                                        {
                                            text: 'Confirm',
                                            handler: (selected) => {
                                                setValue(`${selected.number.value}, ${selected.time.value}`)
                                            }
                                        }
                                    ])}>

                                    <IonIcon class="calendarIcon" size="large" slot="icon-only" icon={calendar}></IonIcon>

                                </IonButton>
                            </IonButtons>

                            {/* {advancedDate && (
                            <div>
                                <IonSegment color="secondary" value="favorite">

                                    <IonSegmentButton value="twentyfourhr" onClick={() => goBack24Hours()}>
                                        <IonLabel>Yesterday</IonLabel>
                                    </IonSegmentButton>


                                    <IonSegmentButton value="twelvehr" onClick={() => goBack12Hours()}>
                                        <IonLabel>Past 12 Hrs</IonLabel>
                                    </IonSegmentButton>


                                    <IonSegmentButton value="sixhr" onClick={() => goBack6Hours()}>
                                        <IonLabel>Past 6 Hrs</IonLabel>
                                    </IonSegmentButton>
                                </IonSegment>

                                <div>
                                    <h6>

                                        <IonDatetime
                                            displayFormat="MMM DD, YYYY HH:mm"
                                            min="1990"
                                            max="2030"
                                            value={selectedStartDate}
                                            onIonChange={(e) => setSelectedStartDate(e.detail.value !)}></IonDatetime>
                                    </h6>
                                    <IonAvatar></IonAvatar>
                                    <h6>

                                        <IonDatetime
                                            displayFormat="MMM DD, YYYY HH:mm"
                                            min="1990"
                                            max="2030"
                                            value={selectedEndDate}
                                            onIonChange={(e) => setSelectedEndDate(e.detail.value !)}></IonDatetime>
                                    </h6>
                                </div>
                            </div>
                        )} */}
                        </IonToolbar>

                    </IonHeader>
                </div>




                <IonList>

                    {!loading && data
                        ?.animals
                        ?.slice(0, numCard)
                        .reverse()
                        .map((animal: any) => (

                            <div className="centerItem">

                                {type.length === 0 && (
                                    <IonItem lines="none">
                                        <IonCard

                                            color="white"
                                        >
                                            {animal.files !== undefined && animal.files.length !== 0 && (
                                                // eslint-disable-next-line jsx-a11y/alt-text
                                                <img
                                                    style={{
                                                        height: 170,
                                                        width: 320
                                                    }}
                                                    src={"https://nsf-scc1.isis.vanderbilt.edu/file/animal/" + animal._id + "/" + animal.files[0]
                                                    } ></img>
                                            )}
                                            <IonCardContent >

                                                <h5> Animal: {animal.color} {" "} {animal.breed}`</h5>

                                                <h5>Location: {animal.neighborhood}
                                                    <IonButton  size = "small" fill="clear" color="white" onClick={() => {
                                                        setOpenMap(true);
                                                        animalOnMap(animal.location.lat, animal.location.lon)}}

                                                    >
                                                        <IonPopover  showBackdrop = {true} isOpen={openMap} >

                                                            {animalLat !== 0 && animalLon !== 0 && (
                                                                <MapContainer
                                                                    style={{
                                                                        height: "300px",
                                                                        width: "300px"
                                                                    }}
                                                                    id="mapid"
                                                                    center={[36.1627, -86.7816]}
                                                                    zoom={12.5}
                                                                    scrollWheelZoom={false}>
                                                                    <TileLayer

                                                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                                                    <Marker position={[animalLat, animalLon]}>
                                                                        <Popup>Animal Location:</Popup>
                                                                    </Marker>
                                                                </MapContainer>
                                                            )}

                                                        </IonPopover><IonIcon className="mapIcon" icon={navigate} > </IonIcon></IonButton>

                                                </h5>

                                                <h5>
                                                    Time Reported:{" "} {moment(new Date(animal.createdAt)
                                                        .toString()
                                                        .substr(0, new Date(animal.createdAt).toString().indexOf("GMT"))).format("ddd MMM YYYY h:mm:ss a") + " (CDT)"}{" "}
                                                </h5>
                                            </IonCardContent>
                                        </IonCard>
                                    </IonItem>
                                )}
                            </div>
                        ))}
                </IonList>



                <IonInfiniteScroll
                    onIonInfinite={loadData}
                    threshold="100px"
                    disabled={isInfiniteDisabled}>
                    <IonInfiniteScrollContent
                        loadingSpinner="bubbles"
                        loadingText="Loading more data..."></IonInfiniteScrollContent>
                </IonInfiniteScroll>
                <div className="header" slot="fixed"></div>
            </IonContent>

        </IonPage>


    );


};
export default AnimalDashboard
