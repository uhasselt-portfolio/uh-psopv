import React, { Fragment, useState, Component } from 'react';
import ContactItem from './components/Contact_Item'
import {fetchUsers} from './ContactAction'

import { IonButton, 
  IonListHeader, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonList, 
  IonItem, 
  IonLabel,
  IonText,
  IonSelect,
  IonSelectOption,
  IonRow,
  IonInput, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonContent, IonAvatar, IonGrid, IonCol } from '@ionic/react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class Contacts extends Component<any> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount(){
    this.props.fetchUsers();
  }

  renderList(){
    if(this.props.loading == true){
      return <div>Loading...</div>
    } else {
      if(this.props.areUsersFetched !== undefined){
        if(this.props.areUsersFetched.length <= 0){
          return <div> No contacts found. </div>
        } else{
          {console.log(this.props)}
          return this.props.areUsersFetched.map((data: any, index: number) =>{
            return (
            <ContactItem {... data}/>
            )
          })
        }
      }
    }
  }


  render(){
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Contacts</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Blank</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
  
      {/*-- List of Post Items --*/}
      <IonList>
        {this.renderList()}
      </IonList>
    </IonContent>
          
        </IonContent>
      </IonPage>
    );
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


export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
