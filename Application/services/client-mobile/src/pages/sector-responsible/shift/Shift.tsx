import React, { useState } from 'react';
import { Component } from 'react';

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
    IonText, IonInput, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonContent, IonAvatar, IonCard, IonIcon, IonSlide, IonRow, IonCol, IonGrid } from '@ionic/react';
import { Link } from 'react-router-dom';
import './Shift.css';
import { arrowBack, arrowForward, caretDown } from 'ionicons/icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {fetchUsersFromShift} from './ShiftAction'
  


  
class Shift  extends Component<any> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount(){
        // this.props.fetchUsersFromShift(this.props.user.id);
    }
    
    

    state = {
        checkListActive: false
    }

    formatDate(data: string){
        return (data.slice(0, 10))

    }

    formatTime(data:string){
        return (data.slice(11, 16))
    }

    formatDateTime(data: string){
        console.log(data)
        return (<div>{this.formatTime(data)},  {this.formatDate(data)}</div>)
    }


    showCheckList() {
        if(this.state.checkListActive){
        return(
            <IonCardContent>
                hey
            {/* {checkboxList.map(({ val, isChecked }, i) => (
            <IonItem key={i}>
                <IonLabel>{val}</IonLabel>
                <IonCheckbox slot="end" value={val} checked={isChecked} />
            </IonItem>
            ))}; */}
            </IonCardContent>
        )
        } else{
        return <div></div>
        }
    }

    handleToggleCheckList(){
        this.setState({...this.state, checkListActive: !this.state.checkListActive});
    }

    renderCheckbox(){
        return(
            <IonCard>
                <IonCardHeader>
                <IonCardTitle onClick={() => this.handleToggleCheckList()}>
                    CheckList
                    <IonIcon class="text_end" icon={caretDown}/>
                </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    {this.showCheckList()}
                </IonCardContent>
            </IonCard>
        )
          
    }

    renderShiftInfo(){
        return(
        <IonCard>
                <IonCardHeader className="flexrow">
                    <IonButton><IonIcon icon={arrowBack}/></IonButton>
                        <IonCardTitle>
                            Shift {this.props.shift.id}
                        </IonCardTitle>
                    <IonButton><IonIcon icon={arrowForward}/></IonButton>
                </IonCardHeader>
                <IonCardContent>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="2">
                                Wie
                            </IonCol>
                            <IonCol>
                                {this.props.user.first_name}{/* TODO */}
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="2">
                                Wat
                            </IonCol>
                            <IonCol>
                                {this.props.post.title}
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="2">
                                Waar
                            </IonCol>
                            <IonCol>
                                {this.props.post.address}
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="2">
                                Start
                            </IonCol>
                            <IonCol>
                                {this.formatDateTime(this.props.shift.begin)}
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="2">
                                Einde
                            </IonCol>
                            <IonCol>
                                {this.formatDateTime(this.props.shift.end)}
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCardContent>
        </IonCard>
        )
    }

    renderProblemInfo(){
        return(
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>
                Problemen Log
                <IonIcon/>
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Michiel was 4 uur te laat op post
            </IonCardContent>
          </IonCard>
        )
    }

    render() {
        console.log(this.props)
        return (    
            <IonSlide>
                <div  className="fullWidth">
                    {this.renderShiftInfo()}
                    {this.renderCheckbox()}
                    {this.renderProblemInfo()}
                </div>
                               
            </IonSlide>       
        );
    }
}


          
function mapStateToProps(state: any) {
    return({
      arePlanningsFetched: state.shift.arePlanningsFetched,
      errorMessage: state.shift.errorMessage,
      loading: state.shift.loading,
    })
  }
  
  function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
        fetchUsersFromShift,
    }, dispatch);
  }
  
  
export default connect(mapStateToProps, mapDispatchToProps)(Shift);