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
import { connect } from "react-redux";
import { notifications, trendingUpSharp } from 'ionicons/icons';
import MessageDataInterface from '../../../../components/interfaces/MessageDataInterface';
import {MessageToggle} from '../MessageAction'
import {formatDateTime} from '../../../common_functions/date_formatter'


class NotificationItem extends Component<any> {
    constructor(props: any){
        super(props)
    }

    state = {
        seen: false
    }
    

    handleOnMenuItemClicked = (data: any) => {
        this.setState({...this.state, seen: !this.state.seen});
        this.props.MessageToggle(data.id);
        console.log(this.state.seen)
    }

    setStateClicked(clicked: boolean){
        if(clicked === true && this.state.seen === false){
            this.setState({...this.state, seen: clicked});
        }
    }

    render(){        
        let data = this.props
        console.log("data", this.props)
        this.setStateClicked(data.seen)
        if (this.state.seen){
        return (  
            <IonItem className="ReadItem" onClick={() => this.handleOnMenuItemClicked(data)}>
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
        toggleMessage: state.message.toggleMessage,
        errorMessage: state.message.errorMessage,
        loading: state.message.loading
    })
  }
  
  function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
      MessageToggle
    }, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(NotificationItem);
  

  

  
  
  
