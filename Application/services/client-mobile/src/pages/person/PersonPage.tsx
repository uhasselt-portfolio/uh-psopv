import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCardHeader, IonList, IonCard, IonCheckbox, IonItem, IonLabel, IonItemDivider, IonCardTitle, IonCardContent, IonButton, IonIcon, IonRow, IonGrid, IonCol } from '@ionic/react';
import React, { Fragment, useState, Component, ReactNode, useEffect } from 'react';
import ExploreContainer from '../../components/ExploreContainer';
import { RouteComponentProps } from 'react-router';
import Shift from '../../components/Shift';
import { caretDown } from 'ionicons/icons';
import { match } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchUsers} from '../contact/ContactAction'

class PersonPage extends Component<any>{
    constructor(props: any) {
        super(props);
      }
    
      componentDidMount(){
        this.props.fetchUsers();
      }
    
    renderUserInfo(user: any){
        console.log(user);
        return (<IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{user.first_name} {user.last_name}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonHeader collapse="condense">
                <IonToolbar>
                    <IonTitle size="large">Blank</IonTitle>
                </IonToolbar>
                </IonHeader>

        
                <IonCard>
                <IonCardHeader>
                    <IonCardTitle>
                        Rol
                    </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                        <IonCol size="3">Rol:</IonCol>
                        <IonCol>{user.permissions}</IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="3">Tel:</IonCol>
                        <IonCol>{user.phone_number}</IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="3">E-Mail:</IonCol>
                        <IonCol>{user.email}</IonCol>
                    </IonRow>
                  </IonGrid>
                    
                </IonCardContent>
                
                </IonCard>
            </IonContent>
        </IonPage>
        )
    }
    renderContact(user_id: number){
        if(this.props.loading == true){
            return <div>Loading...</div>
          } else {
            if(this.props.areUsersFetched !== undefined){
              console.log(this.props.areMessageFetched)
              if(this.props.areUsersFetched.length <= 0){
                return <div> No messages found. </div>
              } else{
                let user = this.props.areUsersFetched.find((user: any) => user.id == user_id)
                return this.renderUserInfo(user)
              }
            }
          }
    }

    render(){
        console.log(this.props.match.params.id)
        let user_id = this.props.match.params.id

        return (
            <div>{this.renderContact(user_id)}</div>
        )
    }
  };


  function mapStateToProps(state: any) {
    return({
      areUsersFetched: state.contact.areUsersFetched,
      errorMessage: state.contact.errorMessage,
      loading: state.contact.loading
    })
  }
  
  function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
      fetchUsers
    }, dispatch);
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(PersonPage);
  