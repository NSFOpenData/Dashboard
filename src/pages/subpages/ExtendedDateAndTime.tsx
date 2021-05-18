
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonRow, IonFooter, IonDatetime, IonButton } from '@ionic/react';
import React, { useState } from 'react';
import './ExtendedDateAndTime.css';

/* Mobiscrall */
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Datepicker, Input, Page, setOptions } from '@mobiscroll/react';
setOptions({
  theme: 'ios',
  themeVariant: 'light'
});

/* Important Components */
//import { DatePickerModule } from 'ionic-calendar-date-picker';

const ExtendedDateAndTime: React.FC = (dashBoardNum) => {
  // for date and time ranges
  const [selectedDate, setSelectedDate] = useState<string>('2012-12-15T13:47:20.789');
  const [start, startRef] = React.useState<any>(null);
  const [end, endRef] = React.useState<any>(null);

  {/*let routePageLink = ""
  if(dashBoardNum == "1"){
    routePageLink = "/trafficDashboard"
  } else if (dashBoardNum == "2"){
    routePageLink = "/licenseDashboard"
  } else if (dashBoardNum == "3"){
    routePageLink = "/deliveryDashboard"
  } else {
    routePageLink = "/animalDashboard"
  }*/}

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
        <Datepicker
            controls={['calendar', 'time']}
            select="range"
            display="inline"
            touchUi={true}
        />

      <IonButton color="light" routerLink={"/trafficDashboard"}>Go Back</IonButton>
  
      </IonContent>

      
    </IonPage>

 
  );
};

export default ExtendedDateAndTime;