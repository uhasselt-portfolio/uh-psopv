import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCardHeader, IonList, IonCard, IonCheckbox, IonItem, IonLabel, IonItemDivider, IonCardTitle, IonCardContent, IonButton, IonIcon, IonSelect, IonSelectOption, IonInput, IonTextarea, IonPopover, IonToast } from '@ionic/react';
import React, { Fragment, useState, Component, ReactNode, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { caretDown } from 'ionicons/icons';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {messageAddMessage, fetchUsers} from './SendMessageAction'
import CustomDropdown from '../../list/components/CustomDropdown';
import  SelectContactWindow  from './components/SelectContactPage';
import { getListLocalStorage, setListLocalStorage } from '../../../save/saveFunction';
import './SendMessage.css'

const select_types = {volunteers: "Alle Vrijwilligers", sectors: "Alle Sectorverantwoordelijken",
                      everybody: "Iedereen", nobody:"Ontvangers", specific: "Specifiek"}


class SendNotifications extends Component<any> {
  state = {
    title: "",
    message: "",
    priority: 1,
    selected_type: select_types.nobody,
    showPopover: false,
    showToast: false
  }

  hidePopover(){
    this.setState({...this.state, showPopover: false});
  }

  showPopOver(){
      this.setState({...this.state, showPopover: true});
      this.props.fetchUsers();
  }

  constructor(props: any) {
    super(props);
  }

  componentDidMount(){
    this.props.fetchUsers();
  }
  

  async handleQuickBtnChange(value: string){
    if (value === select_types.nobody){
      await this.selectNobody()
    } else if(value === select_types.everybody){
      await this.selectEverybody();
    } else if(value === select_types.volunteers){
      await this.selectVolunteers();
    }else if(value === select_types.sectors){
      await this.selectSectors();
    } else if (value === select_types.specific){
      this.setState({...this.state, selected_type: select_types.specific});
      this.showPopOver();
    }
  }

  async selectSectors(){
    let list: number[] =[]

    let sectors = this.props.localStorage.contacts.filter((item: any)=> {
      return (item.function_type == "Sectorverantwoordelijke")
    })

    sectors.map((item: any)=> {
      list.push(item.user_id)
   })

    await setListLocalStorage('send_msg', list)
    // await this.props.fetchUsers();
  }


  async selectVolunteers(){
    let list: number[] =[]

    this.props.localStorage.my_volunteers.map((item: any)=> {
       list.push(item.user_id)
    })

    await setListLocalStorage('send_msg', list)
    // await this.props.fetchUsers();
  }

  async selectNobody(){
    let x = await setListLocalStorage('send_msg', []).finally();
    // await this.props.fetchUsers();
  }

  async selectEverybody(){
    let list: number[] =[]

    if(this.props.localStorage != undefined){
      this.props.localStorage.checkboxList.map((item: any)=> {
        list.push(item.value_id)
      })
    }

    await setListLocalStorage('send_msg', list)

    // await this.props.fetchUsers();
  }

  setShowToast(state: boolean){
    this.setState({...this.state, showToast: state});
  }
  
  handleSendMessage(){
    this.props.messageAddMessage(this.state.title, this.state.message, this.state.priority); // TODO USERID
    this.setShowToast(true)
  }

  handleTitleChange(new_title: string | null | undefined){
    this.setState({...this.state, title: new_title});
  }

  handleContentChange(new_message: string | null | undefined){
    this.setState({...this.state, message: new_message});
  }

  renderListOfUser(){
    return (
        <IonSelect interface="popover" value={this.state.selected_type} placeholder={this.state.selected_type} onIonChange={e => this.handleQuickBtnChange(e.detail.value)}>
          <IonSelectOption value={select_types.everybody}>{select_types.everybody}</IonSelectOption>
          <IonSelectOption value={select_types.nobody}>{select_types.nobody}</IonSelectOption>
          <IonSelectOption value={select_types.volunteers}>{select_types.volunteers}</IonSelectOption>
          <IonSelectOption value={select_types.sectors}>{select_types.sectors}</IonSelectOption>
          <IonSelectOption value={select_types.specific}>{select_types.specific}</IonSelectOption>
        </IonSelect>
      )
    }
      
  render(){
    let offlineMessage = "";
    if(!navigator.onLine){
      offlineMessage = "U bent offline, berichten worden pas verstuurd eens u terug online gaat."
    } 

    if(this.props.localStorage != undefined){
        return (
        <div>
            <div className="offlineMsg">{offlineMessage}</div>
            <IonItem>
              <IonLabel>Aan: </IonLabel>
              {this.renderListOfUser()}
              <>
                <IonPopover
                  isOpen={this.state.showPopover}
                  onDidDismiss={() => this.hidePopover()}
                >
                <SelectContactWindow />
                </IonPopover>
              </>
            </IonItem>

            <IonItem>
                <IonInput value={this.state.title} placeholder="Titel..." onIonChange={e => this.handleTitleChange(e.detail.value)}></IonInput>
            </IonItem>
            
            <IonItem>
                <IonTextarea className="textArea" value={this.state.message} placeholder="Bericht..." onIonChange={e => this.handleContentChange(e.detail.value)}></IonTextarea>
            </IonItem>

            <IonButton className="sendBtn" onClick={() => this.handleSendMessage()}>Verstuur</IonButton>

            <IonToast
              isOpen={this.state.showToast}
              onDidDismiss={() => this.setShowToast(false)}
              message="Bericht verzonden."
              duration={400}
            />
        </div>
           
        //   </IonContent>
        // </IonPage>
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
