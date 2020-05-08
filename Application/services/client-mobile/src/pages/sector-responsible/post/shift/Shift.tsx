import React from 'react';
import { Component } from 'react';

import { IonButton, 
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCard, IonIcon, IonSlide, IonRow, IonCol, IonGrid, IonItem, IonLabel, IonCheckbox, IonInput, IonTextarea } from '@ionic/react';
import './Shift.css';
import { arrowBack, arrowForward, caretDown } from 'ionicons/icons';
import {formatDateTime} from '../../../common_functions/date_formatter';
import {itemToggle, problemToggle} from '../PostAction' 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


  
class Shift  extends Component<any> {
    constructor(props: any) {
        super(props);
    }
    

    state = {
        checkListActive: false,
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

    handleToggleCheckListItem(item_id: number){
        this.props.itemToggle(item_id, this.props.shift_id)
        console.log("toggled")
    }

    toggleProblemSolved(problem_id: number){
        console.log("toggled problem")
        this.props.problemToggle(problem_id)
    }


    showCheckList(checklist_data: any) {
        if(this.state.checkListActive){
        return(
            <IonCardContent>
            {checklist_data.map((item: any, i: number) => (
            <IonItem key={i}>
                <IonLabel>{item.user}: {item.name}</IonLabel>
                    <IonCheckbox slot="end" value={item.name} checked={!item.item_lost}
                        onIonChange={e => this.handleToggleCheckListItem(item.id)}
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
        let names_array = this.props.users
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
                                {data.title}
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="3">
                                Waar
                            </IonCol>
                            <IonCol>
                                {data.address}
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="3">
                                Start
                            </IonCol>
                            <IonCol>
                                {formatDateTime(data.shift_begin)}
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="3">
                                Einde
                            </IonCol>
                            <IonCol>
                                {formatDateTime(data.shift_end)}
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

    renderProblems(shift_problems: any){
        return shift_problems.map((problem: any) => {
            if(problem.solved === false){
                return (
                    <IonGrid className="grid" key={problem.id}>
                    <IonRow key={problem.id}> 
                        <IonCol>
                            {problem.user}
                        </IonCol>
                        <IonCol className="rightContent">
                            {formatDateTime(problem.created_at)}
                        </IonCol>
                    </IonRow>
                    <IonRow>
                    <IonCol>
                        {problem.title}, {problem.description}
                    </IonCol>
                    <IonCol className="rightContent" size="4">
                        <IonButton onClick={() => this.toggleProblemSolved(problem.id)}>Ok</IonButton>
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
                            {problem.user}
                        </IonCol>
                        <IonCol className="rightContent">
                            {formatDateTime(problem.created_at)}
                        </IonCol>
                    </IonRow>
                    <IonRow>
                    <IonCol>
                        {problem.title}, {problem.description}
                    </IonCol>
                    </IonRow>
                    <IonRow>
                    
                    </IonRow>
                    </IonGrid>
                )
            }
            
        })
        
    }

    renderProblemInfo(shift_problems: any){
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
                {this.renderProblems(shift_problems)}
                </IonGrid>
            </IonCardContent>
          </IonCard>
        )
    }

    render() {
        let items_data = this.props.items
        let shift_problems = this.props.problems;
        return (
            <div>
                {this.renderShiftInfo(this.props)}
                {this.renderCheckbox(items_data)}
                {this.renderProblemInfo(shift_problems)}
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

