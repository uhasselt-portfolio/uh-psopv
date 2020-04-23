import * as React from 'react';
import { Component } from 'react';
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
import './Notification_Item.css';
import { connect } from "react-redux";
import {fetchMessages, MessagesMessageToggle} from '../VR_MessageAction'
import {formatDateTime} from '../../../common_functions/date_formatter'


class NotificationItem extends Component<any> {
    constructor(props: any){
        super(props)
    }
    
    handleOnMenuItemClicked = (data: any) => {
        this.props.MessagesMessageToggle(data.id);
        console.log(this)

    }

    render(){        
        let data = this.props.areMessagesFetched.find(((message: { id: any; }) => message.id === this.props.id)); // makes "this.props.." shorter, because it was a bit too long
        if (data.seen){ // nog aan te passen
        return (  
            <IonItem className="ReadItem">
                <IonLabel>
                    <h2> <b>{data.created_by.first_name}:</b> {data.title}</h2>
                    <p>{data.message}</p>
                </IonLabel>
                <IonLabel class="right_text">
                    <h2>{formatDateTime(data.created_at)}</h2>
                </IonLabel>
            </IonItem>
        );
    } else{
        return(
            <IonItem className="NotReadItem" onClick={() => this.handleOnMenuItemClicked(data)}>
                <IonLabel>
                    <h2> <b>{data.created_by.first_name}:</b> {data.title}</h2>
                    <p>{data.message}</p>
                </IonLabel>
                <IonLabel class="right_text">
                    <h2>{formatDateTime(data.created_at)}</h2>
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
      fetchMessages,
      MessagesMessageToggle
    }, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(NotificationItem);
  

  

  
  
  
