import React, { Fragment, useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './ListView.css';
import NotificationItem from '../components/Notification_Item'

import { IonButton, 
  IonListHeader, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonList, 
  IonItem, 
  IonLabel,
  IonText,
  IonSelect,
  IonSelectOption,
  IonRow,
  IonInput, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonContent, IonAvatar, IonGrid, IonCol } from '@ionic/react';


  const users: notificationProps[] = [
    {from_person: "Admin", title: "Lorem", description: "Lorem Ipsum asdjf l;dkjfasd;flkj ", time:"10:00", read: false},
    {from_person: "Tom", title: "Taakje", description: "Kan sector veratnwoordelijke ...", time:"10:10", read: false},
    {from_person: "Sector Verantwoordelijke 5", title: "1Cookies", description: "Er zijn gratis koekjes en thee", time:"11:00", read: true}
  ]
  
  
   
type notificationProps = {
    from_person: string,
    title: string,
    description: string,
    time: string,
    read: boolean,
  };


const Notifications: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Notifications</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>


    {/*-- List of Post Items --*/}
    <IonList>
      {users.map((data: notificationProps, index: number) => {
          return (
          <NotificationItem
          from_person={data.from_person}
          title={data.title}
          description={data.description}
          time={data.time}
          read={data.read}/>)
      })}
    </IonList>
  </IonContent>
        
      </IonContent>
    </IonPage>
  );
};

export default Notifications;
