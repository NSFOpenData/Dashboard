import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonRow, IonFooter, IonDatetime, IonButton, IonAvatar, IonSegment, IonSegmentButton, IonLabel, IonItem, IonIcon } from '@ionic/react';
import React, { useState, Component, useRef, useMemo, useCallback } from 'react';
import './UploadPageLicense.css';

// icons
import { chevronBackOutline } from 'ionicons/icons';


// for uploading files
interface InternalValues {
    file: any;
}

let files: any[] = [];

    
const UploadPage: React.FC = () => {
    ////* Uploading Files */
    const values = useRef<InternalValues>({
        file: false,
    });
    
    const onFileChange = (fileChangeEvent: any) => {
        // values.current.file = fileChangeEvent.target.files[0];
        // console.log(values.current.file);
        console.log("here" + fileChangeEvent.target.files[0].name)
        files = Array.from(fileChangeEvent.target.files);
    
        {
            files.map((file: any) => (
            console.log("file-to-upload detected: " + file.name)
            ))
        }
    };
    
    const submitFileForm = async () => {
        // if (!values.current.file) {
        //   console.log("we got no file to upload")
        //   return false;
        // }
    
        let formData = new FormData();
        formData.append("type", "vehicle");
        formData.append("id", "60b6e51818ca7fe9e8156888");
        {
            files.map((file: any) => (
            // console.log(file.name)
            formData.append("images", file, file.name)
            ))
        }
        // console.log(values.current.file.name);
        // console.log(formData.get("type"));
        // console.log(formData.get("id"));
    
        try {
            const response = await fetch("https://nsf-scc1.isis.vanderbilt.edu/upload", {
            method: "POST",
            body: formData,
            mode: 'no-cors',
            headers: { 'Content-Type': 'multipart/form-data' }
            });
    
            if (!response.ok) {
            console.log("Error uploading file");
            throw new Error(response.statusText);
            }
            else if (response.ok) {
            console.log("Success uploading file");
            console.log(response.statusText);
            }
    
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <IonPage>
      <IonHeader>
          <IonToolbar>
              <div className="centerItem">
                <img src="http://sensys.acm.org/2014/resources/images/IsisLogo.jpg"></img>
              </div>
          </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <h5 className="centerItem" style={{ fontWeight: "bold" }}>Upload/Retrieve Data</h5>
        <div className="centerItem">
          <IonItem lines="none">
            {/* <form action="https://nsf-scc1.isis.vanderbilt.edu/upload" encType="multipart/form-data" method="post"> */}
            {/* <input type="text" placeholder="Object ID" name="id"></input>
            <input type="text" placeholder="Please type: 'vehicle'" name="type"></input> */}
            {/* <input name="images" type="file" onChange={(event) => onFileChange(event)} accept="image/*,.pdf,.doc" multiple></input> */}
            <input type="file" onChange={(event) => onFileChange(event)} accept="image/*,.pdf,.doc" multiple></input>
            {/* <input type="submit" value="upload"></input> */}
            {/* </form> */}
          </IonItem>
        </div>

        <IonButton color="primary" expand="block" onClick={() => submitFileForm()}>Submit</IonButton>
        <IonButton color="danger" expand="block" onClick={() => console.log("Trying to Get Picture From DB")}>
          Retrieve
        </IonButton>

        <div className="bottom">
          <IonButton color="light" routerLink={"/licenseDashboard"} routerDirection="back">
            <IonIcon icon={chevronBackOutline}></IonIcon>
            back
          </IonButton>
        </div>
      </IonContent>


    </IonPage>


  );
};

export default UploadPage;