import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCardHeader, IonList, IonCard, IonCheckbox, IonItem, IonLabel, IonItemDivider, IonCardTitle, IonCardContent, IonButton, IonIcon, IonSelect, IonSelectOption, IonInput, IonTextarea } from '@ionic/react';
import React, { Fragment, useState, Component, ReactNode, useEffect } from 'react';
import ExploreContainer from '../../components/ExploreContainer';
import { RouteComponentProps } from 'react-router';
import Shift from '../../components/Shift';
import { caretDown } from 'ionicons/icons';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {addMessage} from './SendMessageAction'



class SendNotifications extends Component<any> {
  // const [receiver, setReceiver] = useState<string>();
  // const [description, setDescription] = useState<string>();
  // const [title, setTitle] = useState<string>();
  
  state = {
    title: "",
    message: "",
    created_by: 1,
    priority: 1
  }

  constructor(props: any){
    super(props)
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
              <IonSelectOption value="Admin">Admin</IonSelectOption>
              <IonSelectOption value="Verantwoordelijke">Verantwoordelijke</IonSelectOption>
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
    areMessagesSend: state.message.areMessagesSend,
    errorMessage: state.message.errorMessage,
    loading: state.message.loading
  })
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    addMessage
  }, dispatch);
}

// const MapDispatchToProps = (
//   dispatch: Dispatch<any>,
// ): any => ({
//     addMessage: bindActionCreators(addMessage, dispatch)
//   }
// );

export default connect(mapStateToProps, mapDispatchToProps)(SendNotifications);
