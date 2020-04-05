import React, { Fragment, useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './ListView.css';
import ListViewItem from '../components/ListView_Item'

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
    {sector: "1", post: "1", person: "Wouter", shift_start:"10:00", shift_end:"23:59", function:"Straat afzetten", street:"Yolostraat 4, 3500 Hasselt"},
    {sector: "1", post: "1", person: "Michiel", shift_start:"10:00", shift_end:"23:59", function:"Straat afzetten", street:"Yolostraat 4, 3500 Hasselt"}
  ]
  
  
  type UserProps = {
    sector: string,
    post: string,
    person: string,
    shift_start: string,
    shift_end: string,
    function: string,
    street: string
  };

const ListView: React.FC = () => {
  const [Sector, setSector] = useState<string>("Sector 1");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>ListView</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>


    {/*-- Buttons --*/}
    <IonGrid>
      <IonRow>
        <IonCol>
          <IonButton>
            Filter
          </IonButton>
        </IonCol>
        <IonCol>
          <IonButton>
            Sort
          </IonButton>
        </IonCol>
        <IonCol>
          <IonButton>
            <IonSelect
              interface="popover"  
              value={Sector} placeholder={Sector} onIonChange={e => setSector(e.detail.value)}>
              <IonSelectOption value="1">Sector 1</IonSelectOption>
              <IonSelectOption value="2">Sector 2</IonSelectOption>
            </IonSelect>
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
      
      

    {/*-- List of Post Items --*/}
    <IonList>
      {users.map((data: UserProps, index: number) => {
          return (
          <ListViewItem
          sector={data.sector}
          post={data.post}
          person={data.person}
          shift_start={data.shift_start}
          shift_end={data.shift_end}
          function={data.function}
          street={data.street}/>)
      })}
    </IonList>
  </IonContent>
        
      </IonContent>
    </IonPage>
  );
};

export default ListView;
