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
                        <IonTitle color="primary">
                            Welkom {this.props.user.first_name}
                        </IonTitle>
                        <IonText class="ion-padding">
                            Gelieve u aan te melden!
                        </IonText>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
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