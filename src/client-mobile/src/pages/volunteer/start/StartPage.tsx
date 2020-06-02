import React, {Component, ReactNode} from 'react';
import {connect} from "react-redux";
import {fetchActivePlanningOfUser, fetchPlannings, updateUserCheckInStatus} from './StartAction'
import {bindActionCreators} from "redux";
import {IonCard, IonCardContent, IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import {Redirect} from "react-router";
import Auth from "../../../utils/Auth";
import PlanningItem from "./components/PlanningItem";
 
class StartPage extends Component<any> {
 
    componentDidMount() {
        const user = Auth.getAuthenticatedUser();
        this.props.fetchActivePlanningOfUser(user.id);
    }
 
    private handleUpdateUserCheckInStatus(event: any): void {
        console.log("Updating checkin status")
        event.preventDefault();
        this.props.updateUserCheckInStatus(1);
        console.log("Updated checking status")
    }
 
    private renderNextShift(nextPlanning: any): ReactNode {
        if (!nextPlanning) {
            return (
                <IonCard>
                    <IonCardContent>
                        Geen nieuwe shiften gevonden!
                    </IonCardContent>
                </IonCard>
            )
        }
 
        return <PlanningItem planning={nextPlanning}/>
 
    }
 
    private renderFutureShifts(planning: any): ReactNode {
        if (planning.length == 0) {
            return (
                <IonCard>
                    <IonCardContent>
                        Geen nieuwe shiften gevonden!
                    </IonCardContent>
                </IonCard>
            )
        } else {
            return (
                <IonList>
                    {planning}
                </IonList>
            )
        }
    }
 
    private renderActiveShift(planning : any) : ReactNode {
        if(planning == undefined) {
            return (
                <IonCard>
                    <IonCardContent>
                        Laden...
                    </IonCardContent>
                </IonCard>
            )
        }
 
        if(!planning) {
            return(
                <IonCard>
                    <IonCardContent>
                        Jij hebt op dit moment geen actieve shift!
                    </IonCardContent>
                </IonCard>
            )
        }
 
        return(
            <PlanningItem planning={planning} button={true} action={this.handleUpdateUserCheckInStatus.bind(this)}/>
        )
    }
 
    private renderPlanning() {
        const activePlanning = this.props.isActivePlanningFetched;
        const plannings = this.props.isUserPlanningFetched;
        console.log("plannings", plannings);
 
        if (plannings == undefined) {
            const user = Auth.getAuthenticatedUser();
            this.props.fetchPlannings(user.id);
            return (
                <IonCard>
                    <IonCardContent>
                        Planning aan het laden...
                    </IonCardContent>
                </IonCard>
            )
        }
 
        const firstPlanning = plannings.shift();
 
        const planningItems = plannings.map((planning: any) => {
            return <PlanningItem planning={planning}/>
        })
 
        return (
            <div>
                <IonTitle className="ion-padding-bottom ion-padding-top">
                    Huidige Shift
                </IonTitle>
                {this.renderActiveShift(activePlanning)}
                <IonTitle className="ion-padding-bottom">
                    Volgende Shift
                </IonTitle>
                {this.renderNextShift(firstPlanning)}
                <IonTitle className="ion-padding-bottom">
                    Toekomstige Shiften
                </IonTitle>
                {this.renderFutureShifts(planningItems)}
            </div>
        )
    }
 
    private showContent() {
        console.log()
        const planning = this.props.isActivePlanningFetched;

        if (planning == undefined) {
            return (
                <IonCard>
                    <IonCardContent>
                        Planning aan het laden...
                    </IonCardContent>
                </IonCard>
            )
        }
 
        if(!planning.checked_in)
            return this.renderPlanning();
 
        return (
            <div>
                Redirecting...
                <Redirect to={'/InfoPage'}/>
            </div>
        )
    }
 
    render() {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Pukkelpop</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">Pukkelpop</IonTitle>
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
        isUserPlanningFetched: state.start.isUserPlanningFetched,
        isCheckInStatusUpdated: state.start.isCheckInStatusUpdated,
        errorMessage: state.start.errorMessage,
        loading: state.start.loading
    })
}
 
function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
        fetchActivePlanningOfUser,
        fetchPlannings,
        updateUserCheckInStatus,
    }, dispatch);
}
 
export default connect(mapStateToProps, mapDispatchToProps)(StartPage);