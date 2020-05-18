import React, {Fragment} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs
} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
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
import {
    ellipse,
    square,
    mapOutline,
    listOutline,
    notificationsOutline,
    paperPlaneOutline,
    personOutline
} from 'ionicons/icons';
import {store} from './reducers';
import {connect, Provider} from 'react-redux';

import {persistStore, persistReducer} from 'redux-persist'

/* Theme variables */
import './theme/variables.css';
import {PersistGate} from 'redux-persist/integration/react';
import Save from './pages/save/savePage'
// import JWTUtil from "../../server/src/api/utils/jwt.util";
import {bindActionCreators} from "redux";
import {checkUserExists} from "./pages/login/LoginAction";
import SectorManagerApplication from "./pages/sector-responsible/SectorManagerApplication";
import VolunteerApplication from "./pages/volunteer/VolunteerApplication";
import JWTUtil from "./utils/JWTUtil";
// import {config} from 'dotenv';


class App extends React.Component<any, any> {
    //
    // constructor(props : any) {
    //     super(props);
    //     config({path: "../"});
    // }

    renderLoginPage() : React.ReactNode {
        return(
            <Fragment>
                <IonRouterOutlet>
                    <Route path="/Login" component={LoginPage} exact={true}/>
                    <Route path="/" render={() => <Redirect to="/Login"/>} exact={true}/>
                </IonRouterOutlet>
            </Fragment>
        )
    }

    renderVolunteerApplication() : React.ReactNode {
        console.log("RENDERING VOLUNTEER APP...");
        return (
            <VolunteerApplication />
        )
    }

    renderManagerApplication() : React.ReactNode {
        console.log("RENDERING MANAGER APP...");
        return (
            <SectorManagerApplication />
        )
    }

    
    renderApplication() : React.ReactNode {

        const token : string | null = localStorage.getItem('token');

        if(token == null)
            return this.renderLoginPage();

        const decodedToken = new JWTUtil().decode(token);

        console.log("DECODED TOKEN", decodedToken);

        if(!this.props.isUserLoggedIn) {
            console.log("NOT LOGGED IN", this.props.isisUserLoggedIn)
            return this.renderLoginPage();
        }else {
            console.log("LOGGED IN", this.props.isisUserLoggedIn)
            return this.renderManagerApplication();
        }

        // TODO Solve the weird error that ! gives a syntax error

        // if(token == null)
        //     return this.renderLoginPage();
        //
        // const isUserLoggedIn = new JWTUtil().verify(token);
        //
        // if(!isUserLoggedIn)
        //     return this.renderLoginPage();

        // TODO Check how to get to the other application

        // TODO Check the permission type inside the token
    }

    render() {
        return (
            <Provider store={store}>
                <IonApp>
                    <Save/>
                    <IonReactRouter>
                        {this.renderApplication()}
                    </IonReactRouter>
                </IonApp>
            </Provider>
        )
    }
}

function mapStateToProps(state: any) {
    return({
        isUserLoggedIn: state.login.isUserLoggedIn,
    })
}

export default connect(mapStateToProps)(App);
