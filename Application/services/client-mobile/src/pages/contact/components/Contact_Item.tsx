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
    IonText, IonInput, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonContent, IonAvatar, IonIcon } from '@ionic/react';
import { Link } from 'react-router-dom';
import { caretDown, call, mail } from 'ionicons/icons';


  

class ContactItem  extends Component<any> {

    constructor(props: any){
        super(props)
    }


    render() {
        function getPost(props: any): string {
            return '/PostView/'+ props.id;
        }
        
        return (     
            <Link to={{pathname: getPost(this.props)}}>  
            <IonItem  detail button>
                <IonLabel>
                    <h1>{this.props.first_name} {this.props.last_name}</h1>
                    <p>{this.props.permissions}</p>
                </IonLabel>
                <IonLabel class="right_text">
                    <IonButton>
                        <IonIcon class="text_end" icon={call}/>
                    </IonButton>
                    <IonButton>
                        <IonIcon class="text_end" icon={mail}/>
                    </IonButton>

                </IonLabel>
            </IonItem>
            </Link> 
        );
    }
}
 
export default ContactItem;