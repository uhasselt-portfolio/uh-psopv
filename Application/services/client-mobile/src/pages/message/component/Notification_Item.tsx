import * as React from 'react';
import { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
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
import {store} from '../../../redux/store';
import { connect } from "react-redux";
import { notifications, trendingUpSharp } from 'ionicons/icons';
import MessageDataInterface from '../../../components/interfaces/MessageDataInterface';
import {fetchMessages} from '../MessageAction'


class NotificationItem extends Component<any> {
    constructor(props: any){
        super(props)
    }
    

    handleOnMenuItemClicked = (data: any) => {
        this.props.messageRead(data);
      }

    render(){
        let data = this.props.areMessagesFetched.find(((message: { id: any; }) => message.id === this.props.id)); // makes "this.props.." shorter, because it was a bit too long

       if (true){ // nog aan te passen
        return (  
            <IonItem className="ReadItem">
                <IonLabel>
                    <h2> <b>{data.created_by}:</b> {data.title}</h2>
                    <p>{data.message}</p>
                </IonLabel>
                <IonLabel class="right_text">
                    <h2>{data.created_at}</h2>
                </IonLabel>
            </IonItem>
        );
    } else{
        return(
            <IonItem className="NotReadItem" onClick={() => this.handleOnMenuItemClicked(data)}>
                <IonLabel>
                    <h2> <b>{data.created_by}:</b> {data.title}</h2>
                    <p>{data.message}</p>
                </IonLabel>
                <IonLabel class="right_text">
                    <h2>{data.created_at}</h2>
                </IonLabel>
            </IonItem>
        )
    }
    }
}

function mapStateToProps(state: any) {
    return({
      areMessagesFetched: state.message.areMessagesFetched,
      errorMessage: state.message.errorMessage,
      loading: state.message.loading
    })
  }
  
  function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
      fetchMessages
    }, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(NotificationItem);
  

  

  
  
  
