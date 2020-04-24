import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCardHeader, IonList, IonCard, IonCheckbox, IonItem, IonLabel, IonItemDivider, IonCardTitle, IonCardContent, IonButton, IonIcon, IonSelect, IonSelectOption, IonInput, IonTextarea } from '@ionic/react';
import React, { Fragment, useState, Component, ReactNode, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { caretDown } from 'ionicons/icons';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {fetchUserFromSector,VRSendMessage} from './VR_SendMessageAction'




class VRSendMessagePage extends Component<any> {
  state = {
    title: "",
    message: "",
    created_by: 1, //TODO USERID
    send_to_id: 2, //TODO USERID
    priority: 1
  }

  constructor(props: any) {
    super(props);
  }

  componentDidMount(){
    this.props.fetchUserFromSector(2);
  }


  handleSendMessage(){
    this.props.VRSendMessage(this.state.title, this.state.message, this.state.created_by, this.state.send_to_id, this.state.priority); // TODO USERID
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
    console.log(this.props.isUserFromSectorFetched)

    if(this.props.loading == true){
      return <div>Loading...</div>
    } else {
      if(this.props.isUserFromSectorFetched !== undefined){
        if(this.props.isUserFromSectorFetched.length <= 0){
          return <div>No users found</div>
        } else{
            let data = this.props.isUserFromSectorFetched
            console.log(data)
            return (
              <IonSelectOption value={data.id}>{data.first_name} {data.last_name} ({data.permission_type.name})</IonSelectOption>
            )
        }
      }
    }
  }



  render(){
    console.log(this.props.isUserFromSectorFetched)
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
  console.log(state)
  return({
    isUserFromSectorFetched: state.vrSendMessage.isUserFromSectorFetched,
    errorMessage: state.vrSendMessage.errorMessage,
    loading: state.vrSendMessage.loading
  })
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    VRSendMessage,
    fetchUserFromSector
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(VRSendMessagePage);
