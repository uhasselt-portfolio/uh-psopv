import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCardHeader, IonList, IonCard, IonCheckbox, IonItem, IonLabel, IonItemDivider, IonCardTitle, IonCardContent, IonButton, IonIcon, IonSlides, IonSlide, IonGrid, IonRow, IonCol } from '@ionic/react';
import React, { Fragment, useState, Component, ReactNode, useEffect, useRef } from 'react';
import './PostPage.css';
import Shift from './shift/Shift';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {fetchPlanningsFromPost} from './PostAction'
import { caretDown, arrowBack, arrowForward, constructOutline } from 'ionicons/icons';
import { formatDateTime } from '../../common_functions/date_formatter';
import { Switch } from 'react-router';

const slideOpts = {
  direction: 'horizontal',
  speed: 400,
};

let swiper: any = null;

const init = async function(this: any) {
    swiper = await this.getSwiper();
};



class PostView extends Component<any, any> {
  state = {
    checkListActive: false,
    show_shift: -1, // niets
    current_shift: -1, 
  }

  constructor(props: any){
    super(props)
  }

  handleShiftSwitch(shift: number){
    this.setState({...this.state, show_shift: shift});
  }

  getNextShift(swiper: any){
    swiper.slideNext();
    if (this.state.show_shift < this.props.localStorage.shifts.length - 1){
      let new_shift = this.state.show_shift + 1
      this.handleShiftSwitch(new_shift);
    }
  }

  getPreviousShift(swiper: any){
    console.log(swiper)
    swiper.slidePrev();
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

    this.props.localStorage.shifts.map((element: any, index: number) => {
      var shift_begin = new Date(element.shift_start)
      var shift_end = new Date(element.shift_end)

      if((current_time > shift_begin) && (current_time < shift_end)){
        this.setState({...this.state, show_shift: index, current_shift: index});
      }
    })
  }

  componentDidMount(){
    this.props.fetchPlanningsFromPost(this.props.match.params.post);
  }

  renderPost(): any{
    console.log(this.props)
    if(this.state.show_shift === -1){
      this.setCurrentlyActiveShift();
      return <IonCard>Er is op deze post geen actieve shift bezig</IonCard>
    } else{
      let data = this.props.localStorage.shifts[this.state.show_shift];
      return <Shift shift={data} post={this.props.localStorage}/>
    }
  }

  handleSlideChange(test: any){
    // this.getActiveIndex()
    if(test != null){
      console.log("changed slide", test.activeIndex)
      this.handleShiftSwitch(test.activeIndex)
    }
  }
  

  renderShifts(){

    const slideOpts = {
      initialSlide: 0,
      speed: 400,
      direction: 'horizontal'
    };

    let shifts = this.props.localStorage.shifts.map((shift: any) => {
      return (<IonSlide>
              <Shift shift={shift} post={this.props.localStorage}/>
            </IonSlide>)
    })


    return (
    <IonSlides onIonSlidesDidLoad={init} pager={true} options={slideOpts} onIonSlideDidChange={()=> this.handleSlideChange(swiper)}>
      {shifts}
    </IonSlides>
    )
  }

  renderBasis(){
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
            <IonButton onClick={() => this.getPreviousShift(swiper)}><IonIcon icon={arrowBack}/></IonButton>
                          <IonCardTitle>
                              {this.getCurrentShiftText()}
                          </IonCardTitle>
            <IonButton onClick={() => this.getNextShift(swiper)}><IonIcon icon={arrowForward}/></IonButton>
          </div>
          {this.renderShifts()}
          
        </IonContent>
      </IonPage>
    );
  }

  render(){
    console.log(this.props)
    if(this.props.localStorage != undefined){
      return this.renderBasis();
    } else{
      return <div> No internet connection </div>
    }
  };
}
  


function mapStateToProps(state: any) {
  console.log(state)
  return({
    localStorage: state.post.localStorage,
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
