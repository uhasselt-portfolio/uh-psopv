import * as React from 'react';
import { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
import {bindActionCreators, Dispatch} from "redux";

import { IonButton, 
    IonListHeader, 
    IonHeader, 
    IonPage, 
    IonTitle, 
    IonToolbar, 
    IonList, 
    IonItem, 
    IonLabel,
    IonText, IonInput, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonContent, IonAvatar, IonGrid, IonRow, IonCol } from '@ionic/react';
import { Link } from 'react-router-dom';
import './Notification_Item.css';
import { connect } from "react-redux";
import {MessageToggle} from '../ProblemsAction'
import {formatDateTime} from '../../../../../utils/DateUtil'


class ProblemItem extends Component<any> {
    constructor(props: any){
        super(props)
    }

    handleOnMenuItemClicked = (data: any) => {
        this.props.MessageToggle(data.id);
    }

    // setStateClicked(clicked: boolean){
    //     if(clicked === true && this.state.seen === false){
    //         this.setState({...this.state, seen: clicked});
    //     }
    // }

    

    renderMessage(){
        return(
            <IonLabel>
                <IonGrid className="MessageBorder">
                    <IonRow className="noPadding">
                        <IonCol size="9" className="noPadding">
                            <p><b>{this.props.created_by}</b> ({this.props.created_by_permission_type}) </p>
                        </IonCol>
                        <IonCol size="3" className="noPadding">
                            <p className="right_text">{formatDateTime(this.props.created_at)}</p>
                        </IonCol>
                    </IonRow>
                    <IonRow className="noPadding">
                        <IonCol size="9" className="noPadding">
                        <p className="grey">{this.props.title}: {this.props.message} </p>
                        </IonCol>
                        <IonCol size="3">
                            <IonButton href={this.getPost()}>Ga naar</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonLabel>
        )
    }

    renderProblem(){
        return(
            <IonLabel>
                <IonGrid className="ProblemBorder">
                    <IonRow className="noPadding">
                        <IonCol size="9" className="noPadding">
                            <p><b>{this.props.created_by}</b> ({this.props.created_by_permission_type}) </p>
                        </IonCol>
                        <IonCol size="3" className="noPadding">
                            <p className="right_text">{formatDateTime(this.props.created_at)}</p>
                        </IonCol>
                    </IonRow>
                    <IonRow className="noPadding">
                        <IonCol size="9" className="noPadding">
                            <p className="grey">{this.props.title}: {this.props.message} </p>
                        </IonCol>
                        <IonCol size="3">
                            <IonButton href={this.getPost()}>Ga naar</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonLabel>
        )
    }
        
    getPost(): string {
        return '/PostView/'+ this.props.sector_id + '/' + this.props.post_id;
    }

    render(){        
        let data = this.props
        if (this.props.created_by_permission_type == "Vrijwilliger"){
            if(this.props.solved){
                return (
                    <IonItem className="ReadItem">
                        {this.renderMessage()}
                    </IonItem>
                );
            } else{
                return(
                    <IonItem className="NotReadItem" onClick={() => this.handleOnMenuItemClicked(data)}>
                        {this.renderMessage()}
                    </IonItem>
                )
            }
        } else{
            if(this.props.solved){
                return (
                    <IonItem className="ReadItem" onClick={() => this.handleOnMenuItemClicked(this.props)}>
                        {this.renderProblem()}
                    </IonItem>
                );
            } else{
                return(
                    <IonItem className="NotReadItem" onClick={() => this.handleOnMenuItemClicked(data)}>
                        {this.renderProblem()}
                    </IonItem>
                )
            }
        }
    }
}

function mapStateToProps(state: any) {
    return({
        toggleMessage: state.message.toggleMessage,
        errorMessage: state.message.errorMessage,
        loading: state.message.loading
    })
  }
  
  function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
      MessageToggle
    }, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ProblemItem);
  

  

  
  
  
