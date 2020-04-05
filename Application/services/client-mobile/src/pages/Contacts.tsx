import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCardHeader, IonList, IonCard, IonCheckbox, IonItem, IonLabel, IonItemDivider, IonCardTitle, IonCardContent, IonButton, IonIcon, IonSelect, IonSelectOption, IonInput, IonTextarea } from '@ionic/react';
import React, { Fragment, useState, Component, ReactNode, useEffect } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './PostView.css';
import { RouteComponentProps } from 'react-router';
import Shift from '../components/Shift';
import './SendNotifications.css'
import { caretDown } from 'ionicons/icons';



const SendNotifications: React.FC = () => {
  const [receiver, setReceiver] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [title, setTitle] = useState<string>();

  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Notificaties versturen</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
    


        <IonItem>
          <IonLabel>Ontvanger</IonLabel>
          <IonSelect interface="popover" value={receiver} placeholder="Selecteer" onIonChange={e => setReceiver(e.detail.value)}>
            <IonSelectOption value="Admin">Admin</IonSelectOption>
            <IonSelectOption value="Verantwoordelijke">Verantwoordelijke</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
            <IonInput value={title} placeholder="Enter Titel" onIonChange={e => setTitle(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem>
            <IonTextarea className="textArea" value={description} placeholder="Enter bericht" onIonChange={e => setDescription(e.detail.value!)}></IonTextarea>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default SendNotifications;
