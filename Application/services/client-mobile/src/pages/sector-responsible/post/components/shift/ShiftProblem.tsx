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
    IonText, IonInput, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonContent, IonAvatar, IonIcon, IonRadioGroup, IonPopover, IonGrid, IonRow, IonCard, IonItemDivider, IonCol, IonRefresher, IonRefresherContent, IonSelect, IonSelectOption, IonToast } from '@ionic/react';
import { call, checkbox, pencilOutline, checkmarkDone, checkmark, remove, removeOutline, trashBin, trashBinOutline } from 'ionicons/icons';

import { render } from '@testing-library/react';
import { radioButtonOff } from 'ionicons/icons';
import { getListLocalStorage, setListLocalStorage, removeListLocalStorage, addObjectToActionList } from '../../../../save/saveFunction';
import { formatDateTime } from '../../../../common_functions/date_formatter';
import './Shift.css'
import {problemToggle} from '../../PostAction'

import RemoveProblem from './RemoveProblem'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';



class ShiftProblem extends React.Component<any> {
    constructor(props: any) {
        super(props);

        this.getDataRemoveProblem = this.getDataRemoveProblem.bind(this);

    }

    state = {
      solved: this.props.problem_solved,
      showRemoveProblem: false,
      showToast: false
    }  
    

    toggleSolved(){
      this.setState({...this.state, solved: !this.state.solved});
      this.props.problemToggle(this.props.problem_id);
      console.log("problem toggled")
    }

    setShowToast(state: boolean){
        this.setState({...this.state, showToast: state, showRemoveProblem: false});
      }
    

    hideRemoveProblem(){
        this.setState({...this.state, showRemoveProblem: false});
    }

    showRemoveProblem(){
        this.setState({...this.state, showRemoveProblem: true});
    }

    getDataRemoveProblem(val: any){
        console.log(val);
        if(val == true){
            addObjectToActionList('https://psopv.herokuapp.com/api/problem/delete/' + this.props.problem_id, null)
            this.setShowToast(true)
        } else{
            this.hideRemoveProblem();

        }
      }




  renderSolved(){
        return (
            <IonGrid key={this.props.problem_id} className="solved">
            <IonRow key={this.props.problem_id}> 
                <IonCol size="5.5">
                    {this.props.created_by_name}
                </IonCol>
                <IonCol size="4.5">
                    {formatDateTime(this.props.created_at)}
                </IonCol>
                <IonCol  size="2">
                <IonButton onClick={() => this.showRemoveProblem()}><IonIcon icon={trashBinOutline} /></IonButton>
                </IonCol>
            </IonRow>
            <IonRow>
            <IonCol  size="12">
                <p className="greyText">{this.props.problem_title}, {this.props.problem_description}</p>
            </IonCol>
            </IonRow>
            </IonGrid>
        )
  }

  renderNotSolved(){
    return (
        <IonGrid key={this.props.problem_id} className="notSolved">
        <IonRow key={this.props.problem_id}> 
            <IonCol size="5.5">
                {this.props.created_by_name}
            </IonCol>
            <IonCol size="4.5">
                {formatDateTime(this.props.created_at)}
            </IonCol>
            <IonCol  size="2">
            <IonButton onClick={() => this.showRemoveProblem()}><IonIcon icon={trashBinOutline} /></IonButton>
            </IonCol>
        </IonRow>
        <IonRow>
        <IonCol  size="10">
            <p className="greyText">{this.props.problem_title}, {this.props.problem_description}</p>
        </IonCol>
        <IonCol  size="2">
        <IonButton onClick={() => this.toggleSolved()}><IonIcon icon={checkmark} /></IonButton>
        </IonCol>
        </IonRow>
        </IonGrid>
    )
}



    render(){
        if(this.state.solved == false){
            return (
                <IonItem className="noPadding">
                        {this.renderNotSolved()}
                        <>
                <IonPopover
                  isOpen={this.state.showRemoveProblem}
                  onDidDismiss={() => this.hideRemoveProblem()}
                >
                    <RemoveProblem sendData={this.getDataRemoveProblem}/>
                </IonPopover>
                </>
                <IonToast
                isOpen={this.state.showToast}
                onDidDismiss={() => this.setShowToast(false)}
                message="Probleem is Verwijderd."
                duration={400}
                />
                </IonItem>
                );
        } else{
            return (
                <IonItem className="noPadding">
                        {this.renderSolved()}
                        <>
                <IonPopover
                  isOpen={this.state.showRemoveProblem}
                  onDidDismiss={() => this.hideRemoveProblem()}
                >
                <RemoveProblem sendData={this.getDataRemoveProblem}/>
                </IonPopover>
                </>
                <IonToast
                isOpen={this.state.showToast}
                onDidDismiss={() => this.setShowToast(false)}
                message="Probleem is verwijderd."
                duration={400}
                />
            
                </IonItem>
                );
        }
        
    }

};


function mapStateToProps(state: any) {
    return({
    })
  }
  
  function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
      problemToggle
    }, dispatch);
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(ShiftProblem);
