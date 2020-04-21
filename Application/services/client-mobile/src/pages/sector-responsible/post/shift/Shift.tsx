import React from 'react';
import { Component } from 'react';

import { IonButton, 
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCard, IonIcon, IonSlide, IonRow, IonCol, IonGrid, IonItem, IonLabel, IonCheckbox } from '@ionic/react';
import './Shift.css';
import { arrowBack, arrowForward, caretDown } from 'ionicons/icons';
import {formatDateTime} from '../../../common_functions/date_formatter';
import {itemToggle} from '../PostAction' 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


  
class Shift  extends Component<any> {
    constructor(props: any) {
        super(props);
    }
    

    state = {
        checkListActive: false
    }


    handleToggleCheckListItem(item_id: number){
        this.props.itemToggle(item_id)
    }


    showCheckList(checklist_data: any) {
        console.log(checklist_data)
        if(this.state.checkListActive){
        return(
            <IonCardContent>
            {checklist_data.map((item: any, i: number) => (
            <IonItem key={i}>
                <IonLabel>{item.planning.user.first_name}: {item.item_type.name}</IonLabel>
                <IonCheckbox slot="end" value={item.item_type.name} checked={!item.item_lost} onIonChange={e => this.handleToggleCheckListItem(item.id)}/>
            </IonItem>
            ))}
            </IonCardContent>
        )
        } else{
        return <div></div>
        }
    }

    handleToggleCheckList(){
        this.setState({...this.state, checkListActive: !this.state.checkListActive});
    }

    renderCheckbox(data: any){
        return(
            <IonCard>
                <IonCardHeader>
                <IonCardTitle onClick={() => this.handleToggleCheckList()}>
                    CheckList
                    <IonIcon class="text_end" icon={caretDown}/>
                </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    {this.showCheckList(data)}
                </IonCardContent>
            </IonCard>
        )
          
    }

    getUsersFromShift(){
        let names_array = this.props.shift_users
        var names = ""
        for(var i = 0; i < names_array.length - 1; ++i){
            var names = names.concat(names_array[0] + " en ")
        }
        var names = names.concat(names_array[names_array.length - 1])

        return names
    }

    renderShiftInfo(data: any){
        return(
        <IonCard>
                <IonCardHeader className="flexrow">
                        <IonCardTitle>
                            Shift Info
                        </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="3">
                                Wie
                            </IonCol>
                            <IonCol>
                                {this.getUsersFromShift()}
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="3">
                                Wat
                            </IonCol>
                            <IonCol>
                                {data.post.title}
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="3">
                                Waar
                            </IonCol>
                            <IonCol>
                                {data.post.address}
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="3">
                                Start
                            </IonCol>
                            <IonCol>
                                {formatDateTime(data.shift.begin)}
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="3">
                                Einde
                            </IonCol>
                            <IonCol>
                                {formatDateTime(data.shift.end)}
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCardContent>
        </IonCard>
        )
    }

    renderProblemInfo(problem_data: any){
        console.log(problem_data)
        return(
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>
                Problemen Log
                <IonIcon/>
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonGrid>
                {
                    problem_data.map((problem: any) => {
                        return (
                            <IonRow>
                                <IonCol>
                                    {problem.planning.user.first_name}
                                </IonCol>
                                <IonCol>
                                    {problem.problem_type.title}
                                </IonCol>
                            </IonRow>
                        )
                    })
                }
                </IonGrid>
            </IonCardContent>
          </IonCard>
        )
    }

    render() {
        if(this.props.shift_data[0] !== undefined){
            let shift_data = this.props.shift_data[0]
            let items_data = this.props.shift_items
            let shift_problems = this.props.shift_problems;
            return (
                <div>
                    {this.renderShiftInfo(shift_data)}
                    {this.renderCheckbox(items_data)}
                    {this.renderProblemInfo(shift_problems)}
                </div>    
                ) 
        }   else {
            return <div></div>
        }     
    }  
    
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
      itemToggle
    }, dispatch);
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Shift);

