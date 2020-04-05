import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRouterOutlet } from '@ionic/react';
import React, { Fragment, useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { Link, Route, Router, Switch } from 'react-router-dom';
import PostView from './PostView';


const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
          <Link to={{ 
                pathname: '/PostView/1/1'
        }}> PostView </Link>
        


      </IonContent>
    </IonPage>
  );
};

export default Home;
