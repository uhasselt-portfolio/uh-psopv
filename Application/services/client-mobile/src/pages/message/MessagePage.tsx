import React, { Fragment, useState, Component} from 'react';
import ExploreContainer from '../../components/ExploreContainer';
import './MessagePage.css';
import NotificationItem from './component/Notification_Item'
import {store} from '../../redux/store';
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Dispatch, bindActionCreators } from "redux";
import {fetchMessages} from './MessageAction'


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
import PostDataInterface from '../../components/interfaces/PostDataInterface';
import { setNotificationStatus } from '../../redux/actions';
import State from '../../redux/state';



class Notifications extends Component<any> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount(){
    this.props.fetchMessages(1);
  }

  renderList(){
    console.log("this.props.areMessagesfetched", this.props);
    if(this.props.loading == true){
      return <div>Loading...</div>
    } else {
      if(this.props.areMessagesFetched !== undefined){
        console.log(this.props.areMessageFetched)
        if(this.props.areMessagesFetched.length <= 0){
          return <div> No messages found. </div>
        } else{
          return this.props.areMessagesFetched.map((data: any, index: number) =>{
            return (
              <IonItem className="ReadItem">
                      <IonLabel>
                          <h2> <b>{data.created_by}:</b> {data.title}</h2>
                          <p>{data.message}</p>
                      </IonLabel>
                      <IonLabel class="right_text">
                          <h2>{data.created_at}</h2>
                      </IonLabel>
                  </IonItem>
            // <NotificationItem {... message}/>
            )
          })
        }
      }
    }
  }


  handleRead = (index: number) => {
    // this.props.messageRead(this.props.notificationReducer.Messages[index]);
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

// const mapStateToProps = (state: any) => {
//   console.log(state);
//   return {notificationReducer: state.notificationReducer};
// }

// const MapDispatchToProps = (dispatch: Dispatch<any>,): any => ({
//     messageRead: bindActionCreators(setNotificationStatus, dispatch)
//   }
// );

// export default connect(mapStateToProps, MapDispatchToProps)(Notifications);

function mapStateToProps(state: any) {
  return({
    areMessagesFetched: state.message.areMessagesFetched,
    errorMessage: state.message.errorMessage,
    loading: state.message.loading
  })
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    setNotificationStatus,
    fetchMessages
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
// export default LoginPage;
