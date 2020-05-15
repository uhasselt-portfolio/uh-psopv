import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCardHeader, IonList, IonCard, IonCheckbox, IonItem, IonLabel, IonItemDivider, IonCardTitle, IonCardContent, IonButton, IonIcon, IonSelect, IonSelectOption, IonInput, IonTextarea, IonPopover } from '@ionic/react';
import React, { Fragment, useState, Component, ReactNode, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { caretDown } from 'ionicons/icons';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {messageAddMessage, fetchUsers} from './SendMessageAction'
import CustomDropdown from '../../list/components/CustomDropdown';
import  SelectContactWindow  from './components/SelectContactPage';
import { getListLocalStorage, setListLocalStorage } from '../../../save/saveFunction';

const select_types = {volunteers: "Alle Vrijwilligers", sectors: "Alle Sectorverantwoordelijken",
                      everybody: "Iedereen", nobody:"Niemand", specific: "Specifiek"}
class SendNotifications extends Component<any> {
  state = {
    title: "",
    message: "",
    priority: 1,
    selected_type: select_types.nobody,
    showPopover: false,
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
    console.log(this.props)
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
    console.log(this.props)
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
    console.log(this.props)
    let list: number[] =[]

    if(this.props.localStorage != undefined){
      this.props.localStorage.checkboxList.map((item: any)=> {
        list.push(item.value_id)
      })
    }

    await setListLocalStorage('send_msg', list)

    // await this.props.fetchUsers();
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
    if(this.props.localStorage != undefined){
        return (
        // <IonPage>
        //   <IonHeader>
        //     <IonToolbar>
        //       <IonTitle>Notificaties versturen</IonTitle>
        //     </IonToolbar>
        //   </IonHeader>
        //   <IonContent>
        //     <IonHeader collapse="condense">
        //       <IonToolbar>
        //         <IonTitle size="large">Blank</IonTitle>
        //       </IonToolbar>
        //     </IonHeader>
        <div>
            <IonItem>
              <IonLabel>Ontvanger(s)</IonLabel>
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
                <IonInput value={this.state.title} placeholder="Enter Titel" onIonChange={e => this.handleTitleChange(e.detail.value)}></IonInput>
            </IonItem>
            
            <IonItem>
                <IonTextarea className="textArea" value={this.state.message} placeholder="Enter bericht" onIonChange={e => this.handleContentChange(e.detail.value)}></IonTextarea>
            </IonItem>

            <IonButton className="sendBtn" onClick={() => this.handleSendMessage()}>Verstuur</IonButton>
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
