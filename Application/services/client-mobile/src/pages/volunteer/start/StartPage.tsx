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
import {updateGeolocation} from "../info/InfoAction";
import {checkIfUserInPost, reportUserNotInPost} from "./StartAction";

class StartPage extends Component<any> {

    componentDidMount() {
        console.log("FETCHING ACTIVE PLANNING..")
        this.props.fetchActivePlanningOfUser(1);
        console.log("FETCHED ACTIVE PLANNING")
    }

    private handleUpdateUserCheckInStatus(event: any): void {
        console.log("HANDLE UPDATE CKECKIN STATUS");
        event.preventDefault();
        this.props.updateUserCheckInStatus(1);
        console.log("UPDATE CHECKIN STATUS")
    }

    private showContent() {
        console.log("---- ACTIVE PLANNING HIT", this.props.isActivePlanningFetched)
        const planning = this.props.isActivePlanningFetched;
        if (planning != undefined) {
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
                return(
                    <div>
                        Redirecting...
                        <Redirect to={'/InfoPage'}/>
                    </div>
                )
            }
        } else {
            return (
                <div>
                    Loading...
                </div>
            )
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
        errorMessage: state.start.errorMessage,
        loading: state.start.loading
    })
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
        fetchActivePlanningOfUser,
        updateUserCheckInStatus,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);
