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
import LocationService from "../../../utils/LocationService";
import {updateGeolocation} from "../info/InfoAction";
import {checkIfUserInPost, reportUserNotInPost, updateUserCheckInStatus} from "./StartAction";
import {BackgroundGeolocation, BackgroundGeolocationResponse} from "@ionic-native/background-geolocation";
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
            ls.start().then(() => {
                this.props.updateUserCheckInStatus(this.userID);
                BackgroundGeolocation.start();
            });
        } else {
            this.props.fetchActivePlanningOfUser(this.userID);
        }
    }

    private onLocationUpdate(userCoordinates: BackgroundGeolocationResponse) {
        this.props.updateGeolocation(userCoordinates);
        this.props.checkIfUserInPost(this.userID);
        if(!this.props.isUserOnPost) {
            this.props.reportUserNotInPost(this.userID);
        }
    }


    private showContent() {
        this.startTracking();

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
        isCheckInStatusUpdated: state.start.isCheckInStatusUpdated,
        isUserReported: state.start.isUserReported,
        isUserOnPost: state.start.isUserOnPost,
        errorMessage: state.start.errorMessage,
        loading: state.start.loading
    })
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
        fetchActivePlanningOfUser,
        updateUserCheckInStatus,
        updateGeolocation,
        checkIfUserInPost,
        reportUserNotInPost
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BackgroundLocation);
