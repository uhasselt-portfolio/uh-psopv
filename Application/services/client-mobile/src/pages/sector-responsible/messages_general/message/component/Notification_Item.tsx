import * as React from 'react';
import { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
import {bindActionCreators} from "redux";

import { 
    IonItem, 
    IonLabel,
    IonGrid, IonRow, IonCol } from '@ionic/react';
import './Notification_Item.css';
import { connect } from "react-redux";
import {MessageToggle} from '../MessageAction'
import {formatDateTime} from '../../../../../utils/DateUtil'


class NotificationItem extends Component<any> {
    constructor(props: any){
        super(props)
    }

    state = {
        seen: this.props.solved
    }

    handleOnMenuItemClicked = (data: any) => {
        if(this.state.seen === false){
            this.props.MessageToggle(data.id);
            this.setState({...this.state, seen: !this.state.seen});
            this.props.sendData()
        }
    }

    

    renderMessage(title: string, message: string){
        return(
            <IonLabel>
                <IonGrid className="MessageBorder">
                    <IonRow className="noPadding">
                        <IonCol size="8" className="noPadding">
                            <p><b>{this.props.created_by}</b> ({this.props.created_by_permission_type}) </p>
                        </IonCol>
                        <IonCol size="3" className="noPadding">
                            <p className="right_text">{formatDateTime(this.props.created_at)}</p>
                        </IonCol>
                    </IonRow>
                    <IonRow className="noPadding">
                        <IonCol className="noPadding">
                        <p className="grey">{title}: {message} </p>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonLabel>
        )
    }

    renderProblem(title: string, message: string){
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
                        <IonCol className="noPadding">
                        <p className="grey">{title}: {message}</p>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonLabel>
        )
    }
        

    render(){   
        let title;
        if(this.props.title == ""){
            title = "Geen titel"
        } else{
            title=this.props.title
        }

        let message;
        if(this.props.message == ""){
            message = "Geen beschrijving"
        } else{
            message=this.props.message
        }

        let data = this.props
        if (this.props.created_by_permission_type == "Vrijwilliger"){
            if(this.state.seen){
                return (
                    <div>
                    <IonItem className="ReadItem" onClick={() => this.handleOnMenuItemClicked(this.props)}>
                        {this.renderMessage(title, message)}
                    </IonItem>
                    </div>  
                );
            } else{
                return(
                    <IonItem className="NotReadItem" onClick={() => this.handleOnMenuItemClicked(data)}>
                        {this.renderMessage(title, message)}
                    </IonItem>
                )
            }
        } else{
            if(this.state.seen){
                return (
                    <div>
                    <IonItem className="ReadItem" onClick={() => this.handleOnMenuItemClicked(this.props)}>
                        {this.renderProblem(title, message)}
                    </IonItem>
                    </div>  
                );
            } else{
                return(
                    <IonItem className="NotReadItem" onClick={() => this.handleOnMenuItemClicked(data)}>
                        {this.renderProblem(title, message)}
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(NotificationItem);
  

  

  
  
  
