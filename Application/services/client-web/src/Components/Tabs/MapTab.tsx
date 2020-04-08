import React, {Component} from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import PostDataInterface from '../Interfaces/PostDataInterface';
import ProblemDataInterface from '../Interfaces/ProblemDataInterface';
import { AppState } from '../../Redux/Reducers';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

interface IPropsMyMapComponent {
    isMarkerShown: boolean
}

interface IState {
    problemClicked: boolean,
    problem: ProblemDataInterface | null,
    postClicked: boolean,
    post: PostDataInterface | null
}

type Props = LinkStateProps // & LinkDispatchProps;

class PukkelpopMap extends Component<Props> {
    state : IState = {
        problemClicked: false,
        problem: null,
        postClicked: false,
        post: null
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

    render() {

        let ProblemMarkers: Array<JSX.Element> = this.props.problems.map(x => (
            <Marker  
            position={{lat: x.latitude, lng: x.longitude}} 
            label={x.problemType} 
            options={{icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'}}
            onClick={() => this.problemClicked(x)}
            />
        ));
        let PostMarkers: Array<JSX.Element> = this.props.posts.map(x => (
            <Marker 
            position={{lat: x.latitude, lng: x.longitude}} 
            label={x.title} 
            options={{icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'}}
            onClick={() => this.postClicked(x)}
            />
        ));

        const MyMapComponent = withScriptjs(withGoogleMap((props: IPropsMyMapComponent) =>
        <GoogleMap
            defaultZoom={15}
            defaultCenter={{ lat: 50.962595, lng: 5.358503 }}
        >
            {PostMarkers}
            {ProblemMarkers}
        </GoogleMap>
        ));

        if (this.state.postClicked) {
            return (
                <Redirect to={{
                    pathname: '/data/Post',
                    state: this.state.post
                }}/>
            );
        }
        if (this.state.problemClicked) {
            return (
                <Redirect to={{
                    pathname: '/data/Problem',
                    state: this.state.problem
                }} />
            );
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
    posts: PostDataInterface[]
    problems: ProblemDataInterface[]
}

const MapStateToProps = (state : AppState): LinkStateProps => {
    return {
        posts: state.reducer.Posts,
        problems: state.reducer.Problems
    }
}

// export default Overview
export default connect(
    MapStateToProps,
)(PukkelpopMap);