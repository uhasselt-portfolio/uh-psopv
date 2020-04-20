import React, {Component} from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import PostDataInterface from '../../interfaces/PostDataInterface';
import ProblemDataInterface from '../../interfaces/ProblemDataInterface';
import UserDataInterface from '../../interfaces/UserDataInterface';
import { AppState } from '../../Redux/store';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {fetchMap} from './MapAction';
import mapStyles from './MapStyles.json';

const defaultMapOptions = {
    styles: mapStyles
  };

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

class PukkelpopMap extends Component<Props> {
    state : IState = {
        problemClicked: false,
        problem: null,
        postClicked: false,
        post: null,
        userClicked: false,
        user: null
    }

    componentWillMount = () => {
        this.props.fetchMap();
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

        let ProblemMarkers: Array<JSX.Element> = this.props.problems.map(x => (
            <Marker  
            position={{lat: x.latitude, lng: x.longitude}} 
            label={x.problemType} 
            options={{icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'}}
            onClick={() => this.problemClicked(x)}
            />
        ));

        let postsWithouProblems : PostDataInterface[] = [];
        for (let i = 0; i < this.props.posts.length; ++i) {
            let noProblem = true;
            for (let j = 0; j < this.props.problems.length; ++j) {
                if (this.props.posts[i].id === this.props.problems[j].postId)
                    noProblem = false;
            }
            if (noProblem)
                postsWithouProblems.push(this.props.posts[i]);
        }

        let PostMarkers: Array<JSX.Element> = postsWithouProblems.map(x => (
            <Marker 
            position={{lat: x.latitude, lng: x.longitude}} 
            label={x.title} 
            options={{icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'}}
            onClick={() => this.postClicked(x)}
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
            defaultOptions={defaultMapOptions}
        >
            {PostMarkers}
            {ProblemMarkers}
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
                <MyMapComponent
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAT9J4RP-_5EPa6k4L9mY5SLld6rrJa-YM&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `700px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        );
    }
}

interface LinkStateProps {
    posts: PostDataInterface[],
    problems: ProblemDataInterface[],
    users: UserDataInterface[],
    loading: boolean,
    isMapFetched: boolean,
    errorMessage: string
}
const MapStateToProps = (state : AppState): LinkStateProps => {
    return {
        posts: state.MapReducer.posts,
        problems: state.MapReducer.problems,
        users: state.MapReducer.users,
        loading: state.MapReducer.loading,
        isMapFetched: state.MapReducer.isMapFetched,
        errorMessage: state.MapReducer.errorMessage
    }
}

interface LinkDispatchToProps {
    fetchMap: any
}
const MapDispatchToProp = (dispatch: any) : LinkDispatchToProps => {
    return bindActionCreators({
        fetchMap
    }, dispatch);
}

// export default Overview
export default connect(
    MapStateToProps, MapDispatchToProp
)(PukkelpopMap);