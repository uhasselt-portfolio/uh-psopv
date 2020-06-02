import {IonButton, IonCol, IonGrid, IonItem, IonLabel, IonRow} from "@ionic/react";
import React, {Component} from "react";
import {formatDateTime} from "../../../../utils/DateUtil";

class FuturePlanningItem extends Component<any, any> {

    constructor(props : any) {
        super(props);
    }

    render() {

        const planning : any = this.props.planning;
        return(
            <IonItem className="ion-margin-bottom">
                <IonLabel>
                    <IonGrid>
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
                    </IonGrid>
                </IonLabel>
            </IonItem>
        )
    }
}

export default FuturePlanningItem