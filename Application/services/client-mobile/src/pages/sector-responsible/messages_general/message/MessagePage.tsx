import React, { Fragment, useState, Component} from 'react';
import './MessagePage.css';
import NotificationItem from './component/Notification_Item'
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Dispatch, bindActionCreators } from "redux";
import {fetchMessagesOf, loadMessages} from './MessageAction'
import {updateMessages} from '../../../save/saveAction'

import { IonButton, 
  IonList, withIonLifeCycle } from '@ionic/react';
import { setListLocalStorage } from '../../../save/saveFunction';
import Auth from '../../../../utils/Auth';



class Notifications extends Component<any> {
  interval: NodeJS.Timeout | undefined;

  constructor(props: any) {
    super(props);
  }

  state = {
    amount_msg: 0
  }


  componentWillUnmount() {
    if(this.interval !== undefined){
      clearInterval(this.interval);
    }
  }

  componentDidMount(){
    this.props.fetchMessagesOf();

    this.interval = setInterval(() => {
      this.props.fetchMessagesOf();
    }, 5000);
  }

  async ionViewWillEnter() {
    await setListLocalStorage('msg_end_index', 5)
    this.props.fetchMessagesOf();
    console.log('fetchMessagesOf ionViewWillEnter event fired')
  }

  renderList(){
    if(this.props.localStorage !== undefined){
      if(this.props.localStorage.length <= 0){
          return <div> No messages found. </div>
      } else{
        return this.props.localStorage.messages.map((data: any, index: number) =>{
          // 1 = vrijwilliger
          if(Auth.getAuthenticatedUser().permission_type_id === 1){
            return (
              <NotificationItem {... data}/>
              )
          } else{
            return (
              <NotificationItem {... data} sendData={this.props.sendData}/>
              )
          }
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
    if(this.props.localStorage !== undefined){
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

export default connect(mapStateToProps, mapDispatchToProps)(withIonLifeCycle(Notifications));
