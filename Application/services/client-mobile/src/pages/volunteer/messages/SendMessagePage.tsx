import React from "react";
import {
    IonBadge,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonPage,
    IonRow,
    IonSlide,
    IonSlides,
    IonTabButton,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {
    notifications,
    notificationsOutline,
    paperPlane,
    paperPlaneOutline,
    warning,
    warningOutline
} from "ionicons/icons";
import SendNotifications from '../../sector-responsible/messages_general/send_message/SendMessage'
import '../../sector-responsible/messages_general/MessageGeneralPage.css'
import {getListLocalStorage} from "../../save/saveFunction";
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