import {IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from "@ionic/react";
import {Route} from "react-router-dom";
import ListView from "./list/ListPage";
import MapPage from "./map/MapPage";
import PostView from "./post/PostPage";
import PersonPage from "./person/PersonPage";
import Notifications from "./message/MessagePage";
import SendNotifications from "./send_message/SendMessage";
import Contacts from "./contact/ContactPage";
import {listOutline, mapOutline, notificationsOutline, paperPlaneOutline, personOutline} from "ionicons/icons";
import React from "react";
import RequireSignIn from "../../utils/RequireSignin";

export default () => {
    return(
        <IonTabs>
            <IonRouterOutlet>
                <Route path="/MapPage" component={RequireSignIn(MapPage)} />
                <Route path="/ListView" component={RequireSignIn(ListView)} />
                <Route path="/PostView/:post/:sector" component={RequireSignIn(PostView)} />
                <Route path="/PersonPage/:id/" component={RequireSignIn(PersonPage)} />
                <Route path="/Notifications" component={RequireSignIn(Notifications)} />
                <Route path="/SendNotifications" component={RequireSignIn(SendNotifications)} />
                <Route path="/Contacts" component={RequireSignIn(Contacts)} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="MapPage" href="/MapPage">
                    <IonIcon icon={mapOutline}/>
                    <IonLabel>Post-Kaart</IonLabel>
                </IonTabButton>
                <IonTabButton tab="ListView" href="/ListView">
                    <IonIcon icon={listOutline}/>
                    <IonLabel>Post-Lijst</IonLabel>
                </IonTabButton>
                <IonTabButton tab="Notifications" href="/Notifications">
                    <IonIcon icon={notificationsOutline}/>
                    <IonLabel>Notificaties</IonLabel>
                </IonTabButton>
                <IonTabButton tab="SendNotifications" href="/SendNotifications">
                    <IonIcon icon={paperPlaneOutline}/>
                    <IonLabel text-wrap>Verstuur</IonLabel>
                </IonTabButton>
                <IonTabButton tab="Contacts" href="/Contacts">
                    <IonIcon icon={personOutline}/>
                    <IonLabel>Contacts</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    )
}