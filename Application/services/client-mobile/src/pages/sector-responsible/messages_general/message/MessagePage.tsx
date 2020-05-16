import React, { Fragment, useState, Component} from 'react';
import './MessagePage.css';
import NotificationItem from './component/Notification_Item'
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Dispatch, bindActionCreators } from "redux";
import {fetchMessagesOf} from './MessageAction'



import { IonButton, 
  IonListHeader, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonList, 
  IonItem, 
  IonLabel,
  IonText, IonInput, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonContent, IonAvatar, IonTabBar, IonTabButton, IonIcon } from '@ionic/react';



class Notifications extends Component<any> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount(){
    this.props.fetchMessagesOf(2); // TODO USERID
  }

  renderList(){
    if(this.props.localStorage != undefined){
      if(this.props.localStorage.length <= 0){
          return <div> No messages found. </div>
      } else{
        return this.props.localStorage.map((data: any, index: number) =>{
          return (
          <NotificationItem {... data}/>
          )
        })
        }
      } else{
        return <div> No internet connection ... </div>
    }
  }


  render(){
    return (
      <IonList>
        {this.renderList()}
      </IonList>
    );
    }
};

function mapStateToProps(state: any) {
  return({
    localStorage: state.message.areMessagesOfIdFetched,
    errorMessage: state.message.errorMessage,
    loading: state.message.loading
  })
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    fetchMessagesOf
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
