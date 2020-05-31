import * as React from 'react';
import { IonButton, 
    IonHeader, 
    IonItem, 
   IonSelect, IonSelectOption, IonItemGroup } from '@ionic/react';

import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import './Shift.css'


class AddProblem extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }

    state = {
      showPopover: true,
      selected_volunteer: "Selecteer",
      selected_planning_id: -1,
      activeProblemType: 1
    }  


    hidePopover(){
        this.setState({...this.state, showPopover: false});
    }

    showPopOver(){
        this.setState({...this.state, showPopover: true});
        this.props.fetchUsers();
    }

    handleProblemClick(problem_id: any){
      this.setState({...this.state, activeProblemType: problem_id});
    }

    handleVolunteerChange(event: any){
      this.setState({...this.state, selected_planning_id: event});
    }
  


  handleClick(){
    let data = this.state
    this.props.sendData({selected_planning_id: data.selected_planning_id, problem_id:data.activeProblemType});
  }



  renderList(){
      return this.props.problemTypes.map((problemType: any, index: number) => {
        if(this.state.activeProblemType === problemType.id){
          return (
            <IonItem button color="medium">
                <p> <strong>{problemType.title}</strong>, {problemType.description}</p>
            </IonItem>
          )
        } else{
          return (
            <IonItem button color="light" onClick={() => this.handleProblemClick(problemType.id)} >
              <p> <strong>{problemType.title}</strong>, {problemType.description}</p>
            </IonItem>
          )
        }
        
    });
  }

  
  

    renderWindow(){
      let volunteers = this.props.users.map((user: any) => {
        return <IonSelectOption value={user.planning_id}> {user.name}</IonSelectOption>
      })

      return(
        <div className="generalPadding">
          <IonHeader className="generalPadding">Kies vrijwilliger:</IonHeader>
          <IonSelect className="whiteBackground" interface="popover" placeholder={this.state.selected_volunteer} onIonChange={e => this.handleVolunteerChange(e.detail.value)}>
                {volunteers}
          </IonSelect>

          <IonHeader className="generalPadding">Kies probleem:</IonHeader>
          <IonItemGroup  >
          {this.renderList()}
          </IonItemGroup>

          <IonButton onClick={() => this.handleClick()}>Kies</IonButton>
        </div>
        
            
          );
    }


    render(){
        return (
          <div className="generalPadding" >
              {this.renderWindow()}
          </div>
          );
    }

};


function mapStateToProps(state: any) {
  return({
  })
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(AddProblem);