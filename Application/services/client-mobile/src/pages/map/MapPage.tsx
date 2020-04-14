import * as React from 'react';
import { Component } from 'react';
import { IonButton, 
    IonListHeader, 
    IonHeader, 
    IonPage, 
    IonTitle, 
    IonToolbar, 
    IonList, 
    IonItem, 
    IonLabel,
    IonText, IonInput, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonContent, IonAvatar, IonIcon } from '@ionic/react';
import { Link } from 'react-router-dom';
import { caretDown, call, mail } from 'ionicons/icons';

import './MapPage.css';
import GoogleMapReact from 'google-map-react';
import ProblemMarker from './components/ProblemMarker'
import Marker from './components/ProblemMarker'

class MapPage extends Component<any> {

  constructor(props:any) {
    super(props);
  }

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render(){
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Map</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
        <div className="GoogleMaps">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDyMg3eezA_aKnVp1Hvsya23xwxCey32JA' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
        <ProblemMarker 
        lat={59.955413} 
        lng={30.337844} 
        />
        </GoogleMapReact>
        </div>
        </IonContent>
      </IonPage>
    )
  }

};

export default MapPage;
