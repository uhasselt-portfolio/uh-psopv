import React, { Fragment, useState, Component } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './ListView.css';
import NotificationItem from '../components/Notification_Item'
import {store} from '../redux/store';
import { connect } from "react-redux";

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
import NotificationDataInterface from '../components/interfaces/NotificationDataInterface';
import PostDataInterface from '../components/interfaces/PostDataInterface';


  // const users: notificationProps[] = [
  //   {from_person: "Admin", title: "Lorem", description: "Lorem Ipsum asdjf l;dkjfasd;flkj ", time:"10:00", read: false},
  //   {from_person: "Tom", title: "Taakje", description: "Kan sector veratnwoordelijke ...", time:"10:10", read: false},
  //   {from_person: "Sector Verantwoordelijke 5", title: "1Cookies", description: "Er zijn gratis koekjes en thee", time:"11:00", read: true}
  // ]
  


class Notifications extends Component<any> {
    // constructor(props: any) {
    //   super(props);
    // }

    renderList(){
      return this.props.notificationData.map((notification: any, index: number) =>{
        return (
        <div>
        <NotificationItem index={index}/></div>
        )
      })

    }


  render(){
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Notifications</IonTitle>
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

const mapStateToProps = (state: any) => {
  return {notificationData: state.notificationData};
}


export default connect(mapStateToProps)(Notifications);
