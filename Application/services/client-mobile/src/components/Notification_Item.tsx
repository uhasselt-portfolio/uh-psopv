import * as React from 'react';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {bindActionCreators, Dispatch} from "redux";

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
import { notifications, trendingUpSharp } from 'ionicons/icons';
import { setNotificationStatus, fetchNoticationData } from '../redux/actions'
import MessageDataInterface from '../components/interfaces/MessageDataInterface';


class NotificationItem extends Component<any> {
    constructor(props: any){
        super(props)
    }
    

    handleOnMenuItemClicked = (data: any) => {
        this.props.messageRead(data);
      }

    render(){
        let data = this.props.notificationReducer.Messages.find(((message: { id: any; }) => message.id === this.props.id)); // makes "this.props.." shorter, because it was a bit too long

       if (data.read){
        return (  
            <IonItem className="ReadItem">
                <IonLabel>
                    <h2> <b>{data.sender}:</b> {data.title}</h2>
                    <p>{data.content}</p>
                </IonLabel>
                <IonLabel class="right_text">
                    <h2>{data.time_send}</h2>
                </IonLabel>
            </IonItem>
        );
    } else{
        return(
            <IonItem className="NotReadItem" onClick={() => this.handleOnMenuItemClicked(data)}>
                <IonLabel>
                <h2> <b>{data.sender}:</b> {data.title}</h2>
                    <p>{data.content}</p>
                </IonLabel>
                <IonLabel class="right_text">
                    <h2>{data.time_send}</h2>
                </IonLabel>
            </IonItem>
        )
    }
    }
}



const mapStateToProps = (state: any) => {
    return {
        notificationReducer: state.notificationReducer};
  }

const mapDispatchToProps = (
    dispatch: Dispatch<any>,
    ): any => ({
        messageRead: bindActionCreators(setNotificationStatus, dispatch)
    }
);
  
export default connect(mapStateToProps, mapDispatchToProps)(NotificationItem);



  

  
  
  
