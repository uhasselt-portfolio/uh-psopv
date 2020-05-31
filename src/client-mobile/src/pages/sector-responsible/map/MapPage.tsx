import * as React from 'react';
import {Component} from 'react';
import {
    IonButton,
    IonContent,
    IonHeader,
    IonLoading,
    IonPage,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar
} from '@ionic/react';

import './MapPage.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchPosts} from '../list/ListAction'
import Map from './components/Map';
import {resetLocalStorage} from '../../save/saveFunction';
import {withRouter} from 'react-router';

const TIME_IN_MS = 2000;


class MapPage extends Component<any> {

    constructor(props: any) {
        super(props);

        let hideFooterTimeout = setTimeout(() => {
            this.setState({...this.state, loaded: true})
            this.props.fetchPosts();
        }, TIME_IN_MS);
    }

    state = {
        selected_sector: -1, //if -1 = selected all sectors
        data_posts: [],
        loaded: false
    }

    static defaultProps = {
        center: {
            lat: 50.9307,
            lng: 5.3325
        },
        zoom: 11
    };

    componentDidMount() {
        this.props.fetchPosts();
    }

    renderButtons() {
        return (
            <IonButton className="mapButton">
                <IonSelect
                    interface="popover"
                    value={this.state.selected_sector} placeholder={"Sector " + this.state.selected_sector}
                    onIonChange={e => this.handleSectorChange(e.detail.value)}>
                    {this.props.localStorage.posts_sectors.map((sector: any) => {
                        return <IonSelectOption value={sector.sector_id}>Sector {sector.sector_id}</IonSelectOption>
                    })}
                    <IonSelectOption value={-1}>Alle sectors</IonSelectOption>
                </IonSelect>
            </IonButton>
        )

    }

    handleSectorChange(sector: number) {
        let new_data
        if (sector !== -1) {
            new_data = this.props.localStorage.posts_data.filter((element: any) => {
                return element.sector_id === sector
            })
        } else {
            new_data = this.props.localStorage.posts_data
        }

        this.setState({...this.state, selected_sector: sector, data_posts: new_data});
    }

    renderPosts() {
        if (this.state.data_posts.length <= 0) {
            this.setState({...this.state, data_posts: this.props.localStorage.posts_data});
            return (
                <Map posts={this.props.localStorage.posts_data} sectors={this.props.localStorage.posts_sectors}
                     isMarkerClickable={true} containerId={"map"}
                     centerLat={50.962595} centerLong={5.358503} mapHeight={700}/>
            )
        } else {
            return (
                <Map posts={this.state.data_posts} sectors={this.props.localStorage.posts_sectors}
                     isMarkerClickable={true} containerId={"map"}
                     centerLat={50.962595} centerLong={5.358503} mapHeight={700}/>
            )
        }
    }

    showInfo() {
    }

    filterProblems = (problems: any[]): any[][] => {
        let filteredProblems: any[][] = [];
        for (let i = 0; i < problems.length; ++i) {
            let inside: boolean = false;
            for (let j = 0; j < filteredProblems.length; ++j) {
                if (problems[i].post_id == filteredProblems[j][0].post_id)
                    filteredProblems[j].push(problems[i]);
            }
            if (!inside)
                filteredProblems.push([problems[i]]);
        }
        return filteredProblems;
    }

    renderContent() {
        if (this.props.localStorage !== undefined) {
            if (this.props.localStorage.posts_data.length <= 0) {
                return <div> No Posts found. </div>
            } else {
                return (
                    <div className="GoogleMaps">
                        {this.renderButtons()}
                        {this.renderPosts()}
                    </div>
                )
            }
        } else {
        }
    }

    async logOut() {
        await resetLocalStorage();
        // location.reload();
        this.props.history.push( "/LoginPage")
    }

    render() {
        if (this.state.loaded) {
            return (
                <IonPage>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Kaart met posten <IonButton
                                onClick={() => this.logOut()}>Uitloggen</IonButton></IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        {this.renderContent()}
                    </IonContent>
                </IonPage>
            )
        } else {
            return (
                <IonLoading
                    cssClass='my-custom-class'
                    isOpen={!this.state.loaded}
                    onDidDismiss={() => this.setState({...this.state, loaded: true})}
                    message={'Initializeren...'}
                    duration={TIME_IN_MS}
                />
            )
        }

    }

};

function mapStateToProps(state: any) {
    return ({
        localStorage: state.list.localStorage,
        arePostsFetched: state.map.arePostsFetched,
        errorMessage: state.map.errorMessage,
        loading: state.map.loading
    })
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
        fetchPosts
    }, dispatch);
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MapPage));