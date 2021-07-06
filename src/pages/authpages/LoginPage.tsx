import { IonContent, IonText, IonRow, IonCol, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonImg, IonAvatar, IonItem, IonInput, IonSelect, IonLabel, IonSelectOption } from '@ionic/react';
import React, { Component, useState } from 'react';
import './LoginPage.css';

/* GraphQL for API Calls */
import { gql, useQuery, useMutation, ApolloProvider } from '@apollo/client';
import { useHistory } from 'react-router';
import { register } from '../../serviceWorkerRegistration';
import { PassThrough } from 'stream';

// const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL25zZi1zY2MxLmlzaXMudmFuZGVyYmlsdC5lZHUvZ3JhcGhxbCI6eyJlbWFpbCI6ImFwcHRlc3RAYXBwdGVzdC5jb20iLCJyb2xlIjoiUFJJVklMRUdFRCJ9LCJpYXQiOjE2MjI3NDczNDIsImV4cCI6MTYyMzM1MjE0Miwic3ViIjoiNjBiNjU4MDRkYzI3NTQ5YTkwMDcyYjIyIn0.89rdr_qyT2ntC5LOyu6CrWBnUhjiqNOeTDz1bWm6TOg';
var AUTH_TOKEN = '';

// these have to be in the email in order to make sure email is valid
const atChar = '@';
const dotCom = ".com";

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
            login(email: $email, password: $password)
        }
    `;

    const [login, { data, error, loading }] = useMutation(LOGIN_MUTATION, {
        variables: {
            email: formState.email,
            password: formState.password,
        },

        onCompleted: ({ login }) => {
            // localStorage.setItem(AUTH_TOKEN, register.token);
            // AUTH_TOKEN = login.token;
            console.log("login", login);
            localStorage.setItem(AUTH_TOKEN, login);
            //history.push('/');
        },
        // refetchQueries: [{ query: 'LOGIN_MUTATION' }]
    });

    // if (!loading) console.log(data!.me.email)

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
                <IonAvatar></IonAvatar>
                <IonItem>
                    <IonInput placeholder="Email" onIonChange={e => setFormState({ ...formState, email: e.detail.value! })}></IonInput>
                </IonItem>
                <IonItem>
                    <IonInput placeholder="Password" onIonChange={e => setFormState({ ...formState, password: e.detail.value! })}></IonInput>
                </IonItem>

                {(formState.email.length > 0 && formState.password.length > 0 &&
                    formState.email.includes(atChar) && formState.email.includes(dotCom) &&
                    formState.password.length >= 4) &&
                    <IonButton expand="full" onClick={() => login()} routerLink={'/profilePage'} >Login</IonButton>
                    // IF SUCCESS, go to the profile page / routerLink={'/profilepage'}
                }
                {/* 
            <div className="centerItem">
                <IonButton routerLink={'/authentication'}>Go Back</IonButton>
            </div> */}

                <IonItem>
                    <IonLabel>Community</IonLabel>
                    <IonSelect>
                    <IonSelectOption value="Goodlettsville">Goodlettsville</IonSelectOption>
                    <IonSelectOption value="Lebanon">Lebanon</IonSelectOption>
                    <IonSelectOption value="MountJuliet">Mount Juliet</IonSelectOption>
                    <IonSelectOption value="Murfreesboro">Murfreesboro</IonSelectOption>
                    <IonSelectOption value="Smyrna">Smyrna</IonSelectOption>
                    <IonSelectOption value="Hendersonville">Hendersonville</IonSelectOption>
                    <IonSelectOption value="Gallatin">Gallatin</IonSelectOption>
                    <IonSelectOption value="Nolensville">Nolensville</IonSelectOption>
                    <IonSelectOption value="Brentwood">Brentwood</IonSelectOption>
                    <IonSelectOption value="Franklin">Franklin</IonSelectOption>
                        
                    </IonSelect>
                </IonItem>
            </IonContent>
        </IonPage >
    );

}

export { AUTH_TOKEN };
export default LoginPage;
