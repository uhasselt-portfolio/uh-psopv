import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCardHeader, IonList, IonCard, IonCheckbox, IonItem, IonLabel, IonItemDivider, IonCardTitle, IonCardContent, IonButton, IonIcon, IonSlides, IonSlide, IonGrid, IonRow, IonCol } from '@ionic/react';
import React, { Fragment, useState, Component, ReactNode, useEffect } from 'react';
import './PostPage.css';
import Shift from './shift/Shift';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {fetchPlanningsFromPost} from './PostAction'
import { caretDown, arrowBack, arrowForward } from 'ionicons/icons';
import { formatDateTime } from '../../common_functions/date_formatter';
import Save from '../save_actions/Save'

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
    show_shift: -1, // niets
    current_shift: -1 
  }

  constructor(props: any){
    super(props)
  }

  handleShiftSwitch(shift: number){
    this.setState({...this.state, show_shift: shift});
  }

  getNextShift(){
    if (this.state.show_shift < this.props.localState.shifts_data.length - 1){
      let new_shift = this.state.show_shift + 1
      this.handleShiftSwitch(new_shift);
    }
  }

  getPreviousShift(){
    if (this.state.show_shift > 0) {
      let new_shift = this.state.show_shift - 1
      this.handleShiftSwitch(new_shift);
    }
  }

  getCurrentShiftText(){
    let show_shift = this.state.show_shift
    let current_shift = this.state.current_shift
    let distance = show_shift - current_shift

    if (distance === 0){
      return "Huidige Shift"
    } else if (distance > 0 && distance === 1) {
      return distance + "ste volgende shift"
    } else if (distance > 1 ){
      return distance + "de volgende shift"
    }else if (distance < 0 && distance === -1){
      return Math.abs(distance) + "ste vorige shift"
    } else if (distance < 1 ){
      return Math.abs(distance) + "de vorige shift"
    }
  }

  setCurrentlyActiveShift(){
    var current_time = new Date();

    this.props.localState.shifts_data.map((element: any, index: number) => {
      var shift_begin = new Date(element.shift_begin)
      var shift_end = new Date(element.shift_end)

      if((current_time > shift_begin) && (current_time < shift_end)){
        this.setState({...this.state, show_shift: index, current_shift: index});
      }
    })
  }

  componentDidMount(){
    this.props.fetchPlanningsFromPost(this.props.match.params.post);
    console.log(this.props)
  }

  renderPost(): any{
      if(this.props.localState.shifts_data.length <= 0){
        return <div>No interconnection found</div>
      }
      if(this.props.localState.shifts_data.length > 0){
        if(this.state.show_shift === -1){
          this.setCurrentlyActiveShift();
          return <IonCard>Er is op deze post geen actieve shift bezig</IonCard>
        } else{
          let data = this.props.localState.shifts_data[this.state.show_shift];
          return <Shift key={data.id} {...data}/>
        }
      }
  }


  render(){
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
              <Save />
            </IonToolbar>
          </IonHeader>
          <div className="flexrow">
            <IonButton onClick={() => this.getPreviousShift()}><IonIcon icon={arrowBack}/></IonButton>
                          <IonCardTitle>
                              {this.getCurrentShiftText()}
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
    localState: state.post.localState,
    arePlanningsFormPostFetched: state.post.arePlanningsFormPostFetched,
    errorMessage: state.post.errorMessage,
    loading: state.post.loading,
  })
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    fetchPlanningsFromPost,
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(PostView);
