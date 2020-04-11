import React from "react";
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonButton, IonInput, IonLabel, IonText} from "@ionic/react";

interface IProps {

}

interface IState {
    email?: string;
    password?: string;
}

class Login extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {email: "", password: ""}
    }

    handleFormSubmit(event: any) : void {
        event.preventDefault();
        console.log(this.state);
    }

    render(): React.ReactNode {
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

export default Login;