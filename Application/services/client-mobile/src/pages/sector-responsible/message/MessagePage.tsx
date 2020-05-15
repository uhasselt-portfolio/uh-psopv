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
  IonText, IonInput, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonContent, IonAvatar } from '@ionic/react';



class Notifications extends Component<any> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount(){
    this.props.fetchMessagesOf(2); // TODO USERID
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
            <IonTitle>Notifications</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Blank</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>


      {/*-- List of Post Items --*/}
      <IonList>
        {this.renderList()}
      </IonList>
    </IonContent>
          
        </IonContent>
      </IonPage>
    );
    }
};

function mapStateToProps(state: any) {
  console.log(state)
  return({
    savedActions: state.save,
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

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
