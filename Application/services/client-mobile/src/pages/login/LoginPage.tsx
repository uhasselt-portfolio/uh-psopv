import React from "react";
import {checkUserExists} from './LoginAction';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import LoginComponent from "./component/LoginComponent";
import {
    IonContent,
    IonHeader,
    IonItem,
    IonList, IonPage,
    IonText,
    IonTitle,
    IonToolbar
} from "@ionic/react";
class LoginPage extends React.Component<any, any> {

    render(): React.ReactNode {

        const doesUserExist = this.props.doesUserExist;

        if(doesUserExist == undefined) {
            // TODO Implement sim reader
            const phoneNumber = "0495812455";
            this.props.checkUserExists(phoneNumber);

            return(
                <IonPage>
                    <IonContent>
                        <IonHeader collapse="condense">
                            <IonToolbar>
                                <IonTitle size="large">Laden...</IonTitle>
                            </IonToolbar>
                        </IonHeader>
                    </IonContent>
                </IonPage>
            )
        } else {
            if(!doesUserExist) {
                return(
                    <IonPage>
                        <IonHeader>
                            <IonToolbar>
                                <IonTitle>
                                    We kennen jouw niet?
                                </IonTitle>
                            </IonToolbar>
                        </IonHeader>
                        <IonContent>
                            <IonHeader collapse="condense">
                                <IonToolbar>
                                    <IonTitle size="large">We kennen jouw niet?</IonTitle>
                                </IonToolbar>
                            </IonHeader>
                            <IonList>
                                <IonItem>
                                    <IonText>
                                        Uw telefoonnummer staat niet tussen onze lijst!
                                    </IonText>
                                </IonItem>
                            </IonList>
                        </IonContent>
                    </IonPage>
                );
            } else {
                return(
                    <LoginComponent user={this.props.doesUserExist} />
                )
            }
        }
    }
}

function mapStateToProps(state: any) {
    return({
        doesUserExist: state.login.doesUserExist,
        process: state.login.process,
        errorMessage: state.login.errorMessage
    })
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
        checkUserExists
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
