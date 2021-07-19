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
import React, { useState, useRef } from "react";
import "./TempEmailPage.css";

// import { EmailComposer } from "@ionic-native/email-composer";

const TempEmailPage: React.FC = () => {
  let email = {
    to: "david.seo.221@gmail.com",
    // cc: 'erika@mustermann.de',
    // bcc: ['john@doe.com', 'jane@doe.com'],
    // attachments: [
    //   'file://img/logo.png',
    //   'res://icon.png',
    //   'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
    //   'file://README.pdf'
    // ],
    subject: "Email Sending testing",
    body: "Good to see you!",
    isHtml: true,
  };

  // const sendEmail = () => {
  //   EmailComposer.open(email);
  // };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className="centerItem">
            <img
              className="logoPic"
              src="https://www.vanderbilt.edu/communications/brand/images/VUPrint.jpg"
            ></img>{" "}
          </div>
        </IonToolbar>
      </IonHeader>

      {/* <IonContent fullscreen>
        <IonButton onClick={() => sendEmail()}>Send Email</IonButton>
      </IonContent> */}
    </IonPage>
  );
};

export default TempEmailPage;
