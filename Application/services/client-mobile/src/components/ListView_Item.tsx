import * as React from 'react';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
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


 type UserProps = {
     post: string,
     person: string
};

class ListViewItem  extends Component<UserProps> {
    state = {
        person1: 'Wouter Grootjans',
        person2: 'Michiel Swaanen',
        shift_hour_start: '23:59',
        shift_hour_end: '10:00',
        street: 'Dorpsstraat 4, 3520 Zonhoven',
        sector: 1,
        post: 1
    };


    constructor(props: any){
        super(props)
    }

    // increaseIncrement = (product: number) => {
    //     console.log(product)
    //     this.setState({count: this.state.count + 1})
    // }

    // doIncreaseIncrement = () => {
    //     this.increaseIncrement(1);
    // }


    render() { 
        return (
            <IonItem  detail button href="/PostView">
                <IonLabel>
                    <h2>Post {this.props.post}</h2>
                    <h3>{this.props.person}</h3>
                    <p>{this.state.shift_hour_start} - {this.state.shift_hour_end} </p>
                    <p>{this.state.street}</p>
                </IonLabel>
                <IonLabel class="right_text">
                    <h2>Sector {this.state.sector}</h2>
                </IonLabel>
            </IonItem>
        );
    }
}
 
export default ListViewItem;