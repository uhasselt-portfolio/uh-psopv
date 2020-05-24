import {IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from "@ionic/react";
import {Route} from "react-router-dom";
import InfoPage from "./info/InfoPage";
import VRMessage from "./message/VR_MessagePage";
import VRSendMessagePage from "./send_message/VR_SendMessage";
import {ellipse} from "ionicons/icons";
import React from "react";
import RequireSignIn from "../../utils/RequireSignin";

export default () => {
    return(
        <IonTabs>
            <IonRouterOutlet>
                <Route path="/InfoPage" component={RequireSignIn(InfoPage)} />
                <Route path="/VRMessage" component={RequireSignIn(VRMessage)} />
                <Route path="/VRSendMessagePage" component={RequireSignIn(VRSendMessagePage)} />
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