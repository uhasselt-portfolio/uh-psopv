import * as React from 'react';
import { Component } from 'react';
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
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchPlannings} from '../ListAction'


  

class ListViewItem  extends Component<any> {
    constructor(props: any) {
        super(props);
    }
    
    // componentDidMount(){
    //     this.props.fetchPlannings();
    // }

    getPost(props: any): string {
        return '/PostView/'+ props.sector + '/' + props.post;
    }
        

    render() {

        function getPost(props: any): string {
            console.log(props)
            return '/PostView/'+props.post_id+"/"+props.shift_id
        }

        console.log(this.props)
        return (   
            <a href={getPost(this.props)}> 
            <IonItem  detail button>
                <IonLabel>
                    <h2>Post {this.props.post_id}</h2>
                    <h3>{this.props.user.first_name}</h3>
                    <p>{this.props.shift.start} - {this.props.shift.end} </p>
                    <p>{this.props.post.address}</p>
                </IonLabel>
                <IonLabel class="right_text">
                    {/* <h2>Sector {this.props.sector}</h2> */}
                </IonLabel>
            </IonItem>
            </a>
        );
    }
}
 
// function mapStateToProps(state: any) {
//     return({
//       arePlanningsFetched: state.list.arePlanningsFetched,
//       errorMessage: state.list.errorMessage,
//       loading: state.list.loading
//     })
//   }
  
//   function mapDispatchToProps(dispatch: any) {
//     return bindActionCreators({
//       fetchPlannings
//     }, dispatch);
//   }
  
  
  export default (ListViewItem);
  