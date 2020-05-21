import React, { Fragment, useState, Component} from 'react';
import '../../sector-responsible/messages_general/message/MessagePage.css';
import NotificationItem from '../../sector-responsible/messages_general/message/component/Notification_Item'
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Dispatch, bindActionCreators } from "redux";
import {fetchMessagesOf} from '../../sector-responsible/messages_general/message/MessageAction'


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



class VRMessage extends Component<any> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount(){
    this.props.fetchMessagesOf(1); // TODO USERID
  }

  renderList(){
    if(this.props.loading == true){
      return <div>Loading...</div>
    } else {
      if(this.props.areMessagesOfIdFetched !== undefined){
        if(this.props.areMessagesOfIdFetched.length <= 0){
          return <div> No messages found. </div>
        } else{
          return this.props.areMessagesOfIdFetched.map((data: any, index: number) =>{
            return (
            <NotificationItem {... data}/>
            )
          })
        }
      }
    }
  }


  render(){
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Berichten</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>


      {/*-- List of Post Items --*/}
      <IonList>
        {this.renderList()}
      </IonList>
          
        </IonContent>
      </IonPage>
    );
    }
};

function mapStateToProps(state: any) {
  return({
    areMessagesOfIdFetched: state.message.areMessagesOfIdFetched,
    errorMessage: state.message.errorMessage,
    loading: state.message.loading
  })
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    fetchMessagesOf
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VRMessage);
