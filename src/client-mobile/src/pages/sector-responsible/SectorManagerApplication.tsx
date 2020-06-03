import {IonIcon, IonBadge, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, withIonLifeCycle} from "@ionic/react";
import {Route} from "react-router-dom";
import ListView from "./list/ListPage";
import MapPage from "./map/MapPage";
import PostView from "./post/PostPage";
import PersonPage from "./person/PersonPage";
import MessageGeneral from './messages_general/MessageGeneralPage'
import Contacts from "./contact/ContactPage";
import {listOutline, mapOutline, notificationsOutline, personOutline} from "ionicons/icons";
import React, {Component} from "react";
import RequireSignIn from "../../utils/RequireSignin";
import {bindActionCreators} from "redux";
import {doDatabase, updateMessages} from "../save/saveAction";
import {connect} from "react-redux";
import { getListLocalStorage } from "../save/saveFunction";

class SectorManagerApplication extends Component<any> {
    interval: NodeJS.Timeout | undefined;

    constructor(props: any) {
        super(props);
        this.updateMessageCount();
    }

    state = {
        msg_count: 0
    }

    async updateMessageCount(){
        let amount = Number(await getListLocalStorage('total_msg'));
        this.setState({msg_count: amount})
    }

    componentDidMount() {
        this.props.doDatabase();

        this.interval = setInterval(() => {
          if(navigator.onLine){
            this.props.doDatabase();
            this.props.updateMessages();
          } else{
            // do nothing
          }
        }, 10000);
    }

    componentWillUnmount() {
        if (this.interval != undefined) {
            clearInterval(this.interval);
        }
    }


    render() {
        console.log(this.props)
        return (
            <IonTabs>
            <IonRouterOutlet>
                <Route path="/MapPage" component={RequireSignIn(MapPage)} />
                <Route path="/ListView" component={RequireSignIn(ListView)}/>
                {/* <Route path="/PostView"  > */}
                    <Route path="/PostView/:sector/:post" component={RequireSignIn(PostView)} />
                {/* </Route> */}
                <Route path="/PersonPage"  >
                    <Route path="/PersonPage/:id/" component={RequireSignIn(PersonPage)} />
                </Route>
                <Route path="/Notifications" component={RequireSignIn(MessageGeneral)} />
                <Route path="/Contacts" component={RequireSignIn(Contacts)} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="MapPage" href="/MapPage" >
                    <IonIcon icon={mapOutline}/>
                    <IonLabel>Post-Kaart</IonLabel>
                </IonTabButton>
                <IonTabButton tab="ListView" href="/ListView">
                    <IonIcon icon={listOutline}/>
                    <IonLabel>Post-Lijst</IonLabel>
                </IonTabButton>
                <IonTabButton tab="Notifications" href="/Notifications">
                    <IonBadge color="primary">{this.state.msg_count}</IonBadge>
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
    return ({})
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
        doDatabase,
        updateMessages
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(withIonLifeCycle(SectorManagerApplication));