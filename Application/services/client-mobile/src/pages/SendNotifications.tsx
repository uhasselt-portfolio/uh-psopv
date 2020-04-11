import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCardHeader, IonList, IonCard, IonCheckbox, IonItem, IonLabel, IonItemDivider, IonCardTitle, IonCardContent, IonButton, IonIcon, IonSelect, IonSelectOption, IonInput, IonTextarea } from '@ionic/react';
import React, { Fragment, useState, Component, ReactNode, useEffect } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './PostView.css';
import { RouteComponentProps } from 'react-router';
import Shift from '../components/Shift';
import './SendNotifications.css'
import { caretDown } from 'ionicons/icons';
import { addMessage } from '../redux/actions';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';



class SendNotifications extends Component<any> {
  // const [receiver, setReceiver] = useState<string>();
  // const [description, setDescription] = useState<string>();
  // const [title, setTitle] = useState<string>();
  
  state = {
    title: "",
    content: "",
  }

  constructor(props: any){
    super(props)

    
  }

  handleSendMessage(){
    this.props.addMessage(this.state);
  }

  handleTitleChange(new_title: string | null | undefined){
    console.log(this.state)
    this.setState({...this.state, title: new_title});
  }

  handleContentChange(new_content: string | null | undefined){
    console.log(this.state)
    this.setState({...this.state, content: new_content});
  }



  render(){

    console.log(this.state)
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
              <IonTextarea className="textArea" value={this.state.content} placeholder="Enter bericht" onIonChange={e => this.handleContentChange(e.detail.value)}></IonTextarea>
          </IonItem>

          <IonButton className="sendBtn" onClick={() => this.handleSendMessage()}>Verstuur</IonButton>
        </IonContent>
      </IonPage>
    );
    }
};

const mapStateToProps = (state: any) => {
  console.log(state);
  return {userReducer: state.userReducer};
}

const MapDispatchToProps = (
  dispatch: Dispatch<any>,
): any => ({
    addMessage: bindActionCreators(addMessage, dispatch)
  }
);

export default connect(mapStateToProps, MapDispatchToProps)(SendNotifications);
