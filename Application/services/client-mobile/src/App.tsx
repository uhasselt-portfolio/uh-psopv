import React, {useState} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {
    IonApp,
    IonContent,
    IonHeader,
    IonItem, IonList,
    IonPage,
    IonRouterOutlet,
    IonText,
    IonTitle,
    IonToolbar,
    withIonLifeCycle
} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import LoginPage from './pages/login/LoginPage';
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
import {connect} from 'react-redux';
/* Theme variables */
import './theme/variables.css';
import Save from './pages/save/savePage'

import SectorManagerApplication from "./pages/sector-responsible/SectorManagerApplication";
import VolunteerApplication from "./pages/volunteer/VolunteerApplication";
import Auth from "./utils/Auth";

class App extends React.Component<any, any> {
    constructor(props: any, storage: Storage) {
        super(props);
    }

    renderLoginPage() : React.ReactNode {
        return(
            <IonRouterOutlet>
                <Route path="/" component={LoginPage} />
            </IonRouterOutlet>
        )
    }

    renderVolunteerApplication() : React.ReactNode {
        return (
            <>
                <Redirect from="/" to="/InfoPage" />
                <VolunteerApplication />
            </>
        )
    }

    renderManagerApplication() : React.ReactNode {
        return (
            <>
                <Redirect from="/" to="/MapPage" />
                <SectorManagerApplication />
            </>
        )
    }
    
    renderApplication() : React.ReactNode {
        const loggedIn = Auth.isAuthenticated();

        if(loggedIn && this.props.isUserLoggedIn) {

            const user = Auth.getAuthenticatedUser();

            if(user.permission_type_id == '1') {
                return this.renderVolunteerApplication();
            } else {
                return this.renderManagerApplication();
            }
        } else {
            return this.renderLoginPage();
        }
    }

    render() {
        return (
            <IonApp>
                <IonReactRouter>
                    <Switch>
                        {this.renderApplication()}
                    </Switch>
                </IonReactRouter>
            </IonApp>
        )
    }
}

function mapStateToProps(state: any) {
    return({
        isUserLoggedIn: state.login.isUserLoggedIn,
    })
}

export default connect(mapStateToProps)(App);
