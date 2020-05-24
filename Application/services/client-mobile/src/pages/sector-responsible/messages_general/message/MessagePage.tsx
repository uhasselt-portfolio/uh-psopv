import React, { Fragment, useState, Component} from 'react';
import './MessagePage.css';
import NotificationItem from './component/Notification_Item'
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Dispatch, bindActionCreators } from "redux";
import {fetchMessagesOf, loadMessages} from './MessageAction'
import {updateMessages} from '../../../save/saveAction'



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
  interval: NodeJS.Timeout | undefined;

  constructor(props: any) {
    super(props);
  }

  state = {
    state: 0
  }


  componentWillUnmount() {
    if(this.interval != undefined){
      clearInterval(this.interval);
    }
  }


  componentDidMount(){
    this.props.fetchMessagesOf(); // TODO USERID

    this.interval = setInterval(() => {
      console.log("interval MessagePage")
      this.props.fetchMessagesOf(); // TODO USERID
    }, 5000);
  }

  renderList(){
    if(this.props.localStorage != undefined){
      if(this.props.localStorage.length <= 0){
          return <div> No messages found. </div>
      } else{
        // let new_list = this.props.localStorage.slice(this.state.start_index, this.state.end_index);

        return this.props.localStorage.messages.map((data: any, index: number) =>{
          return (
          <NotificationItem {... data}/>
          )
        })
        }
      } else{
        return <div> No internet connection ... </div>
    }
  }

  loadMoreMessage(){
    this.props.loadMessages();
    // this.setState({...this.state, end_index: this.state.start_index + this.state.increase_index_by});
  }


  render(){
    if(this.props.localStorage != undefined){
      console.log(this.props)
      let button;
      if(!this.props.localStorage.loaded){
        button = <IonButton className="marginBottom" onClick={() => this.loadMoreMessage()}> Meer berichten laden ... </IonButton>
      } else{
        button = <div></div>;
      }
      return (
        <IonList>
          {this.renderList()}
          {button}
        </IonList>
      );
    } else{
      return (<div>Berichten zijn aan het laden</div>)
    }
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
    fetchMessagesOf,
    loadMessages,
    updateMessages
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
