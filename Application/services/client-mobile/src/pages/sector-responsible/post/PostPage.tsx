import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCardHeader, IonList, IonCard, IonCheckbox, IonItem, IonLabel, IonItemDivider, IonCardTitle, IonCardContent, IonButton, IonIcon, IonSlides, IonSlide, IonGrid, IonRow, IonCol } from '@ionic/react';
import React, { Fragment, useState, Component, ReactNode, useEffect } from 'react';
import './PostPage.css';
import Shift from '../shift/Shift';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {fetchPlanningsFromPost} from './PostAction'
import { caretDown, arrowBack, arrowForward } from 'ionicons/icons';
import { formatDateTime } from '../../common_functions/date_formatter';

const checkboxList = [
  { val: 'Fluo Band', isChecked: false },
  { val: 'Plaatje', isChecked: false },
  { val: 'Michiel', isChecked: false },
  { val: 'Wouter', isChecked: false },
];


const slideOpts = {
  direction: 'horizontal',
  speed: 400,
};

class PostView extends Component<any, any> {
  state = {
    checkListActive: false,
    show_shift: 1
  }

  constructor(props: any){
    super(props)
  }

  handleShiftSwitch(shift: number){
    this.setState({...this.state, show_shift: shift});
  }

  setCurrentlyActiveShift(){

  }

  componentDidMount(){
    console.log(this.props)
    this.props.fetchPlanningsFromPost(this.props.match.params.post);
  }

  renderCorrectShift(data: any){
    if(data.shift_id === this.state.show_shift){
      return <Shift {... data}/>
    }
  }

  renderPost(): any{
    console.log(this.props.arePlanningsFormPostFetched)
    if(this.props.loading == true){
        return <div>Loading...</div>
      } else {
        if(this.props.arePlanningsFormPostFetched !== undefined){
          if(this.props.arePlanningsFormPostFetched.length <= 0){
            return <div> No info found.</div>
          } else{
            return this.props.arePlanningsFormPostFetched.map((data: any) => {
              return this.renderCorrectShift(data)
            })
          }
        } else{
          return <div> loading ...</div>
        }
      }
}

  getNextShift(){
    this.handleShiftSwitch(2)
    console.log(this.state.show_shift)
  }


  render(){
    console.log("render",this.props)
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Sector: {this.props.match.params.sector} - Post: {this.props.match.params.post}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Blank</IonTitle>
            </IonToolbar>
          </IonHeader>
          <div className="flexrow">
            <IonButton><IonIcon icon={arrowBack}/></IonButton>
                          <IonCardTitle>
                              Huidige shift
                          </IonCardTitle>
            <IonButton onClick={() => this.getNextShift()}><IonIcon icon={arrowForward}/></IonButton>
          </div>
        
          {this.renderPost()}
        </IonContent>
      </IonPage>
    );
  };
}
  


function mapStateToProps(state: any) {
  return({
    arePlanningsFormPostFetched: state.post.arePlanningsFormPostFetched,
    errorMessage: state.post.errorMessage,
    loading: state.post.loading,
  })
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    fetchPlanningsFromPost
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(PostView);
