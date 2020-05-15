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
    IonToolbar
} from "@ionic/react";
import React from "react";
import {bindActionCreators} from "redux";
import {loginUser} from "../LoginAction";
import {connect} from "react-redux";
import {Redirect} from "react-router";

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

    onSuccessfulLogin() : React.ReactNode {
        const typeOfUser = this.props.isUserLoggedIn.user.permission_type_id;

        switch (parseInt(typeOfUser)) {
            case 1: // Vrijwilliger
                return <Redirect to={"InfoPage"} />
            case 2: // Sector verantwoordelijke
                return <Redirect to={"MapPage"} />
            case 3:
            // TODO: What when an admin user logs into the mobile app?
        }
    }

    showLoginComponent() : React.ReactNode {
        return(
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>
                            Welkom {this.props.user.first_name}
                        </IonTitle>
                        <IonText>
                            Gelieve de uw wachtwoord in te geven.
                        </IonText>
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
                            <IonLabel position="stacked">Status:
                                <IonText color={this.props.isUserLoggedIn ? 'success' : 'secondary'}>
                                    {this.props.isUserLoggedIn ? ' Aangemeld!' : ''}
                                    {this.props.process ? ' Aanmelden...' : ''}
                                </IonText>
                            </IonLabel>
                            <IonLabel position="stacked">
                                <IonText color="danger">{this.props.errorMessage}</IonText>
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="stacked">Wachtwoord
                                <IonText color="danger">*</IonText>
                            </IonLabel>
                            <IonInput
                                required
                                value={this.state.password}
                                onIonChange={(e) => this.setState({password: (e.target as HTMLInputElement).value})}
                                type="password"
                                placeholder="Geef je wachtwoord in" />
                        </IonItem>
                        <IonItem>
                            <IonButton size="default" onClick={this.handleFormSubmit.bind(this)}>
                                Aanmelden
                            </IonButton>
                        </IonItem>
                    </IonList>
                </IonContent>
            </IonPage>
        )
    }


    render(): React.ReactNode {

        const isUserLoggedIn = this.props.isUserLoggedIn;

        if (isUserLoggedIn) {
            return this.onSuccessfulLogin();
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
