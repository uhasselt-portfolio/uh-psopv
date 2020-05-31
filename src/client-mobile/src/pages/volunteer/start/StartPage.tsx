import React, {Component, ReactNode} from 'react';
import {connect} from "react-redux";
import {fetchPlannings, updateUserCheckInStatus} from './StartAction'
import {bindActionCreators} from "redux";
import {IonCard, IonCardContent, IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import {Redirect} from "react-router";
import Auth from "../../../utils/Auth";
import PlanningItem from "./components/PlanningItem";
import {doDatabase} from '../../save/saveAction'
import FuturePlanningItem from './components/FuturePlanningItem';


const TIME_IN_MS: number = 2000;

class StartPage extends Component<any> {

    constructor(props: any){
        super(props)
        let hideFooterTimeout = setTimeout( () => {
            this.props.fetchPlannings();
        }, TIME_IN_MS);
    }

    componentDidMount() {
        this.props.fetchPlannings();
        this.props.doDatabase();
    }
    
    private handleUpdateUserCheckInStatus(event: any): void {
        console.log("Updating checkin status")
        event.preventDefault();
        this.props.updateUserCheckInStatus(Auth.getAuthenticatedUser().id);
        console.log("Updated checking status")
    }

    private renderFutureShifts(): ReactNode {
        const future_plannings = this.props.isUserPlanningFetched.future_plannings
       
        if (future_plannings.length == 0) {
            return (
                <IonCardContent>
                    Geen nieuwe shiften gevonden!
                </IonCardContent>
            )
        } else {
            return future_plannings.map((planning: any) => {
                return <FuturePlanningItem planning={planning} button={true} action={this.handleUpdateUserCheckInStatus.bind(this)}/>
            }) 
        }
    }

    private renderActiveShift() : ReactNode {
        const current_planning = this.props.isUserPlanningFetched.current_planning;

        if(current_planning === undefined) {
            return (
                <IonCard>
                    <IonCardContent>
                        Laden...
                    </IonCardContent>
                </IonCard>
            )
        } 

        if(current_planning === undefined) {
            return(
                <IonCard>
                    <IonCardContent>
                        Jij hebt op dit moment geen actieve shift!
                    </IonCardContent>
                </IonCard>
            )
        }

        return(
            <PlanningItem planning={current_planning} button={true} action={this.handleUpdateUserCheckInStatus.bind(this)}/>
        )
    }

    private renderPlanning() {
        const plannings = this.props.isUserPlanningFetched

        if (plannings == undefined) {
            const user = Auth.getAuthenticatedUser();
            this.props.fetchPlannings(Auth.getAuthenticatedUser().id);
            return (
                <IonCard>
                    <IonCardContent>
                        Planning aan het laden...
                    </IonCardContent>
                </IonCard>
            )
        }

        return (
            <div>
                <IonTitle className="ion-padding-bottom ion-padding-top">
                    Huidige Shift
                </IonTitle>
                {this.renderActiveShift()}
                <IonTitle className="ion-padding-bottom">
                    Toekomstige Shiften
                </IonTitle>
                <IonCard>
                    <IonCardContent>
                    {this.renderFutureShifts()}
                    </IonCardContent>
                </IonCard>
            </div>
        )
    }

    private showContent() {
        const planning = this.props.isUserPlanningFetched;
        const isCheckedIn = this.props.isCheckInStatusUpdated;

        if (planning == undefined) {
            return (
                <IonCard>
                    <IonCardContent>
                        Planning aan het laden...
                    </IonCardContent>
                </IonCard>
            )
        }

        if(!isCheckedIn)
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
        isUserPlanningFetched: state.start.isUserPlanningFetched,
        isCheckInStatusUpdated: state.start.isCheckInStatusUpdated,
        errorMessage: state.start.errorMessage,
        loading: state.start.loading
    })
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
        fetchPlannings,
        updateUserCheckInStatus,
        doDatabase
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);
