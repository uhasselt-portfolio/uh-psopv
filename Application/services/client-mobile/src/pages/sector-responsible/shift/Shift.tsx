import React from 'react';
import { Component } from 'react';

import { IonButton, 
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCard, IonIcon, IonSlide, IonRow, IonCol, IonGrid } from '@ionic/react';
import './Shift.css';
import { arrowBack, arrowForward, caretDown } from 'ionicons/icons';
import {formatDateTime} from '../../common_functions/date_formatter'  


  
class Shift  extends Component<any> {
    constructor(props: any) {
        super(props);
    }
    

    state = {
        checkListActive: false
    }




    showCheckList() {
        if(this.state.checkListActive){
        return(
            <IonCardContent>
                hey
            {/* {checkboxList.map(({ val, isChecked }, i) => (
            <IonItem key={i}>
                <IonLabel>{val}</IonLabel>
                <IonCheckbox slot="end" value={val} checked={isChecked} />
            </IonItem>
            ))}; */}
            </IonCardContent>
        )
        } else{
        return <div></div>
        }
    }

    handleToggleCheckList(){
        this.setState({...this.state, checkListActive: !this.state.checkListActive});
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

    renderProblemInfo(){
        return(
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>
                Problemen Log
                <IonIcon/>
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Michiel was 4 uur te laat op post
            </IonCardContent>
          </IonCard>
        )
    }

    render() {
        if(this.props.shift_data[0] !== undefined){
            let data = this.props.shift_data[0]
            return (
                <div>
                    {this.renderShiftInfo(data)}
                    {this.renderCheckbox()}
                    {this.renderProblemInfo()}
                </div>    
                ) 
        }   else {
            return <div></div>
        }     
    }  
    
}


  
  
  
export default Shift;

