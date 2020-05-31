import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar,
    withIonLifeCycle
} from '@ionic/react';
import React, {Component} from 'react';
import {call, mail} from 'ionicons/icons';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUserById} from './PersonAction'
import './PersonPage.css'
import {withRouter} from "react-router";

class PersonPage extends Component<any> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchUserById(this.props.match.params.id);

    }

    renderContactInfo(user: any) {
        console.log(user)
        return (
            <IonCard>
                <IonCardHeader>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonCardTitle>
                                    Contact
                                </IonCardTitle>
                            </IonCol>


                        </IonRow>
                    </IonGrid>

                </IonCardHeader>
                <IonCardContent>
                    <IonGrid>

                        <IonRow className="center_content">
                            <IonCol size="2.5">Naam:</IonCol>
                            <IonCol>{user.name}</IonCol>
                        </IonRow>
                        <IonRow className="center_content">
                            <IonCol size="2.5">Tel:</IonCol>
                            <IonCol>{user.phone_number}</IonCol>

                        </IonRow>
                        <IonRow className="center_content">
                            <IonCol size="2.5">E-Mail:</IonCol>
                            <IonCol size="7">{user.email}</IonCol>
                            <IonCol size="2">
                                <IonButton className="contact_btn" href={"mailto:" + user.email}>
                                    <IonIcon class="text_end" icon={mail}/>
                                </IonButton>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="2.5">Rol:</IonCol>
                            <IonCol size="7">{user.function_type}</IonCol>
                            <IonCol size="2">
                                <IonButton className="contact_btn" href={"tel:" + user.phone_number}>
                                    <IonIcon class="text_end" icon={call}/>
                                </IonButton>
                            </IonCol>

                        </IonRow>
                    </IonGrid>
                </IonCardContent>
            </IonCard>
        )
    }

    renderUserInfo(user: any) {
        return (<IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Contact Info</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    {this.renderContactInfo(user)}
                    {/* {this.renderPukkelpopInfo(user)}
            {this.renderProblemenInfo(user)} */}
                </IonContent>
            </IonPage>
        )
    }

    renderContact() {
        if (this.props.loading === true) {
            return <IonPage>Loading...</IonPage>
        } else {
            if (this.props.isUserFetched !== undefined) {
                if (this.props.isUserFetched.length <= 0) {
                    return <IonPage> No info found. </IonPage>
                } else {
                    return this.renderUserInfo(this.props.isUserFetched)
                }
            }
        }
    }

    render() {
        return (
            <div>{this.renderContact()}</div>
        )
    }

    ionViewDidEnter() {
        console.log('ionViewDidEnter event fired')
      }
};


function mapStateToProps(state: any) {
    return ({
        isUserFetched: state.person.isUserFetched,
    })
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
        fetchUserById,
    }, dispatch);
}


export default withIonLifeCycle(withRouter(connect(mapStateToProps, mapDispatchToProps)(PersonPage)));
  