import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCardHeader, IonList, IonCard, IonCheckbox, IonItem, IonLabel, IonItemDivider, IonCardTitle, IonCardContent, IonButton, IonIcon, IonSlides, IonSlide } from '@ionic/react';
import React, { Fragment, useState, Component, ReactNode, useEffect } from 'react';
import './PostPage.css';
import { RouteComponentProps } from 'react-router';
import Shift from '../shift/Shift';
import { caretDown } from 'ionicons/icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {fetchPlanningsWithPostId} from './PostAction'

const checkboxList = [
  { val: 'Fluo Band', isChecked: false },
  { val: 'Plaatje', isChecked: false },
  { val: 'Michiel', isChecked: false },
  { val: 'Wouter', isChecked: false },
];


// Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
const slideOpts = {
  direction: 'horizontal',
  speed: 400,
};

class PostView extends Component<any> {
  state = {
    checkListActive: false,
  }
  


  componentDidMount(){
    this.props.fetchPlanningsWithPostId(this.props.match.params.post);
  }

  getUsersFromShift(id: number): any{
    let shift_info = this.props.arePlanningsFetched.filter((element: any) => (
      element.shift_id === id
    ))

    return shift_info
  }

  getUsersFromShifts(shifts: any){

  }


  

  renderPost(){
    if(this.props.loading == true){
      return <div>Loading...</div>
    } else {
      if(this.props.arePlanningsFetched !== undefined){
        if(this.props.arePlanningsFetched.length <= 0){
          return <div> No messages found. </div>
        } else{

          let list: number[] = []
          return this.props.arePlanningsFetched.map((data: any, index: number) => {
            if(!list.includes(data.shift_id)){
              list.push(data.shift_id)
              let shift_data = this.getUsersFromShift(data.shift_id)
                return (
                  <Shift {... data} />
                  )
            }  
          })
        }
      }
    }
  }

  renderShift(shift_id: number){

  }


  render(){
    console.log(this.props)
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
          <IonSlides pager={true} options={slideOpts}>
            {this.renderPost()}
          </IonSlides>
        </IonContent>
      </IonPage>
    );
  };
}
  

function mapStateToProps(state: any) {
  return({
    arePlanningsFetched: state.post.arePlanningsFetched,
    errorMessage: state.post.errorMessage,
    loading: state.post.loading
  })
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    fetchPlanningsWithPostId
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(PostView);