import React, { Fragment, useState, Component} from 'react';
import './ProblemsPage.css';
import ProblemItem from './component/Problem_Item'
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Dispatch, bindActionCreators } from "redux";
import {fetchProblemsOf, loadProblem} from './ProblemsAction'



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

  loadMoreProblems(){
    this.props.loadProblem();
  }

  renderList(){
    
        return this.props.localStorage.problems.map((data: any, index: number) =>{
          return (
          <ProblemItem {... data}/>
          )
        })
        
  }


  render(){
    if(this.props.localStorage != undefined){
      if(this.props.localStorage.problems.length <= 0){
          return <div> No messages found. </div>
      } else{
        console.log(this.props)
        let button;
        if(!this.props.localStorage.loaded){
          button = <IonButton className="marginBottom" onClick={() => this.loadMoreProblems()}> Meer berichten laden ... </IonButton>
        } else{
          button = <div></div>;
        }
        return (
              <IonList>
                {this.renderList()}
                {button}
              </IonList>
        );
      }
      } else{
        return <div> No internet connection ... </div>
    }
    
    
    }
};

function mapStateToProps(state: any) {
  return({
    localStorage: state.problems.areProblemsFetched,
    errorMessage: state.problems.errorMessage,
    loading: state.problems.loading
  })
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    fetchProblemsOf,
    loadProblem
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProblemsPage);
