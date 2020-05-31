import React from "react";
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import SendNotifications from '../../sector-responsible/messages_general/send_message/SendMessage'
import '../../sector-responsible/messages_general/MessageGeneralPage.css'
import {connect} from 'react-redux';

class SendMessage extends React.Component<any, any> {

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
                        <IonTitle>Bericht verzenden</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <SendNotifications/>
                </IonContent>
            </IonPage>
        )
    }
}

export default connect()(SendMessage);