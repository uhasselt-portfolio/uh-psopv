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

import GetPhoneNumber from "../../utils/GetPhoneNumber";

class LoginPage extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {phoneNumber: undefined};
    }

    componentDidMount(): void {
        if(this.state.phoneNumber == undefined) {
            GetPhoneNumber().then(phoneNumber => {
                this.setState({phoneNumber: phoneNumber})
            });
        }
    }

    checkIfUserExists(phoneNumber: string) {
        this.props.checkUserExists(phoneNumber);
    }


    render(): React.ReactNode {
        const doesUserExist = this.props.doesUserExist;

        if(doesUserExist === undefined) {

            if(this.state.phoneNumber != undefined) {
                this.checkIfUserExists(this.state.phoneNumber);
            }

            return(
                <IonPage>
                    <IonContent>
                        <IonHeader collapse="condense">
                            <IonToolbar>
                                <IonTitle size="large">Login</IonTitle>
                            </IonToolbar>
                        </IonHeader>
                        <IonList>
                            <IonItem>
                                <IonText>
                                    Gelieve de permissie te accepteren...
                                </IonText>
                            </IonItem>
                        </IonList>
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
                                    <IonTitle size="large">Login</IonTitle>
                                </IonToolbar>
                            </IonHeader>
                            <IonList>
                                <IonItem>
                                    <IonText>
                                        Het lijkt erop dat jouw telefoonnummer ({this.state.phoneNumber}) niet in onze lijst staat!
                                    </IonText>
                                </IonItem>
                            </IonList>
                        </IonContent>
                    </IonPage>
                );
            } else {
                return(
                    <LoginComponent phoneNumber={this.state.phoneNumber} user={this.props.doesUserExist} />
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
