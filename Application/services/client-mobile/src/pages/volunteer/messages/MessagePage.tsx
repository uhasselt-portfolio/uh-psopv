import React from "react";
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import Notifications from '../../sector-responsible/messages_general/message/MessagePage'
import '../../sector-responsible/messages_general/MessageGeneralPage.css'
import {connect} from 'react-redux';

class Message extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    state = {
        selected: 0,
        amount_msg: 0,
        amount_problems: 0
    }



    render() {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Berichten</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <Notifications/>
                </IonContent>
            </IonPage>
        )
    }
}

export default connect()(Message);