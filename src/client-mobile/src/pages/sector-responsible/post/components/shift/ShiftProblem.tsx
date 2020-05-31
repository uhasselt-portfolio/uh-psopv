import * as React from 'react';
import { IonButton, 
    IonItem, 
     IonIcon, IonPopover, IonGrid, IonRow, IonCol, IonToast } from '@ionic/react';
import { checkmark, trashBinOutline } from 'ionicons/icons';
import { formatDateTime } from '../../../../../utils/DateUtil';
import './Shift.css'
import {problemToggle, removeProblem} from '../../PostAction'

import RemoveProblem from './RemoveProblem'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';



class ShiftProblem extends React.Component<any> {
    constructor(props: any) {
        super(props);

        this.getDataRemoveProblem = this.getDataRemoveProblem.bind(this);

    }

    state = {
      solved: this.props.problem_solved,
      showRemoveProblem: false,
      showToast: false
    }  
    

    toggleSolved(){
      this.setState({...this.state, solved: !this.state.solved});
      this.props.problemToggle(this.props.problem_id, this.props.shift_id, this.props.post_id);
      console.log("problem toggled")
    }

    setShowToast(state: boolean){
        this.setState({...this.state, showToast: state, showRemoveProblem: false});
      }
    

    hideRemoveProblem(){
        this.setState({...this.state, showRemoveProblem: false});
    }

    showRemoveProblem(){
        this.setState({...this.state, showRemoveProblem: true});
    }

    getDataRemoveProblem(val: any){
        if(val == true){
            this.props.removeProblem(this.props.shift_id, this.props.post_id, this.props.problem_id);
            this.setShowToast(true)
        } else{
            this.hideRemoveProblem();

        }
      }




  renderSolved(){
        return (
            <IonGrid key={this.props.problem_id} className="solved">
            <IonRow key={this.props.problem_id}> 
                <IonCol size="5.5">
                    {this.props.created_by_name}
                </IonCol>
                <IonCol size="4.5">
                    {formatDateTime(this.props.created_at)}
                </IonCol>
                <IonCol  size="2">
                <IonButton onClick={() => this.showRemoveProblem()}><IonIcon icon={trashBinOutline} /></IonButton>
                </IonCol>
            </IonRow>
            <IonRow>
            <IonCol  size="12">
                <p className="greyText">{this.props.problem_title}, {this.props.problem_description}</p>
            </IonCol>
            </IonRow>
            </IonGrid>
        )
  }

  renderNotSolved(){
    return (
        <IonGrid key={this.props.problem_id} className="notSolved">
        <IonRow key={this.props.problem_id}> 
            <IonCol size="5.5">
                {this.props.created_by_name}
            </IonCol>
            <IonCol size="4.5">
                {formatDateTime(this.props.created_at)}
            </IonCol>
            <IonCol  size="2">
            <IonButton onClick={() => this.showRemoveProblem()}><IonIcon icon={trashBinOutline} /></IonButton>
            </IonCol>
        </IonRow>
        <IonRow>
        <IonCol  size="10">
            <p className="greyText">{this.props.problem_title}, {this.props.problem_description}</p>
        </IonCol>
        <IonCol  size="2">
        <IonButton onClick={() => this.toggleSolved()}><IonIcon icon={checkmark} /></IonButton>
        </IonCol>
        </IonRow>
        </IonGrid>
    )
}



    render(){

        if(this.state.solved == false){
            return (
                <IonItem className="noPadding">
                        {this.renderNotSolved()}
                        <>
                <IonPopover
                  isOpen={this.state.showRemoveProblem}
                  onDidDismiss={() => this.hideRemoveProblem()}
                >
                    <RemoveProblem sendData={this.getDataRemoveProblem}/>
                </IonPopover>
                </>
                <IonToast
                isOpen={this.state.showToast}
                onDidDismiss={() => this.setShowToast(false)}
                message="Probleem is Verwijderd."
                duration={400}
                />
                </IonItem>
                );
        } else{
            return (
                <IonItem className="noPadding">
                        {this.renderSolved()}
                        <>
                <IonPopover
                  isOpen={this.state.showRemoveProblem}
                  onDidDismiss={() => this.hideRemoveProblem()}
                >
                <RemoveProblem sendData={this.getDataRemoveProblem}/>
                </IonPopover>
                </>
                <IonToast
                isOpen={this.state.showToast}
                onDidDismiss={() => this.setShowToast(false)}
                message="Probleem is verwijderd."
                duration={400}
                />
            
                </IonItem>
                );
        }
        
    }

};


function mapStateToProps(state: any) {
    return({
    })
  }
  
  function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
      problemToggle,
      removeProblem
    }, dispatch);
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(ShiftProblem);