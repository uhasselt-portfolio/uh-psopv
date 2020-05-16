import React, { Fragment, useState, Component} from 'react';
import './ProblemsPage.css';
import ProblemItem from './component/Problem_Item'
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Dispatch, bindActionCreators } from "redux";
import {fetchProblemsOf} from './ProblemsAction'



import { IonButton, 
  IonListHeader, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonList, 
  IonItem, 
  IonLabel,
  IonText, IonInput, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonContent, IonAvatar, IonTabBar, IonTabButton, IonIcon } from '@ionic/react';



class ProblemsPage extends Component<any> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount(){
    this.props.fetchProblemsOf(); // TODO USERID
  }

  renderList(){
    if(this.props.localStorage != undefined){
      if(this.props.localStorage.length <= 0){
          return <div> No messages found. </div>
      } else{
        return this.props.localStorage.map((data: any, index: number) =>{
          return (
          <ProblemItem {... data}/>
          )
        })
        }
      } else{
        return <div> No internet connection ... </div>
    }
  }


  render(){
    console.log(this.props)
    return (
          <IonList>
            {this.renderList()}
          </IonList>
    );
    }
};

function mapStateToProps(state: any) {
  console.log(state)
  return({
    localStorage: state.problems.areProblemsFetched,
    errorMessage: state.problems.errorMessage,
    loading: state.problems.loading
  })
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    fetchProblemsOf
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProblemsPage);
