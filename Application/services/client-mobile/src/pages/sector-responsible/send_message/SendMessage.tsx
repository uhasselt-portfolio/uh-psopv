import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCardHeader, IonList, IonCard, IonCheckbox, IonItem, IonLabel, IonItemDivider, IonCardTitle, IonCardContent, IonButton, IonIcon, IonSelect, IonSelectOption, IonInput, IonTextarea } from '@ionic/react';
import React, { Fragment, useState, Component, ReactNode, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { caretDown } from 'ionicons/icons';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {messageAddMessage, fetchUsers} from './SendMessageAction'
import CustomDropdown from '../list/components/CustomDropdown';
import  SelectContactWindow  from './components/SelectContactPage';
import { getListLocalStorage } from '../../save/saveFunction';

class SendNotifications extends Component<any> {
  state = {
    title: "",
    message: "",
    priority: 1
  }

  constructor(props: any) {
    super(props);
  }

  componentDidMount(){
    this.props.fetchUsers();
  }
  


  handleSendMessage(){
    this.props.messageAddMessage(this.state.title, this.state.message, this.state.priority); // TODO USERID
  }

  handleTitleChange(new_title: string | null | undefined){
    this.setState({...this.state, title: new_title});
  }

  handleContentChange(new_message: string | null | undefined){
    this.setState({...this.state, message: new_message});
  }

  renderListOfUser(){
    return <SelectContactWindow />
    }
      
  render(){
    if(this.props.localStorage != undefined){
        return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Notificaties versturen</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonHeader collapse="condense">
              <IonToolbar>
                <IonTitle size="large">Blank</IonTitle>
              </IonToolbar>
            </IonHeader>

            <IonItem>
              <IonLabel>Ontvanger(s)</IonLabel>
              {this.renderListOfUser()}
            </IonItem>

            <IonItem>
                <IonInput value={this.state.title} placeholder="Enter Titel" onIonChange={e => this.handleTitleChange(e.detail.value)}></IonInput>
            </IonItem>
            
            <IonItem>
                <IonTextarea className="textArea" value={this.state.message} placeholder="Enter bericht" onIonChange={e => this.handleContentChange(e.detail.value)}></IonTextarea>
            </IonItem>

            <IonButton className="sendBtn" onClick={() => this.handleSendMessage()}>Verstuur</IonButton>
          </IonContent>
        </IonPage>
      );
      }
      else{
        return <div>loading</div>
      }
    } 
};

function mapStateToProps(state: any) {
  return({
    localStorage: state.sendMessage.areUsersFetched,
  })
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    messageAddMessage,
    fetchUsers
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(SendNotifications);
