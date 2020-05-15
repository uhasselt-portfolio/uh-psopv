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
import { formatDateTime } from '../../../common_functions/date_formatter';




class SelectShiftWindow extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }

    handleClick(element: any){
        console.log("clicked");
        this.props.sendData(element);
    }


    renderList(){
        return this.props.shifts.map((element: any, index: number) => {
            return (
            <IonItem button onClick={() => this.handleClick(element)}>
                <IonLabel>
                <h2>Shift: {element.shift_id}</h2>
                <p>{formatDateTime(element.shift_start) + " - " + formatDateTime(element.shift_end)}</p>
                </IonLabel>
            </IonItem>
            )
        });
    }

  

    renderWindow(){
        console.log(this.props)
      return(
            <IonList>
                <IonListHeader>
                    <h2>Ga naar...</h2>
                </IonListHeader>
                {this.renderList()}
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


export default (SelectShiftWindow);