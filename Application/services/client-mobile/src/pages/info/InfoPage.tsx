import React from 'react'
import {BackgroundGeolocation, BackgroundGeolocationEvents} from "@ionic-native/background-geolocation/ngx";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchPlannings} from './InfoAction';
import {getUserId} from '../../redux/AppStateAction'
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonButton, IonIcon, IonPage, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import { call } from 'assert';
import { mail } from 'ionicons/icons';

class InfoPage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {latitude: 0, longitude: 0};
    }

    componentDidMount() {
        this.props.fetchPlannings();
        let backgroundGeolocation = new BackgroundGeolocation();
        let HIGH = 10;
        const config = {
            desiredAccuracy: HIGH,
            stationaryRadius: 5,
            interval: 10.000,
            distanceFilter: 5,
            notificationTitle: 'Pukkelpop App',
            notificationText: 'Locatie tracking',
            debug: true, //  enable this hear sounds for background-geolocation life-cycle.
            stopOnTerminate: false, // enable this to clear background location settings when the app terminates
        };

        backgroundGeolocation.configure(config)
            .then(() => {

                backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location) => {
                    this.setState({
                        latitude: location.latitude,
                        longitude: location.longitude
                    });

                    backgroundGeolocation.finish(); // FOR IOS ONLY
                });
            });
        backgroundGeolocation.start();
    }

    componentWillUnmount() {
        console.log("LIFECYCLE KILLED");
    }

    formatDate(data: string){
        return (data.slice(0, 10))

    }

    formatTime(data:string){
        return (data.slice(11, 16))
    }

    showShiftInfo(shift_data: any){
        return(
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>
                    Shift info ({shift_data.id})
                </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonGrid>
                    <IonRow >
                        <IonCol size="2">Wie</IonCol>
                        <IonCol>{shift_data.user.first_name} {shift_data.user.last_name}</IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="2" >Wat</IonCol>
                        <IonCol>{shift_data.post.title}</IonCol>
                    </IonRow>
                    
                    <IonRow>
                        <IonCol size="2">Start</IonCol>
                        <IonCol>{this.formatTime(shift_data.shift.begin)},  {this.formatDate(shift_data.shift.begin)}</IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol  size="2">Einde</IonCol>
                        <IonCol>{this.formatTime(shift_data.shift.end)},  {this.formatDate(shift_data.shift.end)}</IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol  size="2">Straat</IonCol>
                        <IonCol>{shift_data.post.address}</IonCol>
                    </IonRow>
                </IonGrid>
            </IonCardContent>
        </IonCard>
        )

    }

    renderShiftList(){
        if(this.props.loading == true){
            return <div>Loading...</div>
          } else {
            if(this.props.arePlanningsFetched !== undefined){
              console.log(this.props.arePlanningsFetched)
              if(this.props.arePlanningsFetched.length <= 0){
                return <div> No messages found. </div>
              } else{
                return this.props.arePlanningsFetched.map((data: any) =>{
                    return this.showShiftInfo(data)
                })
              }
            }
          }
        
    }

    render() {
        console.log(this.props)
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Shift info</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    {this.renderShiftList()}
                    <p>Latitude: {this.state.latitude}</p>
                    <p>Longitude: {this.state.longitude}</p>
                </IonContent>
                
            </IonPage>
        )
    }
}

function mapStateToProps(state: any) {
    console.log("sate", state)
    return({
      arePlanningsFetched: state.info.arePlanningsFetched,
      errorMessage: state.info.errorMessage,
      loading: state.info.loading,
      user_id: state.user_id.LoggedUser
    })
  }
  
  function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
      fetchPlannings,
    }, dispatch);
  }
  
  
export default connect(mapStateToProps, mapDispatchToProps)(InfoPage);

  
