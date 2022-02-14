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
import React, { useState, useRef, useEffect } from "react";
import "./UploadPageAnimal.css";

// icons
import { chevronBackOutline } from "ionicons/icons";
import { useHistory } from "react-router";

// /* GraphQL for API Calls */
import { gql, useMutation, useQuery, useLazyQuery } from "@apollo/client";

// getting live geolocation
import { Geolocation, Geoposition } from "@ionic-native/geolocation";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const CREATE_ANIMAL = gql`
  mutation (
    $neighborhood: String
    $color: String
    $breed: String
    $type: String
    $location: LocationInput!
    $files: [String!]
  ) {
    createAnimal(
      animal: {
        neighborhood: $neighborhood
        color: $color
        breed: $breed
        type: $type
        location: $location
        files: $files
      }
    ) {
      _id
      neighborhood
    }
  }
`;

// const UNIQUE_ID = gql`
// query (
//   $count: Int
//   ) { UniqueId {
//   getUniqueID: {
//     count: Int
//   }
// }`
const UNIQUE_ID = gql`
query UniqeId ($count: Int!){
  getUniqueID(count: $count) 
  
}`


// for uploading files
interface InternalValues {
  file: any;
}

// number of animals uploaded
var numAnimalsUploaded = 0;

const UploadPageAnimal: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    getLocation(); 
  }, []);

  type LocationInput = {
    lat: string;
    lon: string;
  };
  type FileInput = {

  }
  /* Making Animal */
  const [animalid, setAnimalId] = useState<string>("");
  const [animalCreatedAt, setAnimalCreatedAt] = useState<number>(0);
  const [animalLocation, setAnimalLocation] = useState<LocationInput | null>(
    null
  );
  const [animalNeighborhood, setAnimalNeighborhood] = useState<string>("");
  const [animalColor, setAnimalColor] = useState<string>("");
  const [animalBreed, setAnimalBreed] = useState<string>("");
  const [animalType, setAnimalType] = useState<string | null>("");
  const [imagesID, setImagesID] = useState<Array<string>>([]);
  const [fileName, setFileName] = useState<Array<string>>([]);

  var [makeAnimal, { data, loading }] = useMutation(CREATE_ANIMAL, {
    variables: {
      location: animalLocation,
      neighborhood: animalNeighborhood,
      color: animalColor,
      breed: animalBreed,
      type: animalType,
      files: fileName,
    },
    onCompleted: ({ result }) => {
      console.log(result);
      history.push("/animalDashboard");
    },
    onError: (error) => {
      console.log(error);
    }

  });

  ////* Uploading Files */
  const values = useRef<InternalValues>({
    file: false,
  });

  // get uniqueID from the uuid library in the backend
  var [getIDs, { loading, data, error, refetch, networkStatus }] = useLazyQuery(UNIQUE_ID, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      console.log(data.getUniqueID);
      setImagesID(data.getUniqueID);
      return data.getUniqueID;
    }
  });

  const makeIDQuery = async (fileLength: any) => {
    getIDs({variables: {count: fileLength}})
  }

  useEffect(()=> {
    getIDs({variables: {count: 0}})
  }, [])

  const onFileChange = async (fileChangeEvent: any) => {
    var newFileName = [];
    var getIDVals: string[] = [];
    if(refetch) {
     const checkVal = await refetch({count: fileChangeEvent.target.files.length});
     getIDVals = checkVal.data.getUniqueID;
    }

    for (var i = 0; i < fileChangeEvent.target.files.length; i++) {

      newFileName.push(`animal/${getIDVals[i]}/${fileChangeEvent.target.files[i].name}`);
    }
    values.current.file = fileChangeEvent.target.files;
    setFileName(newFileName);

    // if(!fileChangeEvent.target.files[0]) {
    //   values.current.file = false;
    //   setFileName("");
    // } else {
    //   values.current.file = fileChangeEvent.target.files;
    //   setFileName(`animal/${imagesID}/${fileChangeEvent.target.files[0].name}`);
    // }
  };

  const submitFileForm = async () => {
    
    const formData = new FormData();
    formData.append("type", "animal");
    formData.append("id", JSON.stringify(imagesID));
    // const allFiles = [];
    for (var i = 0; i < values.current.file.length; i++) {
      formData.append(
        "images",
        values.current.file[i],
        values.current.file[i].name
      );

    }
    numAnimalsUploaded = numAnimalsUploaded + 1;
    console.log("num animals added: " + numAnimalsUploaded);

    let resUrl = "http://localhost:3000/upload"
    let productionUrl = "https://nsf-scc1.isis.vanderbilt.edu/upload"
    console.log('here');
    const response = await fetch(productionUrl, {
      method: "POST",
      body: formData,
    })
    console.log(response);
    if (response.status === 200) {
      makeAnimal().catch((error) => {
        console.log(error);
      });
    } else {
      console.log("file upload failed");
    }
  };

  // live geo location
  interface LocationError {
    showError: boolean;
    message?: string;
  }

  const [geoLoading, setGeoLoading] = useState<boolean>(false);
  const [openMap, setOpenMap] = useState<boolean>(false);
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
      };
      console.log(currentLocation);
      setAnimalLocation(currentLocation);
    } catch (e) {
      // setGeoError({ showError: true, message: e.message });
      setGeoLoading(false);
    }
  };

  return (
    <IonPage className="centerItem">

      <IonContent className="profilePage signinregion ion-padding">
        <IonLoading
          isOpen={geoLoading}
          onDidDismiss={() => setGeoLoading(false)}
          message={"Getting Location..."}
        />
        

        <h1>
          Report Lost Pet
        </h1>
        <div className="signin">
        <div className="register-block">
          <h3>Type: </h3>
          <IonInput
            placeholder="Dog, Cat, Bird, etc."
            className="registerInput"
            onIonChange={(e) => setAnimalType(e.detail.value!)}
          ></IonInput>
          <h3>Breed: </h3>
          <IonInput
            placeholder="Poodle, Persian, Canary etc."
            className="registerInput"
            onIonChange={(e) => setAnimalBreed(e.detail.value!)}
          ></IonInput>
          <h3>Color: </h3>
          <IonInput
            placeholder="Black, White, Brown, etc."
            className="registerInput"
            onIonChange={(e) => setAnimalColor(e.detail.value!)}
          ></IonInput>
          <h3>Neighborhood: </h3>
          <IonInput
            placeholder="Nashville, Sylvan Park, Downtown, etc."
            className="registerInput"
            onIonChange={(e) => setAnimalNeighborhood(e.detail.value!)}
          ></IonInput>
        
          <input
            type="file"
            onChange={(event) => onFileChange(event)}
            // accept="image/*,.pdf,.doc"
            style={{marginBottom: '15px'}}
            multiple
          ></input>
        <div>
        <input type="radio" id="selectLocation1" name="selectLocation" value="1"
               checked={!openMap} onChange={() => setOpenMap(false)}/>
        <label className="locationLabel">Use Current Location</label>
        <input type="radio" className="radioRightButton" id="selectLocation2" name="selectLocation" value="2" checked={openMap} onChange={() => setOpenMap(true)}/>
        <label className="locationLabel">Select a Location</label>
      </div>
        {animalLocation && openMap && (
          <MapContainer
            id="mapid"
            center={[ parseFloat(animalLocation.lat), parseFloat(animalLocation.lon)]}
            zoom={17}
            scrollWheelZoom={false}
            whenCreated={(map: any) => {
              map.on("click", function (e: any) {
                let lat = e.latlng.lat.toString();
                let lon = e.latlng.lng.toString();
                setAnimalLocation({ lat, lon });
              })
            }}
            
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[parseFloat(animalLocation.lat),parseFloat(animalLocation.lon)]}>
              <Popup>{animalLocation.lat}</Popup>
            </Marker>
          </MapContainer>
        )}
              <IonButton
              color="danger"
              className="reportButton"
              expand="block"
              onClick={() => submitFileForm()}
              disabled={!(animalColor && animalBreed && animalType && animalNeighborhood)}
            >
              Report Lost Pet
            </IonButton>
        </div>
        </div>

          <IonButton
            color="light"
            routerLink={"/animalDashboard"}
            routerDirection="back"
            className="backButton"
          >
            <IonIcon icon={chevronBackOutline}></IonIcon>
            back
          </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default UploadPageAnimal;
export { numAnimalsUploaded };
