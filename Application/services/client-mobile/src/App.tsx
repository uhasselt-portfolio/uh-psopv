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
import ListView from './pages/sector-responsible/list/ListPage';
import PostView from './pages/sector-responsible/post/PostPage';
import Notifications from './pages/sector-responsible/messages_general/message/MessagePage';
import SendNotifications from './pages/sector-responsible/messages_general/send_message/SendMessage';
import Contacts from './pages/sector-responsible/contact/ContactPage';
import NotificationItem from './pages/sector-responsible/messages_general/message/component/Notification_Item'
import LoginPage from './pages/login/LoginPage';
import PersonPage from './pages/sector-responsible/person/PersonPage';
import MapPage from './pages/sector-responsible/map/MapPage';
import MeessageGeneral from './pages/sector-responsible/messages_general/messageGeneralPage'


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



class App extends React.Component {
  state = {
    loggedin: true // TODO USERID
  }

  renderTabs(){
    if(this.state.loggedin){ // TODO USERID
      if(true){
        return(
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/ListView" component={ListView} exact={true} />
              <Route path="/MapPage" component={MapPage} exact={true} />
              <Route path="/PostView/:sector/:post" component={PostView} exact={true} />
              <Route path="/PersonPage/:id/" component={PersonPage} exact={true} />
              <Route path="/Notifications" component={MeessageGeneral} exact={true} />
              <Route path="/Contacts" component={Contacts} exact={true} />
              <Route path="/Login" component={LoginPage} exact={true} />
              <Route path="/" render={() => <Redirect to="/MapPage" />} exact={true} />
            </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="MapPage" href="/MapPage">
              <IonIcon icon={mapOutline} />
              <IonLabel>Post-Kaart</IonLabel>
            </IonTabButton>
            <IonTabButton tab="ListView" href="/ListView">
              <IonIcon icon={listOutline} />
              <IonLabel>Post-Lijst</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Notifications" href="/Notifications">
              <IonIcon icon={notificationsOutline} />
              <IonLabel>Notificaties</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Contacts" href="/Contacts">
              <IonIcon icon={personOutline} />
              <IonLabel>Contacts</IonLabel>
            </IonTabButton>
          </IonTabBar>
          </IonTabs>
        )
      } else{
        return(
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/InfoPage" component={InfoPage} exact={true} />
              <Route path="/Login" component={LoginPage} exact={true} />
              <Route path="/VRMessage" component={VRMessage} exact={true} />
              <Route path="/VRSendMessagePage" component={VRSendMessagePage} exact={true} />
              <Route path="/" render={() => <Redirect to="/InfoPage" />} exact={true} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="InfoPage" href="/InfoPage">
                <IonIcon icon={ellipse} />
                <IonLabel>Map</IonLabel>
              </IonTabButton>
              <IonTabButton tab="VRMessage" href="/VRMessage">
                <IonIcon icon={ellipse} />
                <IonLabel>Msg</IonLabel>
              </IonTabButton>
              <IonTabButton tab="VRSendMessagePage" href="/VRSendMessagePage">
                <IonIcon icon={ellipse} />
                <IonLabel>Send</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
          )
      }
      
    } else {
      return(
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/Login" component={LoginPage} exact={true} />
          <Route path="/" render={() => <Redirect to="/Login" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
        <IonTabButton tab="Login" href="/Login">
          <IonIcon icon={square} />
          <IonLabel>Login</IonLabel>
        </IonTabButton>
        </IonTabBar>
      </IonTabs>
      )
    }
  }

  render(){
    return (
      <Provider store={store}>
      <IonApp>
          <Save />
          <IonReactRouter>
              {this.renderTabs()}
            </IonReactRouter>          
      </IonApp>
  </Provider>
    )
  }
}

export default App;
