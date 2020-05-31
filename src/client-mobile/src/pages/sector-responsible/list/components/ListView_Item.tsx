import * as React from 'react';
import { Component } from 'react';
import {IonItem, 
    IonLabel,} from '@ionic/react';

import WarningSign from "../../../images/warning_sign"
import '../ListPage.css'
import { withRouter } from 'react-router';

  

class ListViewItem  extends Component<any> {
    constructor(props: any) {
        super(props);
    }


    state = {
        color: this.props.color
    }

    renderProblemIcon(){
        {if(this.props.problem === true){
            return  <WarningSign />
        }}
    }

    render() {
        return (   
            <IonItem  detail button onClick={() => this.props.history.push( "/PostView/" + this.props.sector_id +"/" + this.props.post_id)}>
                <IonLabel>
                    <h2>Post {this.props.post_id}</h2>
                    <h4>{this.props.loc_description}</h4>
                    <h4>{this.props.loc_address}</h4>
                    <p>{this.props.post_description}</p>

                </IonLabel>
                <IonLabel class="right_text" >
                    <h2 ref="colorSector" style={{color:this.state.color}} >Sector {this.props.sector_id}</h2>
                    {this.renderProblemIcon()}
                </IonLabel>
            </IonItem>
        )
    }
}


  
  export default withRouter(ListViewItem);
  