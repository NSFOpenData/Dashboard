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


  

  const TopMenu: React.FC = () => {

  const [mobile, setMobile] = React.useState(window.innerWidth <= 1025);

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
      <IonItem routerLink={"/queryPage"}><i className="fas fa-search fa-sm"></i> <span style={{'padding': '0 10px'}}>Search</span></IonItem>
      <IonItem routerLink={"/authentication"}><i className="fas fa-user-circle fa-sm"></i> <span style={{'padding': '0 10px'}}>Profile</span></IonItem>
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
          <IonButton routerLink={"/queryPage"} className="menuButton rightSide">
            <div className = "rightMenuButton searchButton">
                <i className="fas fa-search fa-2x"></i></div>
              </IonButton>
              <IonButton routerLink={"/authentication"} className="menuButton rightSide">
              <div className = "rightMenuButton searchButton">
              <i className="fas fa-user-circle fa-2x"></i></div>
              </IonButton>
      
      </IonButtons>}
      
    </IonToolbar>
  </IonHeader>
      </div>
    );
  };
  
  export default TopMenu;
  