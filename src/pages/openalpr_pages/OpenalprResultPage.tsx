  
import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonicSafeString, IonRow, IonAvatar } from '@ionic/react';
import React from 'react';

export class OpenalprResultPage extends React.Component {

    public licensePlate: string;
    public car: any = {};

    constructor(private params: NavParams, private viewCtrl: ViewController) {
        super(params)

        this.licensePlate = this.params.get('licensePlate');

        this.car = {
            name: '[Car Brand]',
        }
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    render(){
        return(
            <IonButton onClick={() => this.dismiss()}>Go Back</IonButton>
        );
    }
}

export default OpenalprResultPage;