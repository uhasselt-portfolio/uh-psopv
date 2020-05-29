import * as React from 'react';
import { IonButton, 
    IonCard, IonCardContent, IonCardTitle, IonCardHeader } from '@ionic/react';

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