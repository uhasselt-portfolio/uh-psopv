import React, { Fragment, useState, Component} from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './ListView.css';
import NotificationItem from '../components/Notification_Item'
import {store} from '../redux/store';
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Dispatch, bindActionCreators } from "redux";


import { IonButton, 
  IonListHeader, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonList, 
  IonItem, 
  IonLabel,
  IonText, IonInput, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonContent, IonAvatar } from '@ionic/react';
import PostDataInterface from '../components/interfaces/PostDataInterface';
import { setNotificationStatus } from '../redux/actions';
import './Notifications.css';
import State from '../redux/state';


  // const users: notificationProps[] = [
  //   {from_person: "Admin", title: "Lorem", description: "Lorem Ipsum asdjf l;dkjfasd;flkj ", time:"10:00", read: false},
  //   {from_person: "Tom", title: "Taakje", description: "Kan sector veratnwoordelijke ...", time:"10:10", read: false},
  //   {from_person: "Sector Verantwoordelijke 5", title: "1Cookies", description: "Er zijn gratis koekjes en thee", time:"11:00", read: true}
  // ]
  


class Notifications extends Component<any> {
//   renderListItem(index: number) {
//     let data = this.props.notificationReducer.Messages[index]; // makes "this.props.." shorter, because it was a bit too long

//      if (data.read){
//          return (  
//              <IonItem className="ReadItem">
//                  <IonLabel>
//                      <h2> <b>{data.sender}:</b> {data.title}</h2>
//                      <p>{data.content}</p>
//                  </IonLabel>
//                  <IonLabel class="right_text">
//                      <h2>"data.time"</h2>
//                  </IonLabel>
//              </IonItem>
//          );
//      } else{
//          return(
//              <IonItem className="NotReadItem" onClick={() => this.handleRead(index)}>
//                  <IonLabel>
//                  <h2> <b>{data.sender}:</b> {data.title}</h2>
//                      <p>{data.content}</p>
//                  </IonLabel>
//                  <IonLabel class="right_text">
//                      <h2>"data.time"</h2>
//                  </IonLabel>
//              </IonItem>
//          )
//      }
//  }

  renderList(){
    
    return this.props.notificationReducer.Messages.map((message: any, index: number) =>{
      return (
      <NotificationItem {... message}/>
      )
    })
  }


  handleRead = (index: number) => {
    this.props.messageRead(this.props.notificationReducer.Messages[index]);
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
  console.log(state);
  return {notificationReducer: state.notificationReducer};
}

const MapDispatchToProps = (
  dispatch: Dispatch<any>,
): any => ({
    messageRead: bindActionCreators(setNotificationStatus, dispatch)
  }
);



export default connect(mapStateToProps, MapDispatchToProps)(Notifications);
