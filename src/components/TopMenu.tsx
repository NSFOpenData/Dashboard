import {
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonMenu,
    IonList,
    IonButtons,
    IonItem,
    IonMenuButton,
    IonButton

  
  } from "@ionic/react";
  import React from "react";
  import vulogo from './../img/vulogo.png';
  import './TopMenu.css';
  import authHelper from './../auth-helper'
import { useAuth } from "../AuthContext";



  const TopMenu: React.FC = () => {
    const {authInfo} = useAuth()

    console.log(authInfo)

    const [mobile, setMobile] = React.useState(window.innerWidth <= 1025);
    // const [authenticated, setAuthenticated] = React.useState(authInfo.loggedIn);
  React.useEffect(() => {
    function handleResize() {
      if(window.innerWidth <= 1025) setMobile(true);
      else setMobile(false);
    }

    window.addEventListener('resize', handleResize);


    return function cleanup()  {
    window.removeEventListener('resize', handleResize);
  }
  })

    return (
        <div>
        <IonMenu side="start" menuId="first" contentId="main-content">
  <IonHeader>
    <IonToolbar className="menuHeader" color="vanderbilt">
      <IonTitle className="headerTitle"><b>NSF Open Data</b></IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent>
      <IonList>
        
      <IonItem routerLink={"/mainPage"}><i className="fas fa-home fa-sm"></i> <span style={{'padding': '0 10px'}}>Home</span></IonItem>
      {authInfo ?  <span>
        <IonItem routerLink={"/queryPage"}><i className="fas fa-search fa-sm"></i> <span style={{'padding': '0 10px'}}>Search</span></IonItem>
      <IonItem routerLink={"/profilePage"}><i className="fas fa-user-circle fa-sm"></i> <span style={{'padding': '0 10px'}}>Profile</span></IonItem>
      <IonItem routerLink={"/signout"}><i className="fas fa-sign-out-alt"></i> <span style={{'padding': '0 10px'}}>Sign Out</span></IonItem>
        </span> : <IonItem routerLink={"/authentication"}><i className="fas fa-sign-in-alt"></i><span style={{'padding': '0 10px'}}>Log In</span></IonItem>}
        
      </IonList>

    
    <IonList>
    <IonTitle className="dashboardTitle">Dashboards</IonTitle>
      <IonItem routerLink={"/trafficDashboard"}><i className="fas fa-car-alt"></i><span style={{'padding': '0 10px'}}>Traffic</span></IonItem>
      <IonItem routerLink={"/licenseDashboard"}><span style={{'fontSize': '.8rem'}}><i className="fas fa-id-card-alt"></i></span><span style={{'padding': '0 10px'}}>License</span></IonItem>
      <IonItem routerLink={"/deliveryDashboard"}><span style={{'fontSize': '.8rem'}}><i className="fas fa-truck"></i></span><span style={{'padding': '0 10px'}}>Delivery</span></IonItem>
      <IonItem routerLink={"/animalDashboard"}><span style={{'fontSize': '.95rem'}}><i className="fas fa-dog"></i></span><span style={{'padding': '0 10px'}}>Animal</span></IonItem>
      </IonList>

  </IonContent>
</IonMenu>
  <IonHeader id="main-content">
    <IonToolbar>
    <IonButtons slot="start" className="menu">
      {mobile ? 
        <IonMenuButton className="menuButton"></IonMenuButton> : 
        <IonButton routerLink={"/mainPage"} className="menuButton">
            <div>
                <i className="fas fa-home fa-2x"></i></div>
              </IonButton>}
        
      </IonButtons>
      <IonTitle><img className="logoPic" src={vulogo} /></IonTitle>

      {!mobile && 
      <IonButtons slot="end">
        {authInfo ?  <span>
          <IonButton routerLink={"/queryPage"} className="menuButton rightSide">
            <div className = "rightMenuButton searchButton">
                <i className="fas fa-search fa-2x"></i></div>
              </IonButton>
              <IonButton routerLink={"/profilePage"} className="menuButton rightSide">
              <div className = "rightMenuButton searchButton">
              <i className="fas fa-user-circle fa-2x"></i></div>
              </IonButton>
          <IonButton routerLink={"/signout"} className="menuButton rightSide">
              <div className = "rightMenuButton searchButton">
              <i className="fas fa-sign-out-alt fa-2x"></i></div>
              </IonButton>
        </span> : <IonButton routerLink={"/authentication"} className="menuButton rightSide">
              <div className = "rightMenuButton searchButton">
              <b style={{fontSize: "1.5em"}}>Log In</b></div>
              </IonButton>}
          
              

      
      </IonButtons>}
      
    </IonToolbar>
  </IonHeader>
      </div>
    );
}

export default TopMenu