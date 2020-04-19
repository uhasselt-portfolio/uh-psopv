import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCardHeader, IonList, IonCard, IonCheckbox, IonItem, IonLabel, IonItemDivider, IonCardTitle, IonCardContent, IonButton, IonIcon, IonSelect, IonSelectOption, IonInput, IonTextarea } from '@ionic/react';
import React, { Fragment, useState, Component, ReactNode, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { caretDown } from 'ionicons/icons';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {addMessage, fetchUsers} from './SendMessageAction'



class SendNotifications extends Component<any> {
  state = {
    title: "",
    message: "",
    created_by: 1,
    priority: 1
  }

  constructor(props: any) {
    super(props);
  }

  componentDidMount(){
    this.props.fetchUsers();
  }


  handleSendMessage(){
    this.props.addMessage(this.state.title, this.state.message, this.state.created_by, this.state.priority);
  }

  handleTitleChange(new_title: string | null | undefined){
    this.setState({...this.state, title: new_title});
  }

  handleContentChange(new_message: string | null | undefined){
    this.setState({...this.state, message: new_message});
  }


  renderListOfUser(){
    console.log("this.props.areMessagesfetched", this.props);
    if(this.props.loading == true){
      return <div>Loading...</div>
    } else {
      if(this.props.areUsersFetched !== undefined){
        console.log(this.props.areMessageFetched)
        if(this.props.areUsersFetched.length <= 0){
          return <div>No users found</div>
        } else{
          return this.props.areUsersFetched.map((data: any, index: number) =>{
            return (
              <IonSelectOption value="Verantwoordelijke">{data.first_name} {data.last_name}</IonSelectOption>
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
            <IonSelect interface="popover" value="test" placeholder="Selecteer">
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
    areUsersFetched: state.sendMessage.areUsersFetched,
    errorMessage: state.sendMessage.errorMessage,
    loading: state.sendMessage.loading
  })
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    addMessage,
    fetchUsers
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(SendNotifications);
