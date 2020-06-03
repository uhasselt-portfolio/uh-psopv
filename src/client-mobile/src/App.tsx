import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {IonApp, IonRouterOutlet} from '@ionic/react';
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

import SectorManagerApplication from "./pages/sector-responsible/SectorManagerApplication";
import VolunteerApplication from "./pages/volunteer/VolunteerApplication";
import Auth from "./utils/Auth";
import StartPage from "./pages/volunteer/start/StartPage";
import {bindActionCreators} from "redux";
import BackgroundLocation from "./pages/volunteer/start/BackgroundLocation";

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    renderLoginPage(): React.ReactNode {
        return (
            <IonRouterOutlet>
                <Route path="/" component={LoginPage}/>
            </IonRouterOutlet>
        )
    }

    renderVolunteerApplication(): React.ReactNode {
        const isActivePlanningFetched = this.props.isActivePlanningFetched;

        if (this.props.isCheckInStatusUpdated || (isActivePlanningFetched != null && isActivePlanningFetched.checked_in)) {
            console.log("VOLUNTEER APP")
            return (
                <div>
                    <Redirect from="/BackgroundLocation" to="/InfoPage"/>
                    <Redirect from="/" to="/InfoPage"/>
                    <VolunteerApplication/>
                </div>
            )
        }

        return (
            <IonRouterOutlet>
                <Route path="/BackgroundLocation" component={BackgroundLocation} exact />
                <Route path="/" component={StartPage} exact />
            </IonRouterOutlet>
        )

    }

    renderManagerApplication(): React.ReactNode {
        return (
            <div>
                <Redirect from="/" to="/MapPage"/>
                <SectorManagerApplication/>
            </div>
        )
    }

    renderApplication(): React.ReactNode {
        const loggedIn = Auth.isAuthenticated();
        console.log("IS USER LOGGED IN TRIGGER ON RENDER APPLICATION")
        console.log(loggedIn || this.props.isUserLoggedIn);
        console.log(loggedIn);
        console.log(this.props.isUserLoggedIn);
        if (loggedIn || this.props.isUserLoggedIn) {

            const user = Auth.getAuthenticatedUser();

            if (user.permission_type_id == '1') {
                console.log("Rendering vol app..")
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
    return ({
        isUserLoggedIn: state.login.isUserLoggedIn,
        isCheckInStatusUpdated: state.start.isCheckInStatusUpdated,
        isActivePlanningFetched: state.start.isActivePlanningFetched
    })
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({}, dispatch);
}


export default connect(mapStateToProps)(App);