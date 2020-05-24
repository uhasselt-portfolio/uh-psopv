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
import ListView from '../sector-responsible/list/ListPage';
import PostView from '../sector-responsible/post/PostPage';
import Contacts from '../sector-responsible/contact/ContactPage';
import LoginPage from '../login/LoginPage';
import PersonPage from '../sector-responsible/person/PersonPage';
import MapPage from '../sector-responsible/map/MapPage';
import MessageGeneral from '../sector-responsible/messages_general/MessageGeneralPage'

import InfoPage from '../volunteer/info/InfoPage';
import StartPage from '../volunteer/start/StartPage';
import BackgroundLocation from "../volunteer/start/BackgroundLocation";

import VRSendMessagePage from '../volunteer/send_message/VR_SendMessage';
import VRMessage from '../volunteer/message/VR_MessagePage'


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

/* Theme variables */
import { getListLocalStorage } from '../save/saveFunction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getAmountMessage} from './TabBarAction'

class TabBar extends React.Component<any, any> {
  interval: NodeJS.Timeout | undefined;
  
  constructor(props: any) {
    super(props);
    this.state = {
      loggedin: true, // TODO USERID
    }
  } 

  componentWillUnmount() {
    if(this.interval != undefined){
      clearInterval(this.interval);
    }
  }


  componentDidMount(){
      this.props.getAmountMessage();
    this.interval = setInterval(() => {
        // this.props.getAmountMessage();
    }, 10000);
  }

  getAmountMessages(){
    return 0
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
              <Route path="/Notifications" component={MessageGeneral} exact={true} />
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
              <IonBadge color="primary">{this.props.localStorage.total}</IonBadge>
              <IonIcon icon={notificationsOutline} />
              <IonLabel>Berichten</IonLabel>
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
      if(this.props.localStorage != undefined){
        return (
            <IonReactRouter>
                {this.renderTabs()}
            </IonReactRouter>          
            )
      } else{
          return(<div></div>)
      }
    
  }
}


function mapStateToProps(state: any) {
    return({
      localStorage: state.tabbar.isAmountFetched,
    })
  }
  
  function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
        getAmountMessage
    }, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(TabBar);
