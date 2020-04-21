import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCardHeader, IonList, IonCard, IonCheckbox, IonItem, IonLabel, IonItemDivider, IonCardTitle, IonCardContent, IonButton, IonIcon, IonSelect, IonSelectOption, IonInput, IonTextarea } from '@ionic/react';
import React, { Fragment, useState, Component, ReactNode, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { caretDown } from 'ionicons/icons';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {messageAddMessage, messageFetchUsers} from './SendMessageAction'



class SendNotifications extends Component<any> {
  state = {
    title: "",
    message: "",
    created_by: 2,
    send_to_id: 2,
    priority: 1
  }

  constructor(props: any) {
    super(props);
  }

  componentDidMount(){
    this.props.messageFetchUsers();
  }


  handleSendMessage(){
    this.props.messageAddMessage(this.state.title, this.state.message, this.state.created_by, this.state.send_to_id, this.state.priority); // TODO USERID
  }

  handleTitleChange(new_title: string | null | undefined){
    this.setState({...this.state, title: new_title});
  }

  handleContentChange(new_message: string | null | undefined){
    this.setState({...this.state, message: new_message});
  }

  handleSendToChange(new_send_to: number){
    this.setState({...this.state, send_to_id: new_send_to});
  }

  renderListOfUser(){
    console.log(this.props.messageFetchUsers)

    if(this.props.loading == true){
      return <div>Loading...</div>
    } else {
      if(this.props.messageFetchUsers !== undefined){
        if(this.props.messageFetchUsers.length <= 0){
          return <div>No users found</div>
        } else{
          return this.props.messageFetchUsers.map((data: any, index: number) =>{
            return (
              <IonSelectOption value={data.id}>{data.first_name} {data.last_name} ({data.permission_type.name})</IonSelectOption>
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
            <IonLabel>Ontvanger</IonLabel>
            <IonSelect interface="popover" value={this.state.send_to_id} placeholder="Selecteer" onIonChange={e => this.handleSendToChange(e.detail.value)}>
              {this.renderListOfUser()}
            </IonSelect>
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
};

function mapStateToProps(state: any) {
  return({
    messageFetchUsers: state.sendMessage.messageFetchUsers,
    errorMessage: state.sendMessage.errorMessage,
    loading: state.sendMessage.loading
  })
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    messageAddMessage,
    messageFetchUsers
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(SendNotifications);
