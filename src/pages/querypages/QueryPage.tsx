import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonButton, IonText, IonDatetime, IonRow, IonItem, IonCol, IonLabel, IonInput, IonSelectOption, IonSelect, IonAvatar, IonSegment, IonSegmentButton, IonChip, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonCardSubtitle, IonLoading, IonList, IonItemDivider } from '@ionic/react';
import React, {useState, Component, useRef} from 'react';
import './QueryPage.css';

import {gql, useMutation, useQuery} from '@apollo/client';

// Vehicle Related OUTPUT Variables:
// const [vMake, setVMake] = useState<string>();
// const [vModel, setVModel] = useState<string>();
// const [vColor, setVColor] = useState<string>();
// const [vApproxLoc, setVApproxLoc] = useState<string>();
// const [vLicense, setVLicense] = useState<string>();
    
const QueryPage: React.FC = () => {
    // choose either vehicle or animal search
    const [querySubject, setQuerySubject] = useState<string>();

    // Vehicle Related USER INPUT Variables:
    const [vehicleCompany, setVehicleCompany] = useState<string>();
    const [vehicleModel, setVehicleModel] = useState<string>();
    const [vehicleColor, setVehicleColor] = useState<string>();
    const [vehicleApproxLocation, setVehicleApproxLocation] = useState<string>();
    const [vehicleLicense, setVehicleLicense] = useState<string>();

    // Animal Related USER INPUT Variables:
    const [animalType, setAnimalType] = useState<string>();
    const [animalColor, setAnimalColor] = useState<string>();
    const [animalApproxLocation, setAnimalApproxLocation] = useState<string>();

    const FIND_VEHICLE_QUERY = gql`
        query (
            $make: String!
            $model: String!
            $location: [String!]
            $color: String!
            $license: String!
        ){
            findVehicles(params: {make: $make, model: $model, location: $location, color: $color, license: $license}){
                _id
                make
                model
                location
                files
            }
        }
    `;

//   const Result = () => {
//       const { loading, data, error } = useQuery(FIND_VEHICLE_QUERY, {
//             variables: {
//                 make: vehicleCompany, 
//                 model: vehicleModel,
//                 // location: 
//                 color: vehicleColor,
//                 license: vehicleLicense,
//             }
//      }); 
//      if(loading){
//          return <p>Loading...</p>
//      } else {
//         {data?.findVehicles?.map((vehicle: any) => (
//             // console.log(vehicle.license)
//             <IonItem lines="none">
//                 <h5>{vehicle.model}</h5>
//             </IonItem>
//         ))}
//      }
//   }

    const { loading, data, error } = useQuery(FIND_VEHICLE_QUERY, {
        variables: {
            make: vehicleCompany, 
            model: vehicleModel,
            // location: 
            color: vehicleColor,
            license: vehicleLicense,
        }
    }); 

    if (loading) console.log("loading");
    if (error) console.log("error");

    return (
      <IonPage>
        <IonHeader>
            <IonToolbar>
            <IonRow>
                <IonAvatar></IonAvatar>
                <IonAvatar></IonAvatar>
                <img className="logo" src="https://cps-iot-week2021.isis.vanderbilt.edu/images/VUISISlogo.png"></img>
            </IonRow>
            </IonToolbar>
        </IonHeader>
  
        <IonContent className="profilePage"> 
            <h5 style={{fontWeight: "bold"}}>| Advnaced Query Page</h5>
            {/* <IonAvatar></IonAvatar>        */}
            <IonItem>
                <IonLabel>What are you searching for?</IonLabel>
                <IonSelect value={querySubject} onIonChange={event => setQuerySubject(event.detail.value)}>
                <IonSelectOption value="Vehicle">Vehicle</IonSelectOption>
                <IonSelectOption value="Animal">Animal</IonSelectOption>
                </IonSelect>
            </IonItem>

            {/* car company, model, color, and approx. location, and even license plate info */}
            { querySubject == "Vehicle" &&
                <IonContent>
                    <IonItem>
                        <IonLabel>Please Type: </IonLabel>
                        <IonInput value={vehicleCompany} 
                        placeholder="Vehicle Manufacturer/Company Name"
                        onIonChange={event => setVehicleCompany(event.detail.value!)}></IonInput>
                    </IonItem>   
                    <IonItem>
                        <IonLabel>Please Type: </IonLabel>
                        <IonInput value={vehicleModel} 
                        placeholder="Vehicle Model Name"
                        onIonChange={event => setVehicleModel(event.detail.value!)}></IonInput>
                    </IonItem> 
                    <IonItem>
                        <IonLabel>Please Type: </IonLabel>
                        <IonInput value={vehicleColor} 
                        placeholder="Vehicle Color"
                        onIonChange={event => setVehicleColor(event.detail.value!)}></IonInput>
                    </IonItem>     
                    <IonItem>
                        <IonLabel>Please Type: </IonLabel>
                        <IonInput value={vehicleApproxLocation} 
                        placeholder="Vehicle Approximate Community Location"
                        onIonChange={event => setVehicleApproxLocation(event.detail.value!)}></IonInput>
                    </IonItem> 
                    <IonItem>
                        <IonLabel>Please Type: </IonLabel>
                        <IonInput value={vehicleLicense} 
                        placeholder="Vehicle License"
                        onIonChange={event => setVehicleLicense(event.detail.value!)}></IonInput>
                    </IonItem>
                    {
                        (vehicleCompany || vehicleColor || vehicleModel || vehicleColor || vehicleApproxLocation || vehicleLicense) &&
                        <IonItem>
                            <IonButton color="primary" expand="block">Search</IonButton>
                            {!loading && data.findVehicles.map((vehicle: any) => (
                                <h5>{vehicle.model}</h5>
                            ))}
                        </IonItem>
                        //  routerLink={'/queryResultPage'}
                    }      

                    
                </IonContent>         
            }

            { querySubject == "Animal" &&
                <IonContent>
                <IonItem>
                    <IonLabel>Please Type: </IonLabel>
                    <IonInput value={animalType} 
                    placeholder="Animal Type (i.e. Dog, Cat, etc.)"
                    onIonChange={event => setAnimalType(event.detail.value!)}></IonInput>
                </IonItem>   
                <IonItem>
                    <IonLabel>Please Type: </IonLabel>
                    <IonInput value={animalColor} 
                    placeholder="Animal Color"
                    onIonChange={event => setAnimalColor(event.detail.value!)}></IonInput>
                </IonItem> 
                <IonItem>
                    <IonLabel>Please Type: </IonLabel>
                    <IonInput value={animalApproxLocation} 
                    placeholder="Animal Approximate Community Location"
                    onIonChange={event => setAnimalApproxLocation(event.detail.value!)}></IonInput>
                </IonItem>     
                {
                    (animalType || animalColor || animalApproxLocation) &&
                    <IonButton color="primary" expand="block" routerLink={'/queryResultPage'}>Search</IonButton>
                }      
            </IonContent>         
            }
        </IonContent>
      </IonPage >
    );
  
  }

  // vehicle related variables
//   export {vMake, vModel, vColor, vApproxLoc, vLicense}
  // animal related variables
  export {}
  export default QueryPage;
