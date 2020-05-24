import {IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonBadge} from "@ionic/react";
import {Route} from "react-router-dom";
import InfoPage from "./info/InfoPage";
import Message from '../volunteer/messages/MessagePage'
import SendMessage from '../volunteer/messages/SendMessagePage'

import {ellipse, notificationsOutline, paperPlaneOutline, informationCircleOutline} from "ionicons/icons";
import React from "react";
import RequireSignIn from "../../utils/RequireSignin";

export default () => {
    return(
        <IonTabs>
            <IonRouterOutlet>
                <Route path="/InfoPage" component={RequireSignIn(InfoPage)} />
                <Route path="/Messages" component={RequireSignIn(Message)} />
                <Route path="/SendMessage" component={RequireSignIn(SendMessage)} />
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
    )
}