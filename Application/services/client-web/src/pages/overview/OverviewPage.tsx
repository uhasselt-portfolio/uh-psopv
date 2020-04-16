import React, {Component} from 'react';
import {Grid} from '@material-ui/core';
import OverviewCom from './OverviewComp';
import { withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import {connect} from 'react-redux';
import PostDataInterface from '../../interfaces/PostDataInterface';
import ProblemDataInterface from '../../interfaces/ProblemDataInterface';
import UserDataInterface from '../../interfaces/UserDataInterface';
import { AppState } from '../../Redux/store';
import {Redirect} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {fetch} from './OverviewAction';


const styleBorder = {
    border: 'solid 1px black',
    width: '40%',
    height: '100%'
} 
const styleMap = {
    height: '100%',
    width: '60%'
}

interface IPropsMyMapComponent {
    isMarkerShown: boolean
}

interface IState {
    problemClicked: boolean,
    problem: ProblemDataInterface | null,
    postClicked: boolean,
    post: PostDataInterface | null,
    userClicked: boolean,
    user: UserDataInterface | null
}

type Props = LinkStateProps & LinkDispatchToProps;

class Overview extends Component<Props> {
    state : IState = {
        problemClicked: false,
        problem: null,
        postClicked: false,
        post: null,
        userClicked: false,
        user: null
    }

    componentWillMount = () => {
        this.props.fetch();
    }

    problemClicked = (problem: ProblemDataInterface) => {
        this.setState({
            problem: problem,
            problemClicked: true
        })
    }

    postClicked =(post: PostDataInterface) => {
        this.setState({
            post: post,
            postClicked: true
        })
    }

    userClicked = (user: UserDataInterface) => {
        this.setState({
            user: user,
            userClicked: true
        })
    }


    render() {
        let postMarkers: Array<JSX.Element> = this.props.posts.map(x => (
            <Marker  
                key={Math.random()}       
                position={{ lat: x.latitude, lng: x.longitude}}
                label={x.title}
                options={{icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'}}
                onClick={() => this.postClicked(x)}
            />
        ));
        let problemMarkers: Array<JSX.Element> = this.props.problems.map(x => (
            <Marker  
                key={Math.random()}       
                position={{ lat: x.latitude, lng: x.longitude}}
                label={x.problemType}
                options={{icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'}}
                onClick={() => this.problemClicked(x)}
            />
        ));
        let UserMarkers: Array<JSX.Element> = this.props.users.map(x => (
            <Marker 
            position={{lat: x.latitude, lng: x.longitude}}
            label={x.lastname + " " + x.name}
            options={{icon:'http://maps.google.com/mapfiles/ms/icons/green.png'}}
            onClick={() => this.userClicked(x)}
            />
        ));

        const MyMapComponent = withScriptjs(withGoogleMap((props: IPropsMyMapComponent) =>
            <GoogleMap
                defaultZoom={15}
                defaultCenter={{ lat: 50.962595, lng: 5.358503 }}
            >
                {postMarkers}
                {problemMarkers}
                {UserMarkers}
            </GoogleMap>
            ));

        if (this.state.postClicked) {
            return (
                <Redirect to={{
                    pathname: '/Data/Post',
                    state: this.state.post
                }}/>
            );
        }
        if (this.state.problemClicked) {
            return (
                <Redirect to={{
                    pathname: '/Data/Problem',
                    state: this.state.problem
                }} />
            );
        }
        if (this.state.userClicked) {
            return (
                <Redirect to={{
                    pathname: '/Data/User',
                    state: this.state.user
                }} 
                />
            )
        }

        return(
            <div>
                <Grid container>
                    <Grid item style={styleBorder}>
                        <OverviewCom />
                    </Grid>
                    <Grid item style={styleMap}>
                        <MyMapComponent
                            isMarkerShown
                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAT9J4RP-_5EPa6k4L9mY5SLld6rrJa-YM&v=3.exp&libraries=geometry,drawing,places"
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `400px` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

interface LinkStateProps {
    posts: PostDataInterface[],
    problems: ProblemDataInterface[],
    users: UserDataInterface[]
}
const MapStateToProps = (state : AppState): LinkStateProps => {
    return {
        posts: state.OverviewReducer.posts,
        problems: state.OverviewReducer.problems,
        users: state.OverviewReducer.users
    }
}

interface LinkDispatchToProps {
    fetch : () => any
}
const MapDispatchToProps = (dispatch: any) : LinkDispatchToProps => {
    return bindActionCreators({
        fetch
    },dispatch);
}


// export default Overview
export default connect(
    MapStateToProps, MapDispatchToProps
)(Overview);