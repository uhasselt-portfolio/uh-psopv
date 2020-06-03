import {IonButton, IonCol, IonGrid, IonItem, IonLabel, IonRow} from "@ionic/react";
import React, {Component} from "react";
import {formatDateTime} from "../../../../utils/DateUtil";

class PlanningItem extends Component<any, any> {

    constructor(props : any) {
        super(props);
    }

    render() {

        const planning : any = this.props.planning;
        console.log("planning", planning);
        return(
            <IonItem className="ion-margin-bottom">
                <IonLabel>
                    <IonGrid className="MessageBorder">
                        <IonRow>
                            <p><b>{planning.post.general_post.name}</b></p>
                        </IonRow>
                        <IonRow className="grey ion-padding-bottom">
                            <p>{planning.post.address}</p>
                        </IonRow>
                        <IonRow className="noPadding">
                            <p> Begint om {formatDateTime(planning.shift.begin)}</p>
                        </IonRow>
                        <IonRow className="ion-padding-bottom">
                            <p>Eindigt om {formatDateTime(planning.shift.end)}</p>
                        </IonRow>
                        <IonRow className="ion-padding-bottom">
                            <IonCol size="9" className="noPadding">
                                <p className="lightgrey"><b>Beschrijving</b> {planning.post.general_post.description} </p>
                            </IonCol>
                        </IonRow>
                        <IonRow className={this.props.button != null ? "" : "ion-hide"} onClick={this.props.action}>
                            <IonButton color="primary" >
                                Start Shift
                            </IonButton>
                        </IonRow>
                    </IonGrid>
                </IonLabel>
            </IonItem>
        )
    }
}

export default PlanningItem