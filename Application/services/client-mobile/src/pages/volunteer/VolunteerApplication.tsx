import {IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from "@ionic/react";
import {Redirect, Route} from "react-router-dom";
import InfoPage from "./info/InfoPage";
import VRMessage from "./message/VR_MessagePage";
import VRSendMessagePage from "./send_message/VR_SendMessage";
import {ellipse} from "ionicons/icons";
import React, {Fragment} from "react";

export default () => {
    return(
        <IonTabs>
            <IonRouterOutlet>
                <Route path="/" component={InfoPage} exact={true}/>
                <Route path="/VRMessage" component={VRMessage} exact={true}/>
                <Route path="/VRSendMessagePage" component={VRSendMessagePage} exact={true}/>
                <Route path="/" render={() => <Redirect to="/InfoPage"/>} exact={true}/>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="InfoPage" href="/InfoPage">
                    <IonIcon icon={ellipse}/>
                    <IonLabel>Map</IonLabel>
                </IonTabButton>
                <IonTabButton tab="VRMessage" href="/VRMessage">
                    <IonIcon icon={ellipse}/>
                    <IonLabel>Msg</IonLabel>
                </IonTabButton>
                <IonTabButton tab="VRSendMessagePage" href="/VRSendMessagePage">
                    <IonIcon icon={ellipse}/>
                    <IonLabel>Send</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    )
}