import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCardHeader, IonList, IonCard, IonCheckbox, IonItem, IonLabel, IonItemDivider, IonCardTitle, IonCardContent, IonButton, IonIcon, IonRow, IonGrid, IonCol } from '@ionic/react';
import React, { Fragment, useState, Component, ReactNode, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { caretDown, call, mail } from 'ionicons/icons';
import { match } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchUser} from './PersonAction'
import './PersonPage.css'

class PersonPage extends Component<any>{
    constructor(props: any) {
        super(props);
      }
    
      componentDidMount(){
        this.props.fetchUser(this.props.match.params.id);

      }

    renderContactInfo(user: any){
      return(
        <IonCard>
          <IonCardHeader>
            <IonGrid>
              <IonRow>
                <IonCol>
                <IonCardTitle>
                    Contact
                </IonCardTitle>
                </IonCol>
              
                
              </IonRow>
              </IonGrid>
           
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
            
            <IonRow className="center_content">
                  <IonCol size="2.5">Naam:</IonCol>
                  <IonCol>{user.userInfo.first_name} {user.userInfo.last_name}</IonCol>
              </IonRow>
              <IonRow className="center_content">
                  <IonCol size="2.5">Tel:</IonCol>
                  <IonCol>{user.userInfo.phone_number}</IonCol>
                  
              </IonRow>
              <IonRow className="center_content">
                  <IonCol size="2.5">E-Mail:</IonCol>
                  <IonCol size="7">{user.userInfo.email}</IonCol>
                  <IonCol size="2">
                  <IonButton className="contact_btn" href={"mailto:" + user.userInfo.email}>
                    <IonIcon class="text_end" icon={mail}/>
                  </IonButton >
                </IonCol>
              </IonRow>
              <IonRow>
                      <IonCol size="2.5">Rol:</IonCol>
                      <IonCol size= "7">{user.userInfo.permission_type.name}</IonCol>
                      <IonCol size="2">
                        <IonButton className="contact_btn"  href={"tel:" + user.userInfo.phone_number}>
                        <IonIcon class="text_end" icon={call}/>
                        </IonButton >
                      </IonCol>
                      
                  </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      )
    }

    renderPukkelpopInfo(user: any){
      if(user.plannings.length > 0){
        return(
          <IonCard>
              <IonCardHeader>
                  <IonCardTitle>
                      Pukkelpop
                  </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonGrid>
                  <IonRow>
                      <IonCol size="3">Rol:</IonCol>
                      <IonCol>{user.userInfo.permission_type.name}</IonCol>
                  </IonRow>
                  <IonRow>
                      <IonCol size="3">Shift:</IonCol>
                      <IonCol>{}</IonCol>
                  </IonRow>
                  <IonRow>
                      <IonCol size="3">Sector:</IonCol>
                      <IonCol>todo...</IonCol>
                  </IonRow>
                  <IonRow>
                      <IonCol size="3">Post:</IonCol>
                      <IonCol>todo...</IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
              </IonCard>
        )
      }
      
    }
    renderProblemenInfo(user: any){
      return(
        <IonCard>
        <IonCardHeader>
            <IonCardTitle>
                Pukkelpop
            </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonGrid>
            <IonRow>
                <IonCol>probleem 1 todo...</IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
        </IonCard>
      )
    }     
    
    renderUserInfo(user: any){
        console.log(user);
        return (<IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Contact Info</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonHeader collapse="condense">
                <IonToolbar>
                    <IonTitle size="large">Blank</IonTitle>
                </IonToolbar>
                </IonHeader>

            {this.renderContactInfo(user)}
            {/* {this.renderPukkelpopInfo(user)}
            {this.renderProblemenInfo(user)} */}
            </IonContent>
        </IonPage>
        )
    }
    renderContact(){
        if(this.props.loading == true){
            return <div>Loading...</div>
          } else {
            if(this.props.isUserFetched !== undefined){
              if(this.props.isUserFetched.length <= 0){
                return <div> No info found. </div>
              } else{
                return this.renderUserInfo(this.props.isUserFetched)
              }
            }
          }
    }

    render(){
        return (
            <div>{this.renderContact()}</div>
        )
    }
  };


  function mapStateToProps(state: any) {
    return({
      isUserFetched: state.person.isUserFetched,
      errorMessage: state.person.errorMessage,
      loading: state.person.loading,
    })
  }
  
  function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
      fetchUser,
    }, dispatch);
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(PersonPage);
  