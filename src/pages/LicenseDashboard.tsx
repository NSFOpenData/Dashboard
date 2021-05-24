
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonButton, IonText, IonDatetime, IonRow, IonItem, IonCol, IonLabel, IonInput, IonSelectOption, IonSelect, IonAvatar, IonSegment, IonSegmentButton, IonChip, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonCardSubtitle } from '@ionic/react';
import { Datepicker } from '@mobiscroll/react';
import React, {useState, Component} from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './LicenseDashboard.css';

import { Plugins, CameraResultType } from '@capacitor/core';

/* Reactive Google Map */
import { ReactiveBase, SingleList } from '@appbaseio/reactivesearch';
import { ReactiveGoogleMap, ReactiveOpenStreetMap } from '@appbaseio/reactivemaps';

/* Axios for API Calls */
import axios from 'axios';

const { Camera } = Plugins;

const INITIAL_STATE = {
  photo: 'http://assets.stickpng.com/thumbs/585e4beacb11b227491c3399.png',
};


export class LicenseDashboard extends Component{

  API_URL = 'http://nsf-scc1.isis.vanderbilt.edu/vehicles';
  //API_URL = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${this.API_KEY}`

  state = {
    vehicles: [],
  };

  photoState = {};

  componentDidMount() {

    axios.get(this.API_URL)
    .then((data) => {
      this.setState({ vehicles: data.data })
      // console.log(this.state.vehicles) 
      
     })
     .catch(function (error){
       console.log(error)
     })
  }


  props: any = {};
  constructor(props: any) {
    super(props);
    this.photoState = { ...INITIAL_STATE };
  
  }

  async takePicture() {
    // take phot with Camera - it's editable as well
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    var imageUrl = image.webPath;
    // Can be set to the src of an image now
    this.setState({
      photo: imageUrl
    })
  }

  render(){
    //const { photo } = this.photoState;
    

    const mapProps = {
      dataField: "location",
      defaultMapStyle: "Light Monochrome",
      defaultZoom: 13,
      react: {
        and: "places"
      },
      showMapStyles: true,
    }; // for other properties: https://opensource.appbase.io/reactive-manual/map-components/reactivegooglemap.html

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
          <IonButton color="primary" expand="full" disabled={true}>License Dashboard</IonButton>
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
              {/*<IonText>
                <h6>
                  <IonDatetime displayFormat="MMM DD, YYYY HH:mm" min="1990" max="2030" value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!) }></IonDatetime>
                </h6>
              </IonText>*/}
              <Datepicker
                  controls={['datetime']}
                  select="range"
                  display="inline"
                  touchUi={true}
              />
              <IonRow>
                <IonButton color="light" size="small" routerLink={"/extendedDateAndTime2"}>Click Here for Advanced Time Setting</IonButton>
              </IonRow>
              

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

            {this.state.vehicles.map((vehicle: string) => (
              <IonItem lines="none">
                <IonCard button={false} color="light">
                  <IonCardContent>
                    <IonCardSubtitle>Car Information</IonCardSubtitle>
                    <h5>Manufacturer: {JSON.parse(vehicle).make}</h5>
                    <h5>Model: {JSON.parse(vehicle).model}</h5>
                    <h5>Color: {JSON.parse(vehicle).color}</h5>
                    <h5>Location: [ {JSON.parse(vehicle).location[0]} , {JSON.parse(vehicle).location[1]} ]</h5>
                    <h5>Time: {JSON.parse(vehicle).time}</h5>     
                    <h5>License Plate: {JSON.parse(vehicle).license} </h5>           
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
};

export default LicenseDashboard;