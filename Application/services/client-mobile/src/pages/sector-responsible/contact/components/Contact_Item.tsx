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
        console.log(this.props)
        
        function getPerson(props: any): string {
            return '/PersonPage/'+props.user_id
        }
        
        return (    
            <IonItem  detail button href={getPerson(this.props)}>
                <IonLabel>
                    <h1>{this.props.name}</h1>
                    <p>{this.props.function_type}</p>
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