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
    IonText, IonInput, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonContent, IonAvatar, IonIcon, IonRadioGroup, IonPopover, IonGrid, IonRow, IonCard, IonItemDivider, IonCol, IonRefresher, IonRefresherContent, IonSelect, IonSelectOption, IonVirtualScroll, IonItemGroup } from '@ionic/react';
import { call, checkbox } from 'ionicons/icons';

import { render } from '@testing-library/react';
import { radioButtonOff } from 'ionicons/icons';
import { getListLocalStorage, setListLocalStorage, removeListLocalStorage } from '../../../../save/saveFunction';
import { RefresherEventDetail } from '@ionic/core';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import './Shift.css'


class AddProblem extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }

    state = {
      showPopover: true,
      selected_volunteer: "Selecteer",
      selected_planning_id: -1,
      activeProblemType: 1
    }  


    hidePopover(){
        this.setState({...this.state, showPopover: false});
    }

    showPopOver(){
        this.setState({...this.state, showPopover: true});
        this.props.fetchUsers();
    }

    handleProblemClick(problem_id: any){
      this.setState({...this.state, activeProblemType: problem_id});
    }

    handleVolunteerChange(event: any){
      this.setState({...this.state, selected_planning_id: event});
    }
  


  handleClick(){
    let data = this.state
    this.props.sendData({selected_planning_id: data.selected_planning_id, problem_id:data.activeProblemType});
  }



  renderList(){
      return this.props.problemTypes.map((problemType: any, index: number) => {
        if(this.state.activeProblemType === problemType.id){
          return (
            <IonItem button color="medium">
                <p> <strong>{problemType.title}</strong>, {problemType.description}</p>
            </IonItem>
          )
        } else{
          return (
            <IonItem button color="light" onClick={() => this.handleProblemClick(problemType.id)} >
              <p> <strong>{problemType.title}</strong>, {problemType.description}</p>
            </IonItem>
          )
        }
        
    });
  }

  
  

    renderWindow(){
      let volunteers = this.props.users.map((user: any) => {
        return <IonSelectOption value={user.planning_id}> {user.name}</IonSelectOption>
      })

      return(
        <div className="generalPadding">
          <IonHeader className="generalPadding">Kies vrijwilliger:</IonHeader>
          <IonSelect className="whiteBackground" interface="popover" placeholder={this.state.selected_volunteer} onIonChange={e => this.handleVolunteerChange(e.detail.value)}>
                {volunteers}
          </IonSelect>

          <IonHeader className="generalPadding">Kies probleem:</IonHeader>
          <IonItemGroup  >
          {this.renderList()}
          </IonItemGroup>

          <IonButton onClick={() => this.handleClick()}>Kies</IonButton>
        </div>
        
            
          );
    }


    render(){
        return (
          <div className="generalPadding blueBackground" >
              {this.renderWindow()}
          </div>
          );
    }

};


function mapStateToProps(state: any) {
  return({
  })
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(AddProblem);