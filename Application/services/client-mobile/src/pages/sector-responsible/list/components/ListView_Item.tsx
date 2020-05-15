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
import '../ListPage.css'

  

class ListViewItem  extends Component<any> {
    constructor(props: any) {
        super(props);
    }

    state = {
        colors: ["colorRed", "colorBlue", "colorGreen", "colorOrange"]

    }
    
    getPost(): string {
        return '/PostView/'+ this.props.sector_id + '/' + this.props.post_id;
    }

    renderProblemIcon(){
        {if(this.props.problem === true){
            return  <WarningSign />
        }}
    }
        

    render() {
        let color = this.state.colors[this.props.sector_id - 1]
        return (   
            <a href={this.getPost()} > 
            <IonItem  detail button>
                <IonLabel>
                    <h2>Post {this.props.post_id}</h2>
                    <h4>{this.props.loc_description}</h4>
                    <h4>{this.props.loc_address}</h4>
                    <p>{this.props.post_description}</p>

                </IonLabel>
                <IonLabel class="right_text" >
                    <h2 className={color}>Sector {this.props.sector_id}</h2>
                    {this.renderProblemIcon()}
                </IonLabel>
            </IonItem>
            </a>
        );
    }
}
 
  
  export default (ListViewItem);
  