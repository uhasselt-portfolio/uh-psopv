import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchActivePlanningOfUser, updateUserCheckInStatus} from './StartAction'
import {bindActionCreators} from "redux";
import {
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonLabel,
    IonContent,
    IonButton
} from '@ionic/react';
import {Redirect} from "react-router";
import LocationService from "../../../utils/LocationService";
import {updateGeolocation} from "../info/InfoAction";
import {checkIfUserInPost, reportUserNotInPost} from "./StartAction";

class StartPage extends Component<any> {

    componentDidMount() {
        console.log("FETCHING ACTIVE PLANNING..")
        this.props.fetchActivePlanningOfUser(1);
        console.log("FETCHED ACTIVE PLANNING")
    }

    private startTracking() {
        console.log("START TRACKING")
        const planning = this.props.isActivePlanningFetched;
        if (planning != undefined) {
            const trackingEnd: Date = planning.shift.end;
            new LocationService(this.onLocationUpdate.bind(this), trackingEnd).start();
        }
    }

    private onLocationUpdate() {
        console.log("ON LOCATION UPDATE")
        this.props.updateGeolocation();
        const isUserOnPost: boolean = this.props.isUserOnPost(1);
        console.log("IS USER ON POST?", isUserOnPost)
        if(!isUserOnPost) {
            console.log("USER NOT ON POST")
            this.props.reportUserNotInPost(1);
        }
    }

    private handleUpdateUserCheckInStatus(event: any): void {
        console.log("HANDLE UPDATE CKECKIN STATUS");
        event.preventDefault();
        this.props.updateUserCheckInStatus(1);
        console.log("UPDATE CHECKIN STATUS")
    }

    private showContent() {
        if (this.props.loading == true) {
            return <div>Loading...</div>
        } else {
            const planning = this.props.isActivePlanningFetched;
            if (planning !== undefined) {
                console.log("IS USER CHECKECKIN: ", planning.checked_in)
                if (!planning.checked_in) {
                    return (
                        <div>
                            <IonLabel>
                                Start je shift door op de knop te drukken!
                            </IonLabel>
                            <IonButton onClick={this.handleUpdateUserCheckInStatus.bind(this)}>
                                Start shift
                            </IonButton>
                        </div>
                    )
                } else {
                    this.startTracking();
                    return (
                        <div>
                            Inloggen...
                            <Redirect to={'/InfoPage'}/>
                        </div>
                    )
                }
            } else {
                return (
                    <div>
                        Er is geen actieve shift gevonden, je volgende shift is....
                    </div>
                )
            }
        }
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
        updateUserCheckInStatus,
        updateGeolocation,
        checkIfUserInPost,
        reportUserNotInPost
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);
