import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchActivePlanningOfUser} from './StartAction'
import {bindActionCreators} from "redux";
import {
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonContent,
} from '@ionic/react';
import {Redirect} from "react-router";
import LocationService from "../../../utils/LocationService";
import {updateGeolocation} from "../info/InfoAction";
import {checkIfUserInPost, reportUserNotInPost} from "./StartAction";
import {BackgroundGeolocationResponse} from "@ionic-native/background-geolocation";
import Auth from "../../../utils/Auth";

class BackgroundLocation extends Component<any> {

    private userID : number;

    constructor(props : any) {
        super(props);
        this.userID = Auth.getAuthenticatedUser().id;
    }

    private async startTracking() {
        const planning = this.props.isActivePlanningFetched;
        if (planning != undefined) {
            const trackingEnd: Date = planning.shift.end;
            const ls : LocationService = new LocationService(this.onLocationUpdate.bind(this), trackingEnd);
            try {
                await ls.start();
            } catch(error) {
                console.log(error);
            }
        } else {
            this.props.fetchActivePlanningOfUser(this.userID);
        }
    }

    private onLocationUpdate(userCoordinates: BackgroundGeolocationResponse) {
        this.props.updateGeolocation(userCoordinates);
        this.props.checkIfUserInPost(this.userID);
        console.log(this.props.isUserOnPost)
        if(!this.props.isUserOnPost) {
            this.props.reportUserNotInPost(this.userID);
        }
    }


    private showContent() {
        this.startTracking()
            .then(() => {
                return (
                    <div>
                        Inloggen...
                        <Redirect to={'/InfoPage'}/>
                    </div>
                )
            })
            .catch(() => {
                return(
                    <div>
                        Traceren niet gelukt!
                    </div>
                )
            })
        return(
            <div>
                Coördinaten laden...
            </div>
        )
    }

    render() {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Welkom!</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">Welkom!</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        {this.showContent()}
                    </IonContent>
                </IonContent>
            </IonPage>
        );
    }
};

function mapStateToProps(state: any) {
    return ({
        isActivePlanningFetched: state.start.isActivePlanningFetched,
        isUserReported: state.start.isUserReported,
        isUserOnPost: state.start.isUserOnPost,
        errorMessage: state.start.errorMessage,
        loading: state.start.loading
    })
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
        fetchActivePlanningOfUser,
        updateGeolocation,
        checkIfUserInPost,
        reportUserNotInPost
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BackgroundLocation);
