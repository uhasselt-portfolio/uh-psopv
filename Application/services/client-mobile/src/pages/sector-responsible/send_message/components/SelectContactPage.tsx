import * as React from 'react';
import { Component } from 'react';
import { IonButton, 
    IonListHeader, 
    IonHeader, 
    IonPage, 
    IonTitle, 
    IonToolbar, 
    IonList, 
    IonItem, 
    IonLabel,
    IonText, IonInput, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonContent, IonAvatar, IonIcon, IonRadioGroup, IonPopover, IonGrid, IonRow, IonCard, IonItemDivider, IonCol, IonRefresher, IonRefresherContent, IonSelect, IonSelectOption } from '@ionic/react';
import { call, checkbox } from 'ionicons/icons';

import { render } from '@testing-library/react';
import { radioButtonOff } from 'ionicons/icons';
import { getListLocalStorage, setListLocalStorage, removeListLocalStorage } from '../../../save/saveFunction';
import { RefresherEventDetail } from '@ionic/core';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {fetchUsers} from '../SendMessageAction'

const select_types = {volunteers: "Alle Vrijwilligers", sectors: "Alle Sectorverantwoordelijken", everybody: "Iedereen", nobody:"Niemand"}


class SelectContactWindow extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }

    state = {
      showPopover: false,
      selected_type: "Selecteer groepen"
    }  

    componentDidMount(){
      this.props.fetchUsers();
    }
    

    
  async setChecked(e: CustomEvent) {
    console.log(e)
    let index = Number(e.detail.value);
    let list = await getListLocalStorage('send_msg');

    if(!list.includes(index)){
      list.push(index)
    } else if(!e.detail.checked) {
      list = list.filter((i: number) => {
        return i != index
      })
    }
    setListLocalStorage('send_msg', list)
  }


  hidePopover(){
      this.setState({...this.state, showPopover: false});
      this.props.fetchUsers();
}

  showPopOver(){
      this.setState({...this.state, showPopover: true});
  }


  renderList(){
    if(this.props.localStorage.checkboxList != undefined){
      return this.props.localStorage.checkboxList.map((element: any, index: number) => {
        return (
          <IonItem>
            <IonLabel>
              <h2>{element.value_name}</h2>
              <p>{element.value_function_type}</p>
            </IonLabel>
            <IonCheckbox checked={element.checked} value={element.value_id} onIonChange={e => this.setChecked(e)} />
          </IonItem>
        )
    });
    } else{
      return <div></div>
    }
    
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

    this.props.localStorage.checkboxList.map((item: any)=> {
       list.push(item.value_id)
    })

    await setListLocalStorage('send_msg', list)

    // await this.props.fetchUsers();
  }
  

    renderWindow(){
      return(
          <div className="dropDown">
            <IonSelect interface="popover" value={this.state.selected_type} placeholder={this.state.selected_type} onIonChange={e => this.handleQuickBtnChange(e.detail.value)}>
                <IonSelectOption value={select_types.everybody}>{select_types.everybody}</IonSelectOption>
                <IonSelectOption value={select_types.nobody}>{select_types.nobody}</IonSelectOption>
                <IonSelectOption value={select_types.volunteers}>{select_types.volunteers}</IonSelectOption>
                <IonSelectOption value={select_types.sectors}>{select_types.sectors}</IonSelectOption>
            </IonSelect>

              <IonList>
              <IonRadioGroup>
                  <IonList>
                  {this.renderList()}
                  </IonList>
              </IonRadioGroup>
              </IonList>
          </div>
          )
    }


    render(){
        return (
            <>
              <IonPopover
                isOpen={this.state.showPopover}
                onDidDismiss={() => this.hidePopover()}
              >
                {this.renderWindow()}
              </IonPopover>
              <IonButton onClick={() => this.showPopOver()}>Selecteer</IonButton>
            </>
          );
    }

};


function mapStateToProps(state: any) {
  return({
    localStorage: state.sendMessage.areUsersFetched,
  })
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    fetchUsers
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(SelectContactWindow);