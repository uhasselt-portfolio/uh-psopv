import React from 'react';
import { Component } from 'react';

import { IonButton, 
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCard, IonIcon, IonSlide, IonRow, IonCol, IonGrid, IonItem, IonLabel, IonCheckbox, IonInput, IonTextarea, IonList, IonPopover, IonToast } from '@ionic/react';
import './Shift.css';
import { arrowBack, arrowForward, caretDown } from 'ionicons/icons';
import {formatDateTime} from '../../../../../utils/DateUtil';
import {itemToggle, problemToggle, addProblem} from '../../PostAction' 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
        problem_end_index: 3,
    }

    getDataAddProblem(val: any){
        let params = {planning_id: val.selected_planning_id,
                    problem_type_id: val.problem_id,
                    created_by: this.props.my_user_id,
                    created_by_id: this.props.my_user_id}

        console.log(this.props, "PRROPSS")
        this.props.addProblem(this.props.shift.shift_id, this.props.post.post_id, params)

        // this.props.sendDataAddProblem(this.props.shift.shift_id, this.props.post.post_id, params);
    
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
        this.props.itemToggle(item_id, this.props.shift.shift_id, this.props.post.post_id);
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

    loadMoreProblems(){
        this.setState({...this.state, problem_end_index: this.state.problem_end_index+5})
    }

    showProblemList() {
        let offlineMessage = "";
        if(!navigator.onLine){
            offlineMessage = "U bent offline, problemen worden pas doorgegeven aan derden eens u terug online gaat."
        } 

        let loadMore;
        if(this.props.shift.shift_problems.length > this.state.problem_end_index){
            loadMore = <IonButton onClick={() => this.loadMoreProblems()}>Meer laden...</IonButton>
        } else{
            console.log("hey", this.props.shift.shift_problems, this.state.problem_end_index)
            loadMore = <div></div>
        }

        
        if(this.state.problemListActive){
        return(
            <IonCardContent className="noPadding">
                <div className="offlineMsg">{offlineMessage}</div>
                <IonItem>
                    <IonButton className="bigSize" onClick={() => this.showAddProblem()}> Voeg een probleem toe </IonButton>
                </IonItem>
                <IonList>
                    {this.renderProblems()}
                    {loadMore}
                </IonList>
            </IonCardContent>
        )
        } else{
        return <div></div>
        }
    }

    renderProblems(){
        let shift_problems = this.props.shift.shift_problems

        let shift_problems_solved = shift_problems.filter((problem: any) => {return problem.problem_solved == true})
        let shift_problems_not_solved = shift_problems.filter((problem: any) => {return problem.problem_solved == false})
        let problems = shift_problems_not_solved.concat(shift_problems_solved);

        let problemsList: any[] = [];
        let end_index = this.state.problem_end_index
        if(problems.length < this.state.problem_end_index){
            end_index = problems.length
        }
        for(let i = 0; i < end_index; i++){
            let problem = problems[i];
            problemsList.push(<ShiftProblem {...problem} shift_id={this.props.shift.shift_id} post_id={this.props.post.post_id}/>);
        }

        return problemsList.map((problem: any) => {
            return (
                problem
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
        console.log("SHIFT", this.props)
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
      problemToggle,
      addProblem
    }, dispatch);
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Shift);

