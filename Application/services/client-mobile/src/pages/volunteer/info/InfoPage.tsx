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
    IonTitle
} from '@ionic/react';
import GoogleMapReact from 'google-map-react';
import NormalMarker from './components/NormalMarker'
import './InfoPage.css'
import {BackgroundGeolocation, BackgroundGeolocationEvents} from "@ionic-native/background-geolocation";

class InfoPage extends React.Component<any, any> {

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

    private formatDate(data: string) {
        return (data.slice(0, 10))
    }

    private formatTime(data: string) {
        return (data.slice(11, 16))
    }

    private showShiftInfo(shift_data: any) {
        return (
            <IonCard key={shift_data.id}>
                <IonCardHeader>
                    <IonCardTitle>
                        Shift info ({shift_data.id})
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
                            <IonCol>{shift_data.post.title}</IonCol>
                        </IonRow>

                        <IonRow>
                            <IonCol size="2">Start</IonCol>
                            <IonCol>{this.formatTime(shift_data.shift.begin)}, {this.formatDate(shift_data.shift.begin)}</IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="2">Einde</IonCol>
                            <IonCol>{this.formatTime(shift_data.shift.end)}, {this.formatDate(shift_data.shift.end)}</IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="2">Straat</IonCol>
                            <IonCol>{shift_data.post.address}</IonCol>
                        </IonRow>
                    </IonGrid>

                    <div className="GoogleMapsInfo">
                        <GoogleMapReact
                            bootstrapURLKeys={{key: 'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDyMg3eezA_aKnVp1Hvsya23xwxCey32JA'}}
                            defaultCenter={{lat: shift_data.post.latitude, lng: shift_data.post.longitude}}
                            defaultZoom={13}>
                            <NormalMarker
                                lat={shift_data.post.latitude}
                                lng={shift_data.post.longitude}/>
                        </GoogleMapReact>
                    </div>
                </IonCardContent>
            </IonCard>
        )
    }

    private renderShiftList() {
        const plannings = this.props.arePlanningsFromIdFetched;

        if (plannings !== undefined) {
            if (plannings.length <= 0) {
                return <div> No messages found. </div>
            } else {
                return plannings.map((data: any) => {
                    return this.showShiftInfo(data)
                })
            }
        } else {
            return <div>Loading...</div>
        }
    }

    private renderCoordinates() {
        const coordinates = this.props.isLocationUpdated;
        console.log(this.props.isLocationUpdated);
        if (coordinates !== undefined) {
            return (
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>
                            Jouw coördinaten
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <p>Latitude: {this.props.isLocationUpdated.latitude}</p>
                        <p>Longitude: {this.props.isLocationUpdated.longitude}</p>
                    </IonCardContent>
                </IonCard>
            )
        } else {
            return(
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>
                            Jouw coördinaten
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        Laden...
                    </IonCardContent>
                </IonCard>
            )
        }
    }

    render() {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Shift info</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    {this.renderCoordinates()}
                    {this.renderShiftList()}
                </IonContent>

            </IonPage>
        )
    }
}

function mapStateToProps(state: any) {
    return ({
        arePlanningsFromIdFetched: state.VRinfo.arePlanningsFromIdFetched,
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

  
