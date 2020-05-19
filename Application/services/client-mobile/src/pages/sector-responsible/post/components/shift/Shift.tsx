import React from 'react';
import { Component } from 'react';

import { IonButton, 
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCard, IonIcon, IonSlide, IonRow, IonCol, IonGrid, IonItem, IonLabel, IonCheckbox, IonInput, IonTextarea, IonList, IonPopover, IonToast } from '@ionic/react';
import './Shift.css';
import { arrowBack, arrowForward, caretDown } from 'ionicons/icons';
import {formatDateTime} from '../../../../common_functions/date_formatter';
import {itemToggle, problemToggle} from '../../PostAction' 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {resetActionList, getActionList, addObjectToActionList} from '../../../../save/saveFunction'
import ShiftProblem from './ShiftProblem';
import AddProblem from './AddProblem';


class Shift  extends Component<any> {
    constructor(props: any) {
        super(props);

        this.getDataAddProblem = this.getDataAddProblem.bind(this);
    }
    

    state = {
        checkListActive: false,
        problemListActive: false,
        problemStates: [],
        problemTitle: "",
        problemContent: "",
        showAddProblem: false,
        showToast: false,
    }

    getDataAddProblem(val: any){
        // do not forget to bind getData in constructor
        console.log(val);
        let params = {planning_id: val.selected_planning_id,
                    problem_type_id: val.problem_id,
                    created_by: this.props.my_user_id,
                    created_by_id: this.props.my_user_id}

        addObjectToActionList('https://psopv.herokuapp.com/api/problem/add', params)
    
        this.setShowToast(true);
      }

      

    handleSendMessage(){
        this.props.addProblem(this.state.problemTitle, this.state.problemContent); // TODO USERID
      }
    
      handleProblemTitleChange(new_title: string | null | undefined){
        this.setState({...this.state, problemTitle: new_title});
      }
    
      handleProblemContentChange(new_message: string | null | undefined){
        this.setState({...this.state, problemContent: new_message});
      }
    
    //   handleSendToChange(new_send_to: number){
    //     this.setState({...this.state, send_to_id: new_send_to});
    //   }

    componentDidMount(){
    }

    handleToggleCheckListItem(item_id: Number, item_value: boolean){
        this.props.itemToggle(item_id);
        console.log("toggled item")
    }


    showCheckList() {
        let checklist_data = this.props.shift.shift_items
        if(this.state.checkListActive){
        return(
            <IonCardContent>
            {checklist_data.map((item: any, i: number) => (
            <IonItem key={i}>
                <IonLabel>{item.item_from}: {item.item_name}</IonLabel>
                    <IonCheckbox slot="end" value={item.item_name} checked={!item.item_lost}
                        onIonChange={e => this.handleToggleCheckListItem(item.item_id, !item.item_lost)}
                    />
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

    handleToggleProblemList(){
        this.setState({...this.state, problemListActive: !this.state.problemListActive});
    }

    renderCheckbox(){
        return(
            <IonCard>
                <IonCardHeader>
                <IonCardTitle onClick={() => this.handleToggleCheckList()}>
                    CheckList
                    <IonIcon class="text_end" icon={caretDown}/>
                </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    {this.showCheckList()}
                </IonCardContent>
            </IonCard>
        )
          
    }

    getUsersFromShift(){
        let names_array = this.props.shift.shift_users
        var names = ""
        for(var i = 0; i < names_array.length - 1; ++i){
            var names = names.concat(names_array[i].name + " en ")
        }
        var names = names.concat(names_array[names_array.length - 1].name)

        return names
    }

    renderShiftInfo(){
        return(
        <IonCard>
                <IonCardHeader>
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
                                {this.props.post.post_description}
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="3">
                                Waar
                            </IonCol>
                            <IonCol>
                                <IonRow>
                                    {this.props.post.loc_description}, 
                                </IonRow>
                                <IonRow>
                                    {this.props.post.loc_address}
                                </IonRow>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="3">
                                Start
                            </IonCol>
                            <IonCol>
                                {formatDateTime(this.props.shift.shift_start)}
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="3">
                                Einde
                            </IonCol>
                            <IonCol>
                                {formatDateTime(this.props.shift.shift_end)}
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCardContent>
        </IonCard>
        )
    }

    renderAddProblem(){
        return(
            <div>

            </div>
        )
    }

    showProblemList() {
        if(this.state.problemListActive){
        return(
            <IonCardContent className="noPadding">
                <IonItem>
                    <IonButton className="bigSize" onClick={() => this.showAddProblem()}> Voeg een probleem toe </IonButton>
                </IonItem>
                <IonList>
                    {this.renderProblems()}
                </IonList>
            </IonCardContent>
        )
        } else{
        return <div></div>
        }
    }

    renderProblems(){
        let shift_problems = this.props.shift.shift_problems
        console.log(shift_problems)

        let shift_problems_not_solved = shift_problems.filter((problem: any) => {return problem.problem_solved == true})
        let shift_problems_solved = shift_problems.filter((problem: any) => {return problem.problem_solved == false})
        let problems = shift_problems_solved.concat(shift_problems_not_solved);

        return problems.map((problem: any) => {
            return (
                <ShiftProblem {...problem} />
            )
        })
    
    }

    renderProblemInfo(){
        return(
          <IonCard>
            <IonCardHeader>
              <IonCardTitle onClick={() => this.handleToggleProblemList()}>
                Problemen Log
                <IonIcon class="text_end" icon={caretDown}/>
              </IonCardTitle>
            </IonCardHeader>
            {this.showProblemList()}
          </IonCard>
        )
    }



    hideAddProblem(){
        this.setState({...this.state, showAddProblem: false});
    }

    showAddProblem(){
        this.setState({...this.state, showAddProblem: true}); 
    }

    setShowToast(state: boolean){
        this.setState({...this.state, showAddProblem: false, showToast: true});
    }

    render() {
        console.log(this.props)
        return (
            <div className="leftAlign">
                {this.renderShiftInfo()}
                {this.renderCheckbox()}
                {this.renderProblemInfo()}
                <>
                <IonPopover
                  isOpen={this.state.showAddProblem}
                  onDidDismiss={() => this.hideAddProblem()}
                >
                <AddProblem problemTypes={this.props.problemTypes} users={this.props.shift.shift_users} sendData={this.getDataAddProblem}/>
                </IonPopover>
                </>
                <IonToast
                isOpen={this.state.showToast}
                onDidDismiss={() => this.setShowToast(false)}
                message="Probleem is gemeld."
                duration={400}
                />
                
                
            </div>    
            ) 
    }  
    
}


  
  
  
function mapStateToProps(state: any) {
    return({
    })
  }
  
  function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
      itemToggle,
      problemToggle
    }, dispatch);
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Shift);

