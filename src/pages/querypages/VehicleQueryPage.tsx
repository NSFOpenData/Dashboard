import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonButton, IonText, IonDatetime, IonRow, IonItem, IonCol, IonLabel, IonInput, IonSelectOption, IonSelect, IonAvatar, IonSegment, IonSegmentButton, IonChip, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonCardSubtitle, IonLoading, IonList, IonItemDivider } from '@ionic/react';
import React, {useState, Component, useRef} from 'react';
import './VehicleQueryPage.css';

import {gql, useMutation, useQuery} from '@apollo/client';


function showResult(){
    
}

const VehicleQueryPage: React.FC = () => {
    
    // trying without location for now
    const FIND_VEHICLE_QUERY = gql`
        query FindVehicles(
            $make: String!
        ){
            findVehicles(params: {make: $make}){
                _id
                make
                model
                location
                files
            }
        }
    `;

    // Vehicle Related USER INPUT Variables:
    const [vehicleCompany, setVehicleCompany] = useState<string>();
    const [vehicleModel, setVehicleModel] = useState<string>();
    const [vehicleColor, setVehicleColor] = useState<string>();
    const [vehicleApproxLocation, setVehicleApproxLocation] = useState<string>();
    const [vehicleLicense, setVehicleLicense] = useState<string>();

    const { loading, data, error } = useQuery(FIND_VEHICLE_QUERY, {
        variables: {
            make: vehicleCompany, 
            // model: vehicleModel,
            // location: 
            // color: vehicleColor,
            // license: vehicleLicense,
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
            <IonButton expand="full" disabled={true}>
                Vehicle Advanced Search Query
            </IonButton>
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
                        <h5>{vehicle.model + "__"}</h5>
                    ))}
                    
                </IonItem>
                //  routerLink={'/queryResultPage'}
            }      
        </IonContent>
      </IonPage >
    );
  
  }

  // vehicle related variables
//   export {vMake, vModel, vColor, vApproxLoc, vLicense}
  // animal related variables
  export {}
  export default VehicleQueryPage;
