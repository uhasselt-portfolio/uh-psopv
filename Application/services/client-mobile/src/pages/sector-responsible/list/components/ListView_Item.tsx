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
import { call } from 'ionicons/icons';

import WarningSign from "../../../images/warning_sign"

  

class ListViewItem  extends Component<any> {
    constructor(props: any) {
        super(props);
    }
    
    getPost(props: any): string {
        return '/PostView/'+ props.sector + '/' + props.post;
    }

    renderProblemIcon(){
        {if(this.props.problem === true){
            return  <WarningSign />
        }}
    }
        

    render() {
        function getPost(props: any): string {
            return '/PostView/'+props.id+"/"+props.sector_id
        }

        return (   
            <a href={getPost(this.props)}> 
            <IonItem  detail button>
                <IonLabel>
                    <h2>Post {this.props.id}</h2>
                    <h3>{this.props.title}</h3>
                    <p>{this.props.address}</p>
                </IonLabel>
                <IonLabel class="right_text">
                    <h2>Sector {this.props.sector_id}</h2>
                    {this.renderProblemIcon()}
                </IonLabel>
            </IonItem>
            </a>
        );
    }
}
 
  
  export default (ListViewItem);
  