
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonButton, IonText, IonDatetime, IonRow, IonItem, IonCol, IonLabel, IonInput, IonSelectOption, IonSelect, IonAvatar, IonSegment, IonSegmentButton, IonChip, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonCardSubtitle, IonLoading } from '@ionic/react';
import { Datepicker } from '@mobiscroll/react';
import React, {useState, Component, useRef} from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './LicenseDashboard.css';

import { Plugins, CameraResultType } from '@capacitor/core';

/* Reactive Google Map */
import { ReactiveBase, SingleList } from '@appbaseio/reactivesearch';
import { ReactiveGoogleMap, ReactiveOpenStreetMap } from '@appbaseio/reactivemaps';

/* PersonalInfo For Privilege Attribute */
import PersonalInfo from './PersonalInfo'

/* GraphQL for API Calls */
import {gql, useQuery} from '@apollo/client';
import { useHistory } from 'react-router';

const { Camera } = Plugins;

interface InternalValues {
  file: any;
}

let files: any[] = [];

const LicenseDashboard: React.FC = () => {
  const [selectedStartDate, setSelectedStartDate] = useState<string>('2021-06-01T13:47:20.789');
  const [selectedEndDate, setSelectedEndDate] = useState<string>('2021-06-01T13:47:20.789');
  const [photo, setPhoto] = useState("");
  let individualCardPhotoSource = [];

  const VEHICLE_POST_QUERY = gql`
    query getAll{
      vehicles {
        location,
        model,
        make,
        color,
        license
      }
    }
  `;

  const { loading, data, error } = useQuery(VEHICLE_POST_QUERY);

  const mapProps = {
    dataField: "location",
    defaultMapStyle: "Light Monochrome",
    defaultZoom: 13.1,
    react: {
      and: "places"
    },
    showMapStyles: true,
  }; // for other properties: https://opensource.appbase.io/reactive-manual/map-components/reactivegooglemap.html

  /* Uploading Files */
  const values = useRef<InternalValues>({
      file: false,
  });

  const onFileChange = (fileChangeEvent: any) => {
      files = Array.from(fileChangeEvent.target.files);
      
      {files.map((file: any) => (
          // console.log(vehicle.license)
          console.log(file)
          
      ))}
  };

  const getPicture = async () => {
    // take phot with Camera - it's editable as well
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    var imageUrl = image.webPath;
    console.log(imageUrl);
    // Can be set to the src of an image now
    setPhoto(imageUrl!);

    // IMPORTANT: Uncomment the below once DB is set up
    // submitForm();
  }

  /* Submitting to the Server */
  const submitForm = async () => {
    if (!values.current.file) {
      return false;
    }

    let formData = new FormData();

    formData.append("photo", values.current.file, values.current.file.name);

    try {
      const response = await fetch("http://localhost:8100/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonRow>
            <IonTitle></IonTitle>
            <img style={{ alignContent: "center", height: 70}} src="https://cps-iot-week2021.isis.vanderbilt.edu/images/VUISISlogo.png"></img>
            <IonTitle></IonTitle>
          </IonRow>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonLoading isOpen={loading} message="Loading.." />

        <IonButton color="primary" expand="full" disabled={true}>License Dashboard</IonButton>
        
        <IonTitle>
            <IonText>
              <h5 style={{fontWeight: "bold"}}>Upload/Retrieve Data:</h5>
            </IonText>
            {/* 
            <IonItem>
              <input type="file" onChange={(event) => onFileChange(event)}></input>
            </IonItem> */}

            
            <IonButton color="primary" expand="full" onClick={() => getPicture()}>
              Upload A Single File
            </IonButton>
            {/* <IonButton color="secondary" expand="full" routerLink={"/multipleUpload"}>
              Upload Multiple
            </IonButton> */}
            <IonRow>
              <IonTitle><h6> Upload Multiple Files:</h6> </IonTitle>
              <IonItem lines="none">
                <input  type="file" onChange={(event) => onFileChange(event)} accept="image/*,.pdf,.doc" multiple></input>
              </IonItem>
              {/* <IonItem>
                  {files.map((file: any) => (
                      <h5>{file}</h5>
                  ))}
              </IonItem> */}
            </IonRow>
            <IonButton color="danger" expand="full" onClick={() => console.log("Trying to Get Picture From DB")}>
              Retrieve
            </IonButton>
            

            <IonItem lines="none">
              <img style={{height: 120, width: 295}} src={photo} ></img>
            </IonItem>
        </IonTitle>

        <IonAvatar></IonAvatar>

        <IonTitle>
            <IonText>
              <h5 style={{fontWeight: "bold"}}>Date and Time:</h5>
            </IonText>

            <IonSegment color="secondary" value="favorite">
              <IonSegmentButton value="yesterday">
                <IonLabel>Yesterday</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="sixhr">
                <IonLabel>Past 12 Hrs</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="onehr">
                <IonLabel>Past 6 Hrs</IonLabel>
              </IonSegmentButton>
            </IonSegment>
            <IonText>
              <h6>
                | Start Date and Time:
                <IonDatetime displayFormat="MMM DD, YYYY HH:mm" min="1990" max="2030" value={selectedStartDate} onIonChange={e => setSelectedStartDate(e.detail.value!) }></IonDatetime>
              </h6>
              <h6>
                | End Date and Time:
                <IonDatetime displayFormat="MMM DD, YYYY HH:mm" min="1990" max="2030" value={selectedEndDate} onIonChange={e => setSelectedEndDate(e.detail.value!) }></IonDatetime>
              </h6>
            </IonText>
            {/* <Datepicker
                controls={['datetime']}
                select="range"
                display="inline"
                touchUi={true}
            /> */}
            {/* <IonRow>
              <IonButton color="light" size="small" routerLink={"/extendedDateAndTime2"}>Click Here for Advanced Time Setting</IonButton>
            </IonRow> */}
          </IonTitle>
        
        <IonAvatar></IonAvatar>

        <IonTitle>
          <IonText>
            <h5 style={{fontWeight: "bold"}}>Location:</h5>
          </IonText>

          <IonItem>
            <IonLabel>Choose Location:</IonLabel>
            <IonSelect value="01">
              <IonSelectOption value="01">None</IonSelectOption>
              <IonSelectOption value="02">East Nashville</IonSelectOption>
              <IonSelectOption value="03">Ingle Wood</IonSelectOption>
              <IonSelectOption value="04">Madison</IonSelectOption>
              <IonSelectOption value="05">Bordeaux</IonSelectOption>
              <IonSelectOption value="06">Whites Creek</IonSelectOption>
              <IonSelectOption value="07">Donelson</IonSelectOption>
              <IonSelectOption value="08">Hermitage</IonSelectOption>
              <IonSelectOption value="09">Berry Hill</IonSelectOption>
              <IonSelectOption value="10">Green HIlls</IonSelectOption>
              <IonSelectOption value="11">West Meade</IonSelectOption>
              <IonSelectOption value="12">Belle Meade</IonSelectOption>
              <IonSelectOption value="13">Oak Hill</IonSelectOption>
              <IonSelectOption value="14">Crieve Hall</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonTitle>

        <IonAvatar></IonAvatar>

        <IonTitle>
          <IonText>
            <h5 style={{fontWeight: "bold"}}>License Plates:</h5>
          </IonText>

          {/* <IonItem lines="none">
            <IonButton color="light" size="small" onClick={() => this.takePicture()}>Upload A Picture</IonButton>
          </IonItem> */}
          {/* Now, the variable "photo" has the image source */}
          
          
          <IonItem>
            <IonLabel>Choose License Plate:</IonLabel>
            <IonSelect value="00">
              <IonSelectOption value="00">None</IonSelectOption>
              <IonSelectOption value="01">8A59S5</IonSelectOption>
              <IonSelectOption value="02">NBT410</IonSelectOption>
              <IonSelectOption value="03">ATN684</IonSelectOption>
              <IonSelectOption value="04">7L19V8</IonSelectOption>
              <IonSelectOption value="05">280QVG</IonSelectOption>
              <IonSelectOption value="06">BVH711</IonSelectOption>
              <IonSelectOption value="07">DLG208</IonSelectOption>
              <IonSelectOption value="08">BPD626</IonSelectOption>
            </IonSelect>
          </IonItem>

        </IonTitle>

        {!loading && data?.vehicles?.map((vehicle: any) => (
          // console.log(vehicle.license)
          <IonItem lines="none">
            <IonCard button={true} color="light">
            <img style={{height: 120, width: 300}} src={photo} ></img>
              <IonCardContent>
                <IonCardSubtitle>Car Information</IonCardSubtitle>
                <h5>Manufacturer: {vehicle.make}</h5>
                <h5>Model: {vehicle.model}</h5>
                <h5>Color: {vehicle.color}</h5>
                <h5>Location: [ {vehicle.location[0]} , {vehicle.location[1]} ]</h5>
                {/* <h5>Time: {JSON.parse(vehicle).time}</h5>      */}
                <h5>License Plate: { vehicle.license} </h5>           
              </IonCardContent>
            </IonCard>
          </IonItem>
        ))}
      
        <IonAvatar></IonAvatar>

        <IonTitle>
          <IonText >
            <h5 style={{fontWeight: "bold"}}>Track:</h5>
          </IonText>

          <ReactiveBase
            app="earthquake"
            credentials="OrXIHcgHn:d539c6e7-ed14-4407-8214-c227b0600d8e"
            type="places"
            mapKey="AIzaSyCgg0n0UKXaBeq7ve2VVK2qPF8SxcawIxU"
          >
            <div
              style={{
                width: '100%', 
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
                <ReactiveGoogleMap 
                  componentId="map"
                  defaultCenter={{lat: 36.15, lng: 86.68}} // Nashville, TN
                  {...mapProps}
                />       

            </div>
          </ReactiveBase>    

        </IonTitle>

        
      </IonContent>
    </IonPage>
  );
};

export default LicenseDashboard;