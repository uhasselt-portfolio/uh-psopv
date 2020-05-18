import {IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from "@ionic/react";
import {Redirect, Route} from "react-router-dom";
import ListView from "./list/ListPage";
import MapPage from "./map/MapPage";
import PostView from "./post/PostPage";
import PersonPage from "./person/PersonPage";
import Notifications from "./message/MessagePage";
import SendNotifications from "./send_message/SendMessage";
import Contacts from "./contact/ContactPage";
import {listOutline, mapOutline, notificationsOutline, paperPlaneOutline, personOutline} from "ionicons/icons";
import React, {Fragment} from "react";

export default () => {
    return(
        <IonTabs>
            <IonRouterOutlet>
                <Route path="/ListView" component={ListView} exact={true}/>
                <Route path="/MapPage" component={MapPage} exact={true}/>
                <Route path="/PostView/:post/:sector" component={PostView} exact={true}/>
                <Route path="/PersonPage/:id/" component={PersonPage} exact={true}/>
                <Route path="/Notifications" component={Notifications} exact={true}/>
                <Route path="/SendNotifications" component={SendNotifications} exact={true}/>
                <Route path="/Contacts" component={Contacts} exact={true}/>

                <Route path="/Login" render={() => <Redirect to="/"/>} exact={true}/>
                <Route path="/" render={() => <Redirect to="/MapPage"/>} exact={true}/>
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