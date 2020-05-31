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
import { getListLocalStorage, setListLocalStorage, removeListLocalStorage } from '../../../../save/saveFunction';
import { RefresherEventDetail } from '@ionic/core';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {fetchUsers} from '../SendMessageAction'




class SelectContactWindow extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }

    state = {
      showPopover: true
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
}

  showPopOver(){
      this.setState({...this.state, showPopover: true});
      this.props.fetchUsers();
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

  

    renderWindow(){
      return(
            <IonList>
            <IonRadioGroup>
                <IonList>
                {this.renderList()}
                </IonList>
            </IonRadioGroup>
            </IonList>
          );
    }


    render(){
        return (
          <div className="dropDown">
                  {this.renderWindow()}
          </div>
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