import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateGeolocation} from './InfoAction'; 
import {fetchPlannings, checkIfUserInPost, reportUserNotInPost} from "../start/StartAction";
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonLoading,
    IonButton
} from '@ionic/react';
import './InfoPage.css'
import {BackgroundGeolocation, BackgroundGeolocationEvents} from "@ionic-native/background-geolocation";
import Map from '../../sector-responsible/map/components/Map';
import { formatDateTime } from '../../../utils/DateUtil';
import Auth from '../../../utils/Auth';
import { resetLocalStorage } from '../../save/saveFunction';
import { withRouter } from 'react-router';

const TIME_IN_MS: number = 2000;
class InfoPage extends React.Component<any, any> {
    constructor(props: any){
        super(props)

        let hideFooterTimeout = setTimeout( () => {
            this.setState({...this.state, loaded: true})
            this.props.fetchPlannings();
        }, TIME_IN_MS);
    }

    state = {
        loaded: false
    }

    componentDidMount() {
        this.props.fetchPlannings();

        let HIGH = 10;
        const config = {
            desiredAccuracy: HIGH,
            stationaryRadius: 5,
            interval: 30000,
            distanceFilter: 5,
            notificationTitle: 'Pukkelpop App',
            notificationText: 'Locatie tracking',
            debug: true, //  enable this hear sounds for background-geolocation life-cycle.
            stopOnTerminate: false, // enable this to clear background location settings when the app terminates
        };

        BackgroundGeolocation.configure(config)
            .then(() => {
                BackgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location) => {
                    console.log("location: ", location)

                    this.props.updateGeolocation(location);
                    this.props.checkIfUserInPost(Auth.getAuthenticatedUser().id);
                    if(!this.props.isUserOnPost) {
                        this.props.reportUserNotInPost(Auth.getAuthenticatedUser().id);
                    }

                    BackgroundGeolocation.finish(); // FOR IOS ONLY
                });
            });
        BackgroundGeolocation.start();
        BackgroundGeolocation.stop();
    }

    showShiftInfo(shift_data: any) {
        console.log(shift_data)
        return (
            <IonCard key={shift_data.id}>
                <IonCardHeader>
                    <IonCardTitle>
                        Shift info
                    </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="2">Wie</IonCol>
                            <IonCol>{shift_data.user_name}</IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="2">Wat</IonCol>
                            <IonCol>{shift_data.post_description}</IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="2">Waar</IonCol>
                            <IonCol> {shift_data.post_title}, 
                            <p>{shift_data.post_address}</p></IonCol>
                        </IonRow>

                        <IonRow>
                            <IonCol size="2">Start</IonCol>
                            <IonCol>{formatDateTime(shift_data.shift_begin)}</IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="2">Einde</IonCol>
                            <IonCol>{formatDateTime(shift_data.shift_end)}</IonCol>
                        </IonRow>
                    </IonGrid>

                    <div className="GoogleMapsInfo">
                       <Map problems={[]} users={[]} posts={[{
                            latitude: shift_data.latitude, 
                            longitude: shift_data.longitude,
                            title: shift_data.post_title}]} isMarkerClickable={false} containerId={"map" + shift_data.id} 
                            centerLat={shift_data.latitude}
                            centerLong={ shift_data.longitude}
                           mapHeight={200}/>
                        </div>
                </IonCardContent>
            </IonCard>
        )
    }

    renderCurrentShiftList(){
        const plannings = this.props.localStorage;

        if (plannings !== undefined) {
            if (plannings.current_planning === undefined) {
                return <div> Geen actieve shift </div>
            } else {
                    return this.showShiftInfo(plannings.current_planning)
            }
        } else {
            return <div>Laden...</div>
        }
    }
    private renderFutureShiftList() {
        const plannings = this.props.localStorage;

        if (plannings !== undefined) {
            if (plannings.length <= 0) {
                return <div> No messages found. </div>
            } else {
                return plannings.future_plannings.map((data: any, index:number) => {
                    return this.showShiftInfo(data)
                })
            }
        } else {
            return <div>Laden...</div>
        }
    }

    async logOut() {
        await resetLocalStorage();
        this.props.history.push( "/LoginPage")
        window.location.reload();
    }
    
    render() {
        console.log(this.props)
        if(this.state.loaded){
            return (
                <IonPage>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Shift info 
                            <IonButton onClick={() => this.logOut()}>Uitloggen</IonButton>
                            </IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <IonTitle className="marginTop">Huidige shift</IonTitle>
                        {this.renderCurrentShiftList()}
                        <IonTitle className="marginTop">Toekomstige shift(en)</IonTitle>
                        {this.renderFutureShiftList()}
                    </IonContent>
                </IonPage>
                )
            } else{
            return(
                <IonPage>
                    <IonLoading
                        cssClass='my-custom-class'
                        isOpen={!this.state.loaded}
                        onDidDismiss={() => this.setState({...this.state, loaded: true})}
                        message={'Gegevens Laden...'}
                        duration={TIME_IN_MS}
                    />
                </IonPage>
            )
          }
    }
}

function mapStateToProps(state: any) {
    return ({
        localStorage: state.start.isUserPlanningFetched,
        isUserOnPost: true, //TODO state.start.isUserOnPost gaf error
        isLocationUpdated: state.VRinfo.isLocationUpdated,
        errorMessage: state.VRinfo.errorMessage,
        loading: state.VRinfo.loading,
    })
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
        updateGeolocation,
        fetchPlannings,
        checkIfUserInPost,
        reportUserNotInPost
    }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InfoPage));

  
