import React, { useState } from 'react';
import { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import { IonButton, 
    IonListHeader, 
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonHeader, 
    IonPage, 
    IonTitle, 
    IonToolbar, 
    IonList, 
    IonItem, 
    IonLabel,
    IonItemDivider,
    IonText, IonInput, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonContent, IonAvatar, IonCard, IonIcon } from '@ionic/react';
import { Link } from 'react-router-dom';
import './Shift.css';
import { arrowBack, arrowForward } from 'ionicons/icons';
  
type UserProps = {
    sector: string,
    post: string,
    person: string,
    shift_start: string,
    shift_end: string,
    function: string,
    street: string
  };


  
class Shift  extends Component<UserProps> {
    render() {
        return (            
            <IonCard className="CardContainer">
                <IonCardHeader className="flexrow">
                    <IonButton><IonIcon icon={arrowBack}/></IonButton>
                        <IonCardTitle>
                            Huidige shift
                        </IonCardTitle>
                    <IonButton><IonIcon icon={arrowForward}/></IonButton>
                </IonCardHeader>
                <IonCardContent>
                    <h3>{this.props.person}</h3>
                    <h3>{this.props.shift_start} - {this.props.shift_end}: {this.props.function}</h3>
                    <h3>{this.props.street}</h3>
                </IonCardContent>
            </IonCard>
        );
    }
}
 
export default Shift;