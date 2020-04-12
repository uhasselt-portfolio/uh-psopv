import * as React from 'react';
import { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
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


  
type UserProps = {
    sector: string,
    post: string,
    person: string,
    shift_start: string,
    shift_end: string,
    function: string,
    street: string
  };

class ListViewItem  extends Component<UserProps> {
    state = {
        person1: 'Wouter Grootjans',
        person2: 'Michiel Swaanen',
        shift_hour_start: '23:59',
        shift_hour_end: '10:00',
        street: 'Dorpsstraat 4, 3520 Zonhoven',
        sector: this.props.sector,
        post: '1'
    };

    constructor(props: any){
        super(props)
    }



    render() {
        function getPost(props: any): string {
            return '/PostView/'+ props.sector + '/' + props.post;
        }
        
        return (           
            <Link to={{pathname: getPost(this.props)}}> 
            <IonItem  detail button>
                <IonLabel>
                    <h2>Post {this.props.post}</h2>
                    <h3>{this.props.person}</h3>
                    <p>{this.props.shift_start} - {this.props.shift_end} </p>
                    <p>{this.props.street}</p>
                </IonLabel>
                <IonLabel class="right_text">
                    <h2>Sector {this.props.sector}</h2>
                </IonLabel>
            </IonItem>
            </Link>
        );
    }
}
 
export default ListViewItem;