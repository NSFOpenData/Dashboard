import { IonContent, IonText, IonRow, IonCol, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonImg, IonAvatar, IonItem, IonInput } from '@ionic/react';
import React, { Component, useState } from 'react';
import './RegisterPage.css';

/* GraphQL for API Calls */
import {gql, useQuery, useMutation, ApolloProvider} from '@apollo/client';
import { useHistory } from 'react-router';

const RegisterPage: React.FC = () => {
    const history = useHistory();

    const [formState, setFormState] = useState({
       // login: true,
        name: '',
        email: '',
        password: '',
    });

    // https://github.com/howtographql/react-apollo/blob/master/src/components/Login.js
    const REGISTER_QUERY = gql`
        mutation RegiterMutation (
            $name: String!
            $email: String!
            $password: String!
        ){
            register (user: {name: $name, email: $email, password: $password}) {
                name
                role
                email
            }
        }
  `;
  const [register] = useMutation(REGISTER_QUERY, {
    variables:{
        name: formState.name,
        email:formState.email,
        password: formState.password
    },
    onCompleted: ({register}) => {
        history.push('/');
    }
  });

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
            <h5>register</h5>
            <IonItem>
                <IonInput placeholder="Full Name" onIonChange={e => setFormState({...formState, name: e.detail.value!})}></IonInput>
            </IonItem>
            <IonItem>
                <IonInput placeholder="Email" onIonChange={e => setFormState({...formState, email: e.detail.value!})}></IonInput>
            </IonItem>
            <IonItem>
                <IonInput placeholder="Password" onIonChange={e => setFormState({...formState, password: e.detail.value!})}></IonInput>
            </IonItem>
            
            {(formState.name.length > 0 && formState.email.length > 0 && formState.password.length > 0) && 
                <IonButton size="default" onClick={() => register}>Submit</IonButton>
            }

            <IonButton color="secondary" size="default" routerLink={"/loginpage"}>Log In</IonButton>



            {/* get inputs from the user first */}
            {/* check that every input has length greater than 1*/}
            {/* then, when the user presses submit, call the registermutation function */}
        </IonContent>
      </IonPage >
    );
  
  }
  
  export default RegisterPage;