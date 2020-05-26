import {IonIcon, IonBadge, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from "@ionic/react";
import {Route} from "react-router-dom";
import ListView from "./list/ListPage";
import MapPage from "./map/MapPage";
import PostView from "./post/PostPage";
import PersonPage from "./person/PersonPage";
import MessageGeneral from './messages_general/MessageGeneralPage'
import Contacts from "./contact/ContactPage";
import {listOutline, mapOutline, notificationsOutline, paperPlaneOutline, personOutline} from "ionicons/icons";
import React, { useState, Component }  from "react";
import RequireSignIn from "../../utils/RequireSignin";
import { IonLoading, IonButton, IonContent } from '@ionic/react';
import { bindActionCreators } from "redux";
import { doDatabase } from "../save/saveAction";
import { connect } from "react-redux";


class SectorManagerApplication extends Component<any> {
    interval: NodeJS.Timeout | undefined;

    constructor(props: any) {
        super(props);
    }

    // TODO: Add message count back
    componentDidMount(){
        this.props.doDatabase();

        this.interval = setInterval(() => {
          this.props.doDatabase();
        }, 5000); //TODO interval
      }

      componentWillUnmount() {
        if(this.interval != undefined){
          clearInterval(this.interval);
        }
      }


    render(){
        return(
            <IonTabs>
            <IonRouterOutlet>
                <Route path="/MapPage" component={RequireSignIn(MapPage)} />
                <Route path="/ListView" component={RequireSignIn(ListView)} />
                <Route path="/PostView/:sector/:post" component={RequireSignIn(PostView)} />
                <Route path="/PersonPage/:id/" component={RequireSignIn(PersonPage)} />
                <Route path="/Notifications" component={RequireSignIn(MessageGeneral)} />
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
                    <IonBadge color="primary">{0}</IonBadge>
                    <IonIcon icon={notificationsOutline}/>
                    <IonLabel>Berichten</IonLabel>
                </IonTabButton>
                <IonTabButton tab="Contacts" href="/Contacts">
                    <IonIcon icon={personOutline}/>
                    <IonLabel>Contacts</IonLabel>
                </IonTabButton>
            </IonTabBar>
            </IonTabs>
        )
    }
    }
    

function mapStateToProps(state: any) {
    return({
    })
  }
  
  function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
      doDatabase
    }, dispatch);
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(SectorManagerApplication);