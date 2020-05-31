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
    IonToolbar,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption
} from "@ionic/react";

import GetPhoneNumber from "../../utils/GetPhoneNumber";

class LoginPage extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {phoneNumber: "0483209571"};
    }

    componentDidMount(): void {
        this.props.checkUserExists(this.state.phoneNumber);
    }

   

    checkIfUserExists(phoneNumber: string) {
        this.props.checkUserExists(phoneNumber);
    }

    renderFirstoption(): React.ReactNode{
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
                                    We kennen jou niet?
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

    setPhoneNumber(phone: string): void{
        this.setState({phoneNumber: phone})
        this.props.checkUserExists(phone);
    }

    RenderDropdown(){
        return(             
            <IonItem>
            <IonLabel>Selecteer een test profiel:</IonLabel>
            <IonSelect value={this.state.phoneNumber} placeholder="Select One" onIonChange={e => this.setPhoneNumber(e.detail.value)}>
              <IonSelectOption value="0483209571">Sector-verantwoordelijke</IonSelectOption>
              <IonSelectOption value="0495812456">Vrijwilliger</IonSelectOption>
            </IonSelect>
            </IonItem>
        )
            
    }

    render(): React.ReactNode {
        let login = <div></div>;
        if(this.state.phoneNumber != undefined && this.props.doesUserExist != undefined){
            login = <LoginComponent phoneNumber={this.state.phoneNumber} user={this.props.doesUserExist} />
        }
        console.log(this.state.phoneNumber, this.props)
        return(
        <IonPage>
                <IonContent>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">Login</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonList>
                    {this.RenderDropdown()}
                    {login}
                    <IonItem>wachtwoord: 12345</IonItem>
                    </IonList>
                </IonContent>
        </IonPage>
        )
        
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
