import React from "react";
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonButton, IonInput, IonLabel, IonText} from "@ionic/react";
import {loginUser} from './LoginAction';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

interface IState {
    email?: string;
    password?: string;
}

class LoginPage extends React.Component<any, IState> {

    constructor(props: any) {
        super(props);
        this.state = {email: "", password: ""}
    }

    handleFormSubmit(event: any) : void {
        event.preventDefault();
        this.props.loginUser(this.state.email, this.state.password)
    }

    render(): React.ReactNode {
        console.log(this.props)
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>
                            Login
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
                            <IonLabel position="stacked">E-mail
                                <IonText color="danger">*</IonText>
                            </IonLabel>
                            <IonInput
                                required
                                value={this.state.email}
                                onIonChange={(e) => this.setState({email: (e.target as HTMLInputElement).value})}
                                type="email"
                                placeholder="Geef je e-mail in..." />
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
// export default LoginPage;