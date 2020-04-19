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
import Notifications from './pages/sector-responsible/message/MessagePage';
import SendNotifications from './pages/sector-responsible/send_message/SendMessage';
import Contacts from './pages/sector-responsible/contact/ContactPage';
import NotificationItem from './pages/sector-responsible/message/component/Notification_Item'
import LoginPage from './pages/login/LoginPage';
import PersonPage from './pages/sector-responsible/person/PersonPage';
import MapPage from './pages/sector-responsible/map/MapPage';


import InfoPage from './pages/volunteer/info/InfoPage';

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
import { ellipse, square, triangle } from 'ionicons/icons';
import store from './reducers';
import {Provider} from 'react-redux';

/* Theme variables */
import './theme/variables.css';



class App extends React.Component {
  state = {
    id: 2 // TODO USERID
  }

  renderTabs(){
    if(this.state.id == 1){ // TODO USERID
      return(
        <IonTabs>
        <IonRouterOutlet>
          <Route path="/ListView" component={ListView} exact={true} />
          <Route path="/MapPage" component={MapPage} exact={true} />
          <Route path="/PostView/:post/:sector" component={PostView} exact={true} />
          <Route path="/PersonPage/:id/" component={PersonPage} exact={true} />
          <Route path="/Notifications" component={Notifications} exact={true} />
          <Route path="/SendNotifications" component={SendNotifications} exact={true} />
          <Route path="/Contacts" component={Contacts} exact={true} />
          <Route path="/Login" component={LoginPage} exact={true} />
          <Route path="/" render={() => <Redirect to="/MapPage" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
        <IonTabButton tab="Login" href="/Login">
            <IonIcon icon={square} />
            <IonLabel>Login</IonLabel>
          </IonTabButton>
          <IonTabButton tab="MapPage" href="/MapPage">
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
          <IonTabButton tab="Contacts" href="/Contacts">
            <IonIcon icon={square} />
            <IonLabel>Contacts</IonLabel>
          </IonTabButton>
        </IonTabBar>
        </IonTabs>
      )
    } else if (this.state.id == 2){ // TODO USERID
      return(
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/InfoPage" component={InfoPage} exact={true} />
          <Route path="/Login" component={LoginPage} exact={true} />
          <Route path="/" render={() => <Redirect to="/InfoPage" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
        <IonTabButton tab="Login" href="/Login">
            <IonIcon icon={square} />
            <IonLabel>Login</IonLabel>
          </IonTabButton>
          <IonTabButton tab="InfoPage" href="/InfoPage">
            <IonIcon icon={ellipse} />
            <IonLabel>Map</IonLabel>
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
          <IonReactRouter>
            {this.renderTabs()}
          </IonReactRouter>
      </IonApp>
  </Provider>
    )
  }
}

export default App;
