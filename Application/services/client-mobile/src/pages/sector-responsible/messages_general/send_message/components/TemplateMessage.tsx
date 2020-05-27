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

import '../SendMessage.css'
import Auth from '../../../../../utils/Auth';

const templatesVolunteer = [{title: "Help", description: "Ongeval op mijn post"},
{title: "Vergeten", description: "Ik ben wat spullen thuisvergeten, ik ben even op en af."},
{title: "Slecht weer", description: "Het regent super hard en we hebbeng een bescherming."},
{title: "Item verloren", description: "We zijn een item verloren van pukkelpop"}]

const templatesManager = [{title: "We komen eraan", description: "We komen kijken of alles in orde is"},
    {title: "Te veel op en af", description: "We merken dat jullie te veel naar op en af gaan"}]

class TemplateMessage extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }

    state = {
      showPopover: true,
    }  


    hidePopover(){
        this.setState({...this.state, showPopover: false});
    }

    showPopOver(){
        this.setState({...this.state, showPopover: true});
    }

    handleProblemClick(title: any){
      this.setState({...this.state, title: title});
    }
  


  handleClick(title: String, description: String){
    let data = this.state
    this.props.sendData(title, description);
  }



  renderList(){
    let templates: {title: string; description: string;}[]      // 1 = vrijwilliger = []
    if(Auth.getAuthenticatedUser().permission_type_id == 1){
        templates = templatesVolunteer
    } else{
        templates = templatesManager
    }
    
      return templates.map((template: any, index: number) => {
          return (
            <IonItem button onClick={() => this.handleClick(template.title, template.description)} >
              <p> <strong>{template.title}</strong>, {template.description}</p>
            </IonItem>
          )
    });
  
}

  

    renderWindow(){
      return(
        <div className="generalPadding">
          <IonHeader className="generalPadding">Kies bericht:</IonHeader>
          <IonItemGroup  >
          {this.renderList()}
          </IonItemGroup>
        </div>
          );
    }


    render(){
        return (
          <div className="generalPadding" >
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


export default connect(mapStateToProps, mapDispatchToProps)(TemplateMessage);