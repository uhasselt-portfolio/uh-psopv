import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonBadge
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import ListView from './pages/sector-responsible/list/ListPage';
import PostView from './pages/sector-responsible/post/PostPage';
import Notifications from './pages/sector-responsible/messages_general/message/MessagePage';
import SendNotifications from './pages/sector-responsible/messages_general/send_message/SendMessage';
import Contacts from './pages/sector-responsible/contact/ContactPage';
import NotificationItem from './pages/sector-responsible/messages_general/message/component/Notification_Item'
import LoginPage from './pages/login/LoginPage';
import PersonPage from './pages/sector-responsible/person/PersonPage';
import MapPage from './pages/sector-responsible/map/MapPage';
import MessageGeneral from './pages/sector-responsible/messages_general/messageGeneralPage'


import InfoPage from './pages/volunteer/info/InfoPage';
import StartPage from './pages/volunteer/start/StartPage';
import BackgroundLocation from "./pages/volunteer/start/BackgroundLocation";

import VRSendMessagePage from './pages/volunteer/send_message/VR_SendMessage';
import VRMessage from './pages/volunteer/message/VR_MessagePage'


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
import { ellipse, square, mapOutline, listOutline, notificationsOutline, paperPlaneOutline, personOutline } from 'ionicons/icons';
import {store} from './reducers';
import {Provider} from 'react-redux';
import {persistStore, persistReducer } from 'redux-persist'

/* Theme variables */
import './theme/variables.css';
import { PersistGate } from 'redux-persist/integration/react';
import Save from './pages/save/savePage'
import { getListLocalStorage } from './pages/save/saveFunction';
import TabBar from './pages/TabBar/TabBar';

class App extends React.Component<any, any> {
  interval: NodeJS.Timeout | undefined;
  
  constructor(props: any) {
    super(props);
    this.state = {
      loggedin: true, // TODO USERID
      amount_msg: 0,
    }
  } 

  render(){
    return (
      <Provider store={store}>
      <IonApp>
          <Save />
          <TabBar />      
      </IonApp>
  </Provider>
    )
  }
}

export default App;
