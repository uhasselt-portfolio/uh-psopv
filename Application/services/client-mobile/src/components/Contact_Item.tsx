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
import { Link } from 'react-router-dom';
import './Notification_Item.css';
import { read } from 'fs';


  
type notificationProps = {
    from_person: string,
    title: string,
    description: string,
    time: string,
    read: boolean,
  };

class NotificationItem  extends Component<notificationProps> {
    

    constructor(props: any){
        super(props)
    }


    render() {
            return (            
                <IonItem className="ReadItem">
                    <IonLabel>
                        <h2> <b>{this.state.from_person}:</b> {this.state.title}</h2>
                        <p>{this.state.description}</p>
                    </IonLabel>
                    <IonLabel class="right_text">
                        <h2>{this.state.time}</h2>
                    </IonLabel>
                </IonItem>
            );
        
        
    }
}
 
export default NotificationItem;