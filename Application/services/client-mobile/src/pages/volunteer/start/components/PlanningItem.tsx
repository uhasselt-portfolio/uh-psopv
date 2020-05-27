import {IonItem} from "@ionic/react";
import React, {Component} from "react";

class PlanningItem extends Component<any, any> {

    constructor(props : any) {
        super(props);
    }

    render() {

        const planning : any = this.props.planning;

        return(
            <IonItem>
                {planning.shift.name}
            </IonItem>
        )
    }
}

export default PlanningItem