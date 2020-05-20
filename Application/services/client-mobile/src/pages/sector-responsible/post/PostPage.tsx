import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCardHeader, IonList, IonCard, IonCheckbox, IonItem, IonLabel, IonItemDivider, IonCardTitle, IonCardContent, IonButton, IonIcon, IonSlides, IonSlide, IonGrid, IonRow, IonCol, IonPopover } from '@ionic/react';
import React, { Fragment, useState, Component, ReactNode, useEffect, useRef } from 'react';
import './PostPage.css';
import Shift from './components/shift/Shift';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {fetchPlanningsFromPost} from './PostAction'
import { caretDown, arrowBack, arrowForward, constructOutline } from 'ionicons/icons';
import { formatDateTime } from '../../common_functions/date_formatter';
import { Switch } from 'react-router';
import SelectShiftWindow from './components/SelectShiftWindow';

const slideOpts = {
  direction: 'horizontal',
  speed: 400,
};

let swiper: any = null;

const init = async function(this: any) {
    swiper = await this.getSwiper();
};

let selectShiftWindow: any = null;



class PostView extends Component<any, any> {
  constructor(props: any){
    super(props)

    this.getData = this.getData.bind(this);
  }

  state = {
    checkListActive: false,
    show_shift: -1, // niets
    current_shift: -1, 
    showPopover: false,
    swiper: null
  }

  hidePopover(){
    this.setState({...this.state, showPopover: false});
  }

  showPopOver(){
      this.setState({...this.state, showPopover: true});
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
    if(this.state.show_shift === -1){
      this.setCurrentlyActiveShift();
      return <IonCard>Er is op deze post geen actieve shift bezig</IonCard>
    } else{
      let data = this.props.localStorage.shifts[this.state.show_shift];
      return <Shift shift={data} post={this.props.localStorage} problem_types={this.props.localStorage.problemTypes}/>
    }
  }

  handleSlideChange(slider: any){
    // this.getActiveIndex()
    if(slider != null){
      this.handleShiftSwitch(slider.activeIndex)
    }
  }

  setShiftActive(shift_id: number){
    // this.getActiveIndex()
      this.handleShiftSwitch(shift_id)
    
  }
  

  renderShifts(){
    const slideOpts = {
      initialSlide: 0,
      speed: 400,
      direction: 'horizontal',
    };

    let shifts = this.props.localStorage.shifts.map((shift: any) => {
      return (<IonSlide>
              <Shift shift={shift} post={this.props.localStorage} 
              problemTypes={this.props.localStorage.problemTypes}
              my_user_id={this.props.localStorage.my_user_id}
              />
            </IonSlide>)
    })


    return (
    <IonSlides className="FullWidth" onIonSlidesDidLoad={init} pager={true} options={slideOpts} onIonSlideDidChange={()=> this.handleSlideChange(swiper)}>
      {shifts}
    </IonSlides>
    )
  }

  getData(val: any){
    // do not forget to bind getData in constructor
    let index_shift = 0;
    this.props.localStorage.shifts.map((element: any, index: number) => {
      if(element.shift_id == val.shift_id){
        index_shift = index;
      }
    })

    this.setShiftActive(val.shift_id);
    swiper.slideTo(index_shift);
    this.hidePopover();
  }

  renderSelectShiftWindow(){
    selectShiftWindow = <SelectShiftWindow shifts={this.props.localStorage.shifts} sendData={this.getData}/>
    return(
    <>
      <IonPopover
        isOpen={this.state.showPopover}
        onDidDismiss={() => this.hidePopover()}
      >
      {selectShiftWindow}
      </IonPopover>
    </>
    )
  }

  renderBasis(){
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle className="align_center"> 
              <div className="text_start">Sector: {this.props.match.params.sector} - Post: {this.props.match.params.post}</div>
              <IonButton className="text_end" onClick={() => this.showPopOver()}>Ga naar</IonButton>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="flexrow">
            <IonButton onClick={() => this.getPreviousShift(swiper)}><IonIcon icon={arrowBack}/></IonButton>
                          <IonCardTitle>
                              {this.getCurrentShiftText()}
                          </IonCardTitle>
            <IonButton onClick={() => this.getNextShift(swiper)}><IonIcon icon={arrowForward}/></IonButton>
          </div>
          {this.renderShifts()}
          {this.renderSelectShiftWindow()}
          
        </IonContent>
      </IonPage>
    );
  }

  render(){
    if(this.props.localStorage != undefined){
      console.log("POST", this.props)
      return this.renderBasis();
    } else{
      return <div> No internet connection </div>
    }
  };
}
  


function mapStateToProps(state: any) {
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
