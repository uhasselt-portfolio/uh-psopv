import React, { Fragment, useState, Component} from 'react';
import './ProblemsPage.css';
import ProblemItem from './component/Problem_Item'
import { connect } from "react-redux";
import {  bindActionCreators } from "redux";
import {fetchProblemsOf, loadProblem} from './ProblemsAction'



import { IonButton, 
  IonList } from '@ionic/react';
import { setListLocalStorage } from '../../../save/saveFunction';
import { withRouter } from 'react-router';



class ProblemsPage extends Component<any> {
  constructor(props: any) {
    super(props);
  }

  interval: NodeJS.Timeout | undefined;

  state = {
    amount_msg: 0
  }


  componentWillUnmount() {
    if(this.interval !== undefined){
      clearInterval(this.interval);
    }
  }

  async ionViewWillEnter() {
    await setListLocalStorage('problem_end_index', 5)
  }

  componentDidMount(){
    this.props.fetchProblemsOf();

    this.interval = setInterval(() => {
      this.props.fetchProblemsOf();
    }, 5000);
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
    if(this.props.localStorage !== undefined){
      if(this.props.localStorage.problems.length <= 0){
          return <div> No messages found. </div>
      } else{
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProblemsPage));
