import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCardHeader, IonList, IonCard, IonCheckbox, IonItem, IonLabel, IonItemDivider, IonCardTitle, IonCardContent, IonButton, IonIcon, IonSelect, IonSelectOption, IonInput, IonTextarea } from '@ionic/react';
import React, { Fragment, useState, Component, ReactNode, useEffect } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import counterReducer from './testReducer';
import { increaseCounter, decreaseCounter } from './testAction';




class Test extends Component<any> {
  state = {
    title: "",
    message: "",
    created_by: 2,
    send_to_id: 2,
    priority: 1
  }

  constructor(props: any) {
    super(props);
  }

  increase(){
    this.props.increaseCounter();

  }

  render(){
    console.log(this.props)
      return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>
              <IonButton onClick={() => this.increase()}>
              +
            </IonButton>
            {this.props.counter.counter}
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Blank</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonCard>
          <IonButton onClick={() => this.increase()}>
            +
          </IonButton>

                    <IonButton onClick={() => this.increase()}>
                      -
                    </IonButton>
                    asdfasdf
          </IonCard>
          
        </IonContent>
      </IonPage>
    );
    }
};

function mapStateToProps(state: any) {
  return({
    counter: state.counter,
  })
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    increaseCounter,
    decreaseCounter
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Test);
