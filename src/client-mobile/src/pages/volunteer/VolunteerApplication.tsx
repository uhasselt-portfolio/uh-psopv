import {IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonBadge, IonPage, withIonLifeCycle} from "@ionic/react";
import {Route} from "react-router-dom";
import InfoPage from "./info/InfoPage";
import Message from '../volunteer/messages/MessagePage'
import SendMessage from '../volunteer/messages/SendMessagePage'

import {ellipse, notificationsOutline, paperPlaneOutline, informationCircleOutline} from "ionicons/icons";
import React, {Component} from "react";
import RequireSignIn from "../../utils/RequireSignin";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {doDatabase} from "../save/saveAction";
import StartPage from "./start/StartPage";


class VolunteerApplication extends Component<any> {
    interval: NodeJS.Timeout | undefined;

    constructor(props: any) {
        super(props);
    }

    // TODO: Add message count back
    componentDidMount() {
        this.props.doDatabase();

        this.interval = setInterval(() => {
          if(navigator.onLine){
            this.props.doDatabase();
          } else{
            // do nothing
          }
        }, 5000); //TODO interval
    }

    componentWillUnmount() {
        if (this.interval != undefined) {
            clearInterval(this.interval);
        }
    }

    render() {
        return (
            <IonPage>
                <IonTabs>
                    <IonRouterOutlet>
                        <Route path="/InfoPage" component={RequireSignIn(InfoPage)}/>
                        <Route path="/Messages" component={RequireSignIn(Message)}/>
                        <Route path="/SendMessage" component={RequireSignIn(SendMessage)}/>
                    </IonRouterOutlet>
                    <IonTabBar slot="bottom">
                        <IonTabButton tab="InfoPage" href="/InfoPage">
                            <IonIcon icon={informationCircleOutline}/>
                            <IonLabel>Info</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="Messages" href="/Messages">
                            <IonBadge color="primary">{0}</IonBadge>
                            <IonIcon icon={notificationsOutline}/>
                            <IonLabel>Berichten</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="SendMessage" href="/SendMessage">
                            <IonIcon icon={paperPlaneOutline}/>
                            <IonLabel>Verstuur bericht</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonPage>
        )
    }
}


function mapStateToProps(state: any) {
    return ({})
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
        doDatabase
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(withIonLifeCycle(VolunteerApplication));