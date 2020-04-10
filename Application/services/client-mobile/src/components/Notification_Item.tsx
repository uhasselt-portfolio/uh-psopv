import * as React from 'react';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {bindActionCreators} from "redux";

import { IonButton, 
    IonListHeader, 
    IonHeader, 
    IonPage, 
    IonTitle, 
    IonToolbar, 
    IonList, 
    IonItem, 
    IonLabel,
    IonText, IonInput, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonContent, IonAvatar } from '@ionic/react';
import { Link } from 'react-router-dom';
import './Notification_Item.css';
import { read } from 'fs';
import {store} from '../redux/store';
import { connect } from "react-redux";
import { notifications } from 'ionicons/icons';
import { setNotificationStatus } from '../redux/actions'

type index = {
    index: number,
  };

class NotificationItem  extends Component<any | index> {
    constructor(props: any){
        super(props)
    }

    onMenuItemClicked = (selected: any) => {
        this.props.setNotificationStatus(true);
    }
    
    render() {
       let data = this.props.notificationData[this.props.index]; // makes "this.props.." shorter, because it was a bit too long

        if (data.read){
            return (  
                <IonItem className="ReadItem">
                    <IonLabel>
                        <h2> <b>{data.from_person}:</b> {data.title}</h2>
                        <p>{data.description}</p>
                    </IonLabel>
                    <IonLabel class="right_text">
                        <h2>{data.time}</h2>
                    </IonLabel>
                </IonItem>
            );
        } else{
            return(
                <IonItem className="NotReadItem" onClick={() => this.onMenuItemClicked(this.props)}>
                    <IonLabel>
                        <h2> <b>{data.from_person}:</b> {data.title}</h2>
                        <p>{data.description}</p>
                    </IonLabel>
                    <IonLabel class="right_text">
                        <h2>{data.time}</h2>
                    </IonLabel>
                </IonItem>
            )
        }
        
    }
}
const mapStateToProps = (state: any) => {
    console.log(state);
    return {notificationData: state.notificationData};
  }
  
  
export default connect(mapStateToProps, { setNotificationStatus })(NotificationItem);

