import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import ProblemMarker from '../components/ProblemMarker';
import './MapView.css'
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


const MapView: React.FC = (props: any) => {
    const [center, setCenter] = useState({lat: 50.9307, lng: 5.3325 });
    const [zoom, setZoom] = useState(11);
    const [Sector, setSector] = useState<string>("Sector 1");
    

    return (
      <div className="Container">
        <div className="Filter">
        <IonButton>
            <IonSelect
              interface="popover"  
              value={Sector} placeholder={Sector} onIonChange={e => setSector(e.detail.value)}>
              <IonSelectOption value="1">Sector 1</IonSelectOption>
              <IonSelectOption value="2">Sector 2</IonSelectOption>
            </IonSelect>
          </IonButton>
          </div>
        <div className="GoogleMaps">
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDyMg3eezA_aKnVp1Hvsya23xwxCey32JA' }}
            defaultCenter={center}
            defaultZoom={zoom}
          >
          <ProblemMarker
            lat={50.9307}
            lng={5.3325}
            name="My Marker"
            color="blue"
          />
        </GoogleMapReact>
      </div>
    </div>
    );
}

export default MapView;