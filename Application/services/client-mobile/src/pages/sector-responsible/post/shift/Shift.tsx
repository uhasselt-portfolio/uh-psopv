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
        checkListActive: true,
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
        this.props.itemToggle(item_id)
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
                <IonLabel>{item.planning.user.first_name}: {item.item_type.name}</IonLabel>
                    <IonCheckbox slot="end" value={item.item_type.name} checked={!item.item_lost}
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

    renderAddProblem(){
        return(
            <div>

            </div>
        )
    }

    renderProblems(){
        return this.props.shift_problems.map((problem: any) => {
            if(problem.solved === false){
                return (
                    <IonGrid className="grid" key={problem.id}>
                    <IonRow key={problem.id}> 
                        <IonCol>
                            {problem.planning.user.first_name +" "+problem.planning.user.last_name}
                        </IonCol>
                        <IonCol className="rightContent">
                            {formatDateTime(problem.created_at)}
                        </IonCol>
                    </IonRow>
                    <IonRow>
                    <IonCol>
                        {problem.problem_type.title}, {problem.problem_type.description}
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
                            {problem.planning.user.first_name +" "+problem.planning.user.last_name}
                        </IonCol>
                        <IonCol className="rightContent">
                            {formatDateTime(problem.created_at)}
                        </IonCol>
                    </IonRow>
                    <IonRow>
                    <IonCol>
                        {problem.problem_type.title}, {problem.problem_type.description}
                    </IonCol>
                    </IonRow>
                    <IonRow>
                    
                    </IonRow>
                    </IonGrid>
                )
            }
            
        })
        
    }

    renderProblemInfo(data: any){
        let problem_data = this.props.shift_problems;
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
                {this.renderProblems()}
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
                    {this.renderProblemInfo(this.props.shift_problems)}
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
      itemToggle,
      problemToggle
    }, dispatch);
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Shift);

