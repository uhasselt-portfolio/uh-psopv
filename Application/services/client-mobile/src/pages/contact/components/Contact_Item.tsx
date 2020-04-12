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
    IonText, IonInput, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonContent, IonAvatar, IonIcon } from '@ionic/react';
import { Link, Redirect } from 'react-router-dom';
import { caretDown, call, mail } from 'ionicons/icons';

import PersonPage from '../../person/PersonPage'
  

class ContactItem  extends Component<any> {

    constructor(props: any){
        super(props)
    }


    render() {
        function getPost(props: any): string {
            return '/PersonPage/1'
        }
        
        return (    
            <IonItem  detail button href={getPost(this.props)}>
                <IonLabel>
                    <h1>{this.props.first_name} {this.props.last_name}</h1>
                    <p>{this.props.permissions}</p>
                </IonLabel>
                <IonLabel class="right_text">
                    <IonButton  href={"tel:" + this.props.phone_number}>
                        <IonIcon class="text_end" icon={call}/>
                    </IonButton >
                    <IonButton href={"mailto:" + this.props.email}>
                        <IonIcon class="text_end" icon={mail}/>
                    </IonButton>

                </IonLabel>
            </IonItem>
        );
    }
}
 
export default ContactItem;