import * as React from 'react';
import {Component} from 'react';
import {IonButton, IonIcon, IonItem, IonLabel} from '@ionic/react';
import {call, mail} from 'ionicons/icons';
import {withRouter} from "react-router";

class ContactItem extends Component<any> {
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <IonItem detail button onClick={() => {
                this.props.history.push('/PersonPage/' + this.props.user_id)
            }}>
                <IonLabel>
                    <h1>{this.props.name}</h1>
                    <p>{this.props.function_type}</p>
                </IonLabel>
                <IonLabel class="right_text">
                    <IonButton href={"tel:" + this.props.phone_number}>
                        <IonIcon class="text_end" icon={call}/>
                    </IonButton>
                    <IonButton href={"mailto:" + this.props.email}>
                        <IonIcon class="text_end" icon={mail}/>
                    </IonButton>
                </IonLabel>
            </IonItem>
        );
    }
}

export default withRouter(ContactItem);