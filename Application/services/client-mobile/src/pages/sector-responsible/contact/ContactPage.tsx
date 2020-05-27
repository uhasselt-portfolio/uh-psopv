import React, {Component} from 'react';
import ContactItem from './components/Contact_Item'
import {fetchContacts} from './ContactAction'

import {IonCard, IonCardHeader, IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


class Contacts extends Component<any> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchContacts();
    }

    renderList() {
        if (this.props.localStorage == undefined) {
            return <div> Loading ... </div>
        } else {
            return this.props.localStorage.contacts.map((data: any, index: number) => {
                return (
                    <ContactItem {...data}/>
                )
            })
        }
    }

    renderVrijwilligerList() {
        if (this.props.localStorage == undefined) {
            return <div> Loading ... </div>
        } else {
            return this.props.localStorage.my_volunteers.map((data: any, index: number) => {
                return (
                    <ContactItem {...data}/>
                )
            })
        }
    }


    render() {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Contacten</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>

                    {/*-- List of Post Items --*/}
                    <IonList>
                        <IonCard> <IonCardHeader>Mijn Collega's </IonCardHeader>
                            {this.renderList()}
                        </IonCard>
                        <IonCard> <IonCardHeader> Mijn vrijwilligers </IonCardHeader>
                            {this.renderVrijwilligerList()}
                        </IonCard>
                    </IonList>
                </IonContent>

            </IonPage>
        );
    }

};


function mapStateToProps(state: any) {
    return ({
        localStorage: state.contact.areUsersFetched,
    })
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
        fetchContacts
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
