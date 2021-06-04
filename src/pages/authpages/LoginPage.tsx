import { IonContent, IonText, IonRow, IonCol, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonImg, IonAvatar, IonItem, IonInput } from '@ionic/react';
import React, { Component, useState } from 'react';
import './LoginPage.css';

/* GraphQL for API Calls */
import {gql, useQuery, useMutation, ApolloProvider} from '@apollo/client';
import { useHistory } from 'react-router';
import { register } from '../../serviceWorkerRegistration';
import { PassThrough } from 'stream';

// const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL25zZi1zY2MxLmlzaXMudmFuZGVyYmlsdC5lZHUvZ3JhcGhxbCI6eyJlbWFpbCI6ImFwcHRlc3RAYXBwdGVzdC5jb20iLCJyb2xlIjoiUFJJVklMRUdFRCJ9LCJpYXQiOjE2MjI3NDczNDIsImV4cCI6MTYyMzM1MjE0Miwic3ViIjoiNjBiNjU4MDRkYzI3NTQ5YTkwMDcyYjIyIn0.89rdr_qyT2ntC5LOyu6CrWBnUhjiqNOeTDz1bWm6TOg';
var AUTH_TOKEN = '';

const LoginPage: React.FC = () => {
    const history = useHistory();

    const [formState, setFormState] = useState({
         email: '',
         password: '',
     });

    const LOGIN_MUTATION = gql`
        mutation (
            $email: String!
            $password: String!
        ){
            login(email: $email, password: $password){
            }{
                token
            }
        }
    `;

    // const [login] = useMutation(LOGIN_MUTATION);

    // login({
    //     variables:{
    //         email: formState.email,
    //         password: formState.password,
    //     }
    // }).then(
    //     res => console.log(res)
    // );

  const [login] = useMutation(LOGIN_MUTATION, {
    variables:{
        email: formState.email,
        password: formState.password,
    },
    onCompleted: ({login}) => {
        // localStorage.setItem(AUTH_TOKEN, register.token);
        // AUTH_TOKEN = login.token;
        console.log("login", login.token);
        localStorage.setItem(AUTH_TOKEN, login.token);
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
           <h5>login</h5>
            <IonItem>
                <IonInput placeholder="Email" onIonChange={e => setFormState({...formState, email: e.detail.value!})}></IonInput>
            </IonItem>
            <IonItem>
                <IonInput placeholder="Password" onIonChange={e => setFormState({...formState, password: e.detail.value!})}></IonInput>
            </IonItem>


            {(formState.email.length > 0 && formState.password.length > 0) && 
                <IonButton size="default" onClick={() => login} routerLink={"/profilepage"}>LogIn To Go To Profile Page</IonButton>
            }
            
            {console.log("here: ", formState.email, formState.password)}

        </IonContent>
      </IonPage >
    );
  
  }
  
  export {AUTH_TOKEN};
  export default LoginPage;
