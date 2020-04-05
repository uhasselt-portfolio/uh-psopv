import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import ListView from './pages/ListView';
import MapView from './pages/MapView';
import PostView from './pages/PostView'
import Notifications from './pages/Notifications';
import SendNotifications from './pages/SendNotifications';


import { ellipse, square, triangle } from 'ionicons/icons';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Child from './pages/PostView';




const App: React.FC = () => (
  <IonApp>
      <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/MapView" component={MapView} exact={true} />
          <Route path="/ListView" component={ListView} exact={true} />
          <Route path="/Notifications" component={Notifications} exact={true} />
          <Route path="/SendNotifications" component={SendNotifications} exact={true} />
          <Route path="/PostView/:post/:sector" component={PostView} exact={true} />
          <Route path="/" render={() => <Redirect to="/home" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="MapView" href="/MapView">
            <IonIcon icon={ellipse} />
            <IonLabel>Map</IonLabel>
          </IonTabButton>
          <IonTabButton tab="ListView" href="/ListView">
            <IonIcon icon={square} />
            <IonLabel>List</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Notifications" href="/Notifications">
            <IonIcon icon={square} />
            <IonLabel>Nots</IonLabel>
          </IonTabButton>
          <IonTabButton tab="SendNotifications" href="/SendNotifications">
            <IonIcon icon={square} />
            <IonLabel>Send</IonLabel>
          </IonTabButton>
        </IonTabBar>
        </IonTabs>
      </IonReactRouter>
  </IonApp>
);

export default App;
