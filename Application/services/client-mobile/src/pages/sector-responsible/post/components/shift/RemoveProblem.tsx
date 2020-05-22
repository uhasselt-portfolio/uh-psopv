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
    IonText, IonInput, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonContent, IonAvatar, IonIcon, IonRadioGroup, IonPopover, IonGrid, IonRow, IonCard, IonItemDivider, IonCol, IonRefresher, IonRefresherContent, IonSelect, IonSelectOption, IonVirtualScroll, IonItemGroup, IonCardContent, IonCardTitle, IonCardHeader } from '@ionic/react';
import { call, checkbox } from 'ionicons/icons';

import { render } from '@testing-library/react';
import { radioButtonOff } from 'ionicons/icons';
import { getListLocalStorage, setListLocalStorage, removeListLocalStorage } from '../../../../save/saveFunction';
import { RefresherEventDetail } from '@ionic/core';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import './Shift.css'


class RemoveProblem extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }


    handleYesClick(){
        this.handleClick(true);

    }

    handleNoClick(){
        this.handleClick(false);
    }
  

    handleClick(answer: boolean){
        this.props.sendData(answer);
    }


    render(){
      console.log(this.props)
        return (
          <IonCard>
              <IonCardHeader>
              <IonCardTitle>Bent u zeker dat u dit wil verwijderen?</IonCardTitle>

              </IonCardHeader>
              <IonCardContent>
              <p> Dit probleem komt dan ook niet in de rapportering terecht en de verwijdering is definitief.</p>

              <IonButton onClick={() => this.handleYesClick()}>Ja</IonButton>
              <IonButton onClick={() => this.handleNoClick()}>Annuleer</IonButton>
              </IonCardContent>
          </IonCard>
          );
    }

};

export default RemoveProblem;