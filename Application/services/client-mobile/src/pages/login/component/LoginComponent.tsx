import {
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonText,
    IonTitle,
    IonToolbar,
    IonRow
} from "@ionic/react";
import React from "react";
import {bindActionCreators} from "redux";
import {loginUser} from "../LoginAction";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import Auth from "../../../utils/Auth";

interface IState {
    email?: string;
    password?: string;
}

class LoginComponent extends React.Component<any, IState> {


    constructor(props: any) {
        super(props);
        this.state = {password: ""}
    }

    handleFormSubmit(event: any) : void {
        event.preventDefault();
        this.props.loginUser(this.props.user.email, this.state.password)
    }

    showLoginComponent() : React.ReactNode {
        return(
            <IonList>
                <IonItem>
                    <IonLabel position="stacked">Telefoonnummer
                        <IonText color="primary"> (Automatisch)</IonText>
                    </IonLabel>
                    <IonInput
                        value={this.props.phoneNumber}
                        type="text"
                        readonly={true}
                    />
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Wachtwoord
                        <IonText color="danger"> {this.props.errorMessage}</IonText>
                    </IonLabel>
                    <IonInput
                        required
                        value={this.state.password}
                        onIonChange={(e) => this.setState({password: (e.target as HTMLInputElement).value})}
                        type="password"
                        placeholder="Geef je wachtwoord in" />
                </IonItem>

                <IonRow class="ion-padding">
                    <IonButton size="default" onClick={this.handleFormSubmit.bind(this)}>
                        {this.props.process ? ' Aanmelden...' : 'Aanmelden'}
                    </IonButton>
                </IonRow>
            </IonList>
        )
    }


    render(): React.ReactNode {

        const isUserLoggedIn = this.props.isUserLoggedIn;

        if (isUserLoggedIn) {
            return(
                <div>
                    Loading...
                </div>
            )
        } else {
            return this.showLoginComponent();
        }
    }
}

function mapStateToProps(state: any) {
    return({
        isUserLoggedIn: state.login.isUserLoggedIn,
        process: state.login.process,
        errorMessage: state.login.errorMessage
    })
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
        loginUser
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
