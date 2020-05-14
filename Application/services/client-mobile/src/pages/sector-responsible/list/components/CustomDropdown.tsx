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
    IonText, IonInput, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonContent, IonAvatar, IonIcon, IonRadioGroup, IonPopover, IonGrid, IonRow, IonCard, IonItemDivider } from '@ionic/react';
import { call } from 'ionicons/icons';

import WarningSign from "../../../images/warning_sign"
import './CustomDropdown.css'
import { render } from '@testing-library/react';
import { radioButtonOff } from 'ionicons/icons';




export class CustomDropdown extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }

  state = {
    showPopover: false,
    selected: this.props.list[0].title
  }

  setSelected(selected_value: String){
    this.setState({...this.state, selected: selected_value});
  }

  renderList(){
    return this.props.list.map((element: any) => {
      if(this.state.selected == element.title){
        return (
          <IonItem onClick={() => this.setSelected(element.title)}>
                  <p className="listItemTitle">{element.title}</p>
                  <IonRadio className="listItemRadioButton" value={element.title} />
                  <p className="listItemSubTitle">{element.subinfo}</p>
          </IonItem>
        )
      } else{
        return (
          <IonItem onClick={() => this.setSelected(element.title)}>
                  <p className="listItemTitle">{element.title}</p>
                  <IonRadio className="listItemRadioButton" value={element.title} />
                  <p className="listItemSubTitle">{element.subinfo}</p>
          </IonItem>
        )
      }
        
    });
  }

    renderDropdownList(){
    return(
        <div className="dropDown">
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

    hidePopover(){
        this.setState({...this.state, showPopover: false});
    }

    showPopOver(){
        this.setState({...this.state, showPopover: true}); 
    }
    

    render(){
        return (
            <>
              <IonPopover
                isOpen={this.state.showPopover}
                onDidDismiss={() => this.hidePopover()}
              >
                {this.renderDropdownList()}
              </IonPopover>
              <IonButton onClick={() => this.showPopOver()}>{this.state.selected}</IonButton>
            </>
          );
    }

};

  export default (CustomDropdown);
  