import React from 'react';
import { Component } from 'react';

import { IonButton, 
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCard, IonIcon, IonSlide, IonRow, IonCol, IonGrid, IonItem, IonLabel, IonCheckbox, IonInput, IonTextarea } from '@ionic/react';
import './Shift.css';
import { arrowBack, arrowForward, caretDown } from 'ionicons/icons';
import {formatDateTime} from '../../../../common_functions/date_formatter';
import {itemToggle, problemToggle} from '../../PostAction' 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {resetActionList, getActionList, addObjectToActionList} from '../../../../save/saveFunction'


  
class Shift  extends Component<any> {
    constructor(props: any) {
        super(props);
    }
    

    state = {
        checkListActive: false,
        problemListActive: false,
        problemTitle: "",
        problemContent: ""
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
        addObjectToActionList('https://psopv.herokuapp.com/api/item/toggle-lost/' + item_id, null)
        console.log("toggled item")
    }

    toggleProblemSolved(problem_id: number, item_value: boolean){
        addObjectToActionList('https://psopv.herokuapp.com/api/problem/toggle-solve/' + problem_id, null)
        console.log("toggled problem", item_value)
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
            var names = names.concat(names_array[0] + " en ")
        }
        var names = names.concat(names_array[names_array.length - 1])

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
        let checklist_data = this.props.shift.shift_items
        if(this.state.problemListActive){
        return(
            <IonCardContent>
                <IonGrid>
                    {this.renderProblems()}
                </IonGrid>
            </IonCardContent>
        )
        } else{
        return <div></div>
        }
    }

    renderProblems(){
        let shift_problems = this.props.shift.shift_problems
        console.log(shift_problems)

        return shift_problems.map((problem: any) => {
            if(problem.problem_solved === false){
                return (
                    <IonGrid className="grid" key={problem.problem_id}>
                    <IonRow key={problem.problem_id}> 
                        <IonCol>
                            {problem.created_by_name}
                        </IonCol>
                        <IonCol className="rightContent">
                            {formatDateTime(problem.created_at)}
                        </IonCol>
                    </IonRow>
                    <IonRow>
                    <IonCol>
                        {problem.problem_title}, {problem.problem_description}
                    </IonCol>
                    <IonCol className="rightContent" size="4">
                        <IonButton onClick={() => this.toggleProblemSolved(problem.problem_id, !problem.problem_solved)}>Ok</IonButton>
                    </IonCol>
                    </IonRow>
                    <IonRow>
                    
                    </IonRow>
                    </IonGrid>
                )
            } else{
                return (
                    <IonGrid className="gridSolved">
                    <IonRow key={problem.id}> 
                        <IonCol>
                            {problem.created_by_name}
                        </IonCol>
                        <IonCol className="rightContent">
                            {formatDateTime(problem.created_at)}
                        </IonCol>
                    </IonRow>
                    <IonRow>
                    <IonCol>
                    {problem.problem_title}, {problem.problem_description}
                    </IonCol>
                    </IonRow>
                    <IonRow>
                    
                    </IonRow>
                    </IonGrid>
                )
            }
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

    render() {
        return (
            <div className="leftAlign">
                {this.renderShiftInfo()}
                {this.renderCheckbox()}
                {this.renderProblemInfo()}
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

