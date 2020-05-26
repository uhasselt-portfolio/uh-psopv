import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchPlanningsFromId, updateGeolocation} from './InfoAction';
import {checkIfUserInPost, reportUserNotInPost} from "../start/StartAction";
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
    IonLoading
} from '@ionic/react';
import './InfoPage.css'
import {BackgroundGeolocation, BackgroundGeolocationEvents} from "@ionic-native/background-geolocation";
import Map from '../../sector-responsible/map/components/Map';
import { formatDateTime } from '../../../utils/DateUtil';

const TIME_IN_MS: number = 2000;
class InfoPage extends React.Component<any, any> {
    constructor(props: any){
        super(props)

        let hideFooterTimeout = setTimeout( () => {
            this.setState({...this.state, loaded: true})
            this.props.fetchPlanningsFromId();
        }, TIME_IN_MS);
    }

    state = {
        loaded: false
    }

    componentDidMount() {
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
                    this.props.checkIfUserInPost(1);
                    if(!this.props.isUserOnPost) {
                        this.props.reportUserNotInPost(1);
                    }

                    BackgroundGeolocation.finish(); // FOR IOS ONLY
                });
            });
        BackgroundGeolocation.start();
        BackgroundGeolocation.stop();
        this.props.fetchPlanningsFromId(1);
    }

    private showShiftInfo(shift_data: any, index: number) {
        return (
            <IonCard key={shift_data.id}>
                <IonCardHeader>
                    <IonCardTitle>
                        Shift info ({index+1})
                    </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="2">Wie</IonCol>
                            <IonCol>{shift_data.user.first_name + " " +shift_data.user.last_name}</IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="2">Wat</IonCol>
                            <IonCol>{shift_data.post.general_post.description}</IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="2">Waar</IonCol>
                            <IonCol> {shift_data.post.title}, 
                            <p>{shift_data.post.address}</p></IonCol>
                        </IonRow>

                        <IonRow>
                            <IonCol size="2">Start</IonCol>
                            <IonCol>{formatDateTime(shift_data.shift.begin)}</IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="2">Einde</IonCol>
                            <IonCol>{formatDateTime(shift_data.shift.end)}</IonCol>
                        </IonRow>
                    </IonGrid>

                    <div className="GoogleMapsInfo">
                       <Map problems={[]} users={[]} posts={[{
                            latitude: shift_data.post.latitude, 
                            longitude: shift_data.post.longitude,
                            title: shift_data.post.title}]} isMarkerClickable={false} containerId={"map" + shift_data.id} 
                            centerLat={shift_data.post.latitude}
                            centerLong={ shift_data.post.longitude}
                           mapHeight={200}/>
                        </div>
                </IonCardContent>
            </IonCard>
        )
    }

    private renderShiftList() {
        const plannings = this.props.localStorage;

        if (plannings !== undefined) {
            if (plannings.length <= 0) {
                return <div> No messages found. </div>
            } else {
                return plannings.map((data: any, index:number) => {
                    return this.showShiftInfo(data, index)
                })
            }
        } else {
            return <div>Loading...</div>
        }
    }

    render() {
        if(this.state.loaded){
            return (
                <IonPage>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Shift info</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        {this.renderShiftList()}
                    </IonContent>

                </IonPage>
                )
            } else{
            return(
                <IonLoading
                cssClass='my-custom-class'
                isOpen={!this.state.loaded}
                onDidDismiss={() => this.setState({...this.state, loaded: true})}
                message={'Initializeren...'}
                duration={TIME_IN_MS}
              />
            )
          }
    }
}

function mapStateToProps(state: any) {
    return ({
        localStorage: state.VRinfo.arePlanningsFromIdFetched,
        isUserOnPost: true, //TODO state.start.isUserOnPost gaf error
        isLocationUpdated: state.VRinfo.isLocationUpdated,
        errorMessage: state.VRinfo.errorMessage,
        loading: state.VRinfo.loading,
    })
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
        updateGeolocation,
        fetchPlanningsFromId,
        checkIfUserInPost,
        reportUserNotInPost
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoPage);

  
