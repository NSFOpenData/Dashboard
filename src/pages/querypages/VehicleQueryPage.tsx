import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonButton, IonText, IonDatetime, IonRow, IonItem, IonCol, IonLabel, IonInput, IonSelectOption, IonSelect, IonAvatar, IonSegment, IonSegmentButton, IonChip, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonCardSubtitle, IonLoading, IonList, IonItemDivider } from '@ionic/react';
import React, {useState, Component, useRef, useEffect} from 'react';
import './VehicleQueryPage.css';

import {gql, useLazyQuery, useMutation, useQuery} from '@apollo/client';

const VehicleQueryPage: React.FC = () => {
    
    type LocationInput = {
        lat: String
        lon: String
        name: String
    };

    // trying without location for now
    const FIND_VEHICLE_QUERY = gql`
        query FindVehicles(
            $make: [String!]
            $model: [String!]
            $color: [String!]
            $license: [String!]
            $location: LocationInput
        ){
            findVehicles(params: {make: $make, model: $model, location: $location, color: $color, license: $license}){
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
            }
        }
    `;

    // Vehicle Related USER INPUT Variables:
    const [vehicleCompany, setVehicleCompany] = useState<string | null>();
    const [vehicleCompanyArray, setVehicleCompanyArray] = useState<string[]>();

    const [vehicleModel, setVehicleModel] = useState<string | null>();
    const [vehicleModelArray, setVehicleModelArray] = useState<string[]>();

    const [vehicleColor, setVehicleColor] = useState<string| null>();
    const [vehicleColorArray, setVehicleColorArray] = useState<string[]>();

    const [vehicleLicense, setVehicleLicense] = useState<string| null>();
    const [vehicleLicenseArray, setVehicleLicenseArray] = useState<string[]>();

    const [vehicleApproxLocation, setVehicleApproxLocation] = useState<LocationInput | null>();

    const onCompanyChange = (company: string) => {
        setVehicleCompany(company);

        if (company?.indexOf(",") == -1) {
            var tempArr: string[] = [company];
            setVehicleCompanyArray(tempArr);
        }
        else if (company?.indexOf(",") !== -1) {
            setVehicleCompanyArray(company?.split(", ", 10));
        }
    }

    const onModelChange = (model: string) => {
        setVehicleModel(model);

        if (model?.indexOf(",") == -1) {
            var tempArr: string[] = [model];
            setVehicleModelArray(tempArr);
        }
        else if (model?.indexOf(",") !== -1) {
            setVehicleModelArray(model?.split(", ", 10));
        }
    }

    const onColorChange = (color: string) => {
        setVehicleColor(color);

        if (color?.indexOf(",") == -1) {
            var tempArr: string[] = [color];
            setVehicleColorArray(tempArr);
        }
        else if (color?.indexOf(",") !== -1) {
            setVehicleColorArray(color?.split(", ", 10));
        }
    }

    const onLicenseChange = (license: string) => {
        setVehicleLicense(license);

        if (license?.indexOf(",") == -1) {
            var tempArr: string[] = [license];
            setVehicleLicenseArray(tempArr);
        }
        else if (license?.indexOf(",") !== -1) {
            setVehicleLicenseArray(license?.split(", ", 10));
        }
    }

    const [getSearchResults, { loading, data, error }] = useLazyQuery(FIND_VEHICLE_QUERY, {
        variables: {
            make: vehicleCompanyArray, 
            model: vehicleModelArray,
            location: vehicleApproxLocation,
            color: vehicleColorArray,
            license: vehicleLicenseArray,
        }, 
        
        fetchPolicy: "network-only"
        // onCompleted: ({result}) => {
        //     console.log(result);
        // }
    }); 
    
    useEffect(() => {
        getSearchResults();
    }, [vehicleCompany, vehicleModel, vehicleColor, vehicleLicense]);

    // if (loading) console.log("loading");
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
  
        <IonContent className="ion-padding"> 
            <IonButton expand="full" disabled={true}>
                Vehicle Advanced Search Query
            </IonButton>
            <IonItem>
                <IonLabel>Please Type: </IonLabel>
                <IonInput value={vehicleCompany} 
                placeholder="Vehicle Manufacturer/Company Name"
                onIonChange={event => onCompanyChange(event.detail.value!)}></IonInput>
            </IonItem>   
            <IonItem>
                <IonLabel>Please Type: </IonLabel>
                <IonInput value={vehicleModel} 
                placeholder="Vehicle Model Name"
                onIonChange={event => onModelChange(event.detail.value!)}></IonInput>
            </IonItem> 
            <IonItem>
                <IonLabel>Please Type: </IonLabel>
                <IonInput value={vehicleColor} 
                placeholder="Vehicle Color"
                onIonChange={event => onColorChange(event.detail.value!)}></IonInput>
            </IonItem>     
            <IonItem>
                <IonLabel>Please Type: </IonLabel>
                <IonInput value={vehicleLicense} 
                placeholder="Vehicle License"
                onIonChange={event => onLicenseChange(event.detail.value!)}></IonInput>
            </IonItem>
            {/* <IonItem>
                <IonLabel>Please Type: </IonLabel>
                <IonInput value={vehicleApproxLocation} 
                placeholder="Vehicle Approximate Community Location"
                onIonChange={event => setVehicleApproxLocation(event.detail.value!)}></IonInput>
            </IonItem>  */}
            
            {
                (vehicleCompany || vehicleColor || vehicleModel || vehicleColor || vehicleApproxLocation || vehicleLicense) &&
                <IonContent>
                    {/* <IonButton color="primary" expand="block">Search</IonButton> */}
                    {!loading && data.findVehicles.map((vehicle: any) => (
                        // console.log(vehicle)
                        <IonCard button={false} color="light">
                           <IonCardContent>
                             <h5>Manufacturer: {vehicle.make}</h5>
                             <h5>Model: {vehicle.model}</h5>
                             <h5>Color: {vehicle.color}</h5>
                             <h5>Location: [ {vehicle.location.lat}, {vehicle.location.lon} ]</h5>
                             {/* <h5>Time: {JSON.parse(vehicle).time}</h5>      */}
                             <h5>License Plate: {vehicle.license} </h5>           
                           </IonCardContent>
                       </IonCard>
                    ))}
                    
                </IonContent>
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
