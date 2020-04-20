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

class PostView extends Component<any, any> {
  state = {
    checkListActive: false,
  }

  constructor(props: any){
    super(props)
  }
  


  componentDidMount(){
    // console.log(this.props)
    this.props.fetchPlanningsWithPostId(this.props.match.params.post); // ERROR
  }

  getUsersFromShift(id: number): any{
    let shift_info = this.props.arePlanningsFetched.filter((element: any) => (
      element.shift_id === id
    ))

    return shift_info
  }

  renderPost(){
    if(this.props.loading == true){
      return <IonSlide>Loading...</IonSlide>
    } else {
      if(this.props.arePlanningsFetched !== undefined){
        if(this.props.arePlanningsFetched.length <= 0){
          return<IonSlide> No messages found.</IonSlide>
        } else{
          let list: number[] = []
          return this.props.arePlanningsFetched.map((data: any, index: number) => {
            if(!list.includes(data.shift_id)){
              list.push(data.shift_id)
                return (
                  // <IonSlide>yo</IonSlide>
                  <Shift {... data} />
                  )
            }  
          })
        }
      }
    }
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