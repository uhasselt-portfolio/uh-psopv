import React, { Fragment, useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './ListView.css';
import ContactItem from '../components/Contact_Item'

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


  const users: UserProps[] = [
    {id: 1, name: "wouter", task: "admin"},
    {id: 2, name: "Michiel", task: "Vrijwilliger"},
    {id: 3, name: "Maria", task: "Vrijwilliger"},
    {id: 4, name: "Lode", task: "Vrijwilliger"}
  ]
  
  
  type UserProps = {
    id: number,
    name: string,
    task: string
  };

const Contacts: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Contacts</IonTitle>
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
      {users.map((data: UserProps, index: number) => {
          return (
          <ContactItem
          id={data.id}
          name={data.name}
          task={data.task}/>)
      })}
    </IonList>
  </IonContent>
        
      </IonContent>
    </IonPage>
  );
};

export default Contacts;
