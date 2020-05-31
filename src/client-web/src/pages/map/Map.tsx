import React from 'react'
import L from 'leaflet';
import PostDataInterface from '../../interfaces/PostDataInterface';
import ProblemDataInterface from '../../interfaces/ProblemDataInterface';
import UserDataInterface from '../../interfaces/UserDataInterface';
import { Redirect } from 'react-router-dom';
import {Map, TileLayer, Marker, Popup, Tooltip} from 'react-leaflet';
import { Button } from '@material-ui/core';

var problemIcon = L.icon({
    iconUrl: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
    iconAnchor:   [15, 20], // point of the icon which will correspond to marker's location
    //popupAnchor:  [5, -76] // point from which the popup should open relative to the iconAnchor
});
var postIcon = L.icon({
    iconUrl: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    iconAnchor:   [15, 20], // point of the icon which will correspond to marker's location
});
var userIcon = L.icon({
    iconUrl: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    iconAnchor:   [15, 20], // point of the icon which will correspond to marker's location
}) 

interface IProps {
    problems : ProblemDataInterface[][],
    users: UserDataInterface[],
    posts: PostDataInterface[],
    isMarkerClickable: boolean,
    height: number
}

interface IState {
    problemClicked: boolean,
    problem: ProblemDataInterface | null,
    postClicked: boolean,
    post: PostDataInterface | null,
    userClicked: boolean,
    user: UserDataInterface | null
}

/**
 * @author Wouter Grootjans
 */
class MyMap extends React.Component<IProps> {
    state : IState = {
        problemClicked: false,
        problem: null,
        postClicked: false,
        post: null,
        userClicked: false,
        user: null,
    }

    /**
     * function to redirect the user to the detailspage of the problem on a click
     */
    onProblemClicked = (problem: ProblemDataInterface) => {
        this.setState({
            problem: problem,
            problemClicked: true
        })
    }

    /**
     * function to redirect the user to the defailspage of the post on a click
     */
    onPostClicked = (post: PostDataInterface) => {
        this.setState({
            post: post,
            postClicked: true
        })
    }

    /**
     * function to redirect the user to the detailspage of the user on a click
     */
    onUserClicked = (user: UserDataInterface) => {
        this.setState({
            user: user,
            userClicked: true
        })
    }

    /**
     * returns all the problemMarkers the component got in its props
     * if mulitple porblems are on the same post, puts them together
     */
    getProblemMarkers = (problems: ProblemDataInterface[][]) : Array<JSX.Element> => {
        let markers : Array<JSX.Element> = [];

        for (let i = 0; i < problems.length; ++i){
            if (problems[i].length === 1) {
                markers.push(
                    <Marker
                        position={L.latLng(problems[i][0].latitude, problems[i][0].longitude)}
                        icon={problemIcon}
                        onClick={() => {this.onProblemClicked(problems[i][0])}}
                    >
                        <Tooltip permanent={true} offset={new L.Point(0,-15)} direction={'top'}>
                            {problems[i][0].problemType}
                        </Tooltip>
                        {/* <Popup>
                            <Button onClick={() => {this.onProblemClicked(problems[i][0])}} variant="outlined">{problems[i][0].problemType}</Button>
                        </Popup> */}
                    </Marker>
                )
            } else {
                let popup : Array<JSX.Element> = problems[i].map(problem => {
                    return (
                        <Button onClick={() => this.onProblemClicked(problem)} variant="outlined" style={{margin:"3px"}}>
                            {problem.problemType}</Button>
                    )
                })
                markers.push(
                    <Marker
                    position={L.latLng(problems[i][0].latitude, problems[i][0].longitude)}
                    icon={problemIcon}
                    >
                    <Tooltip permanent={true} offset={new L.Point(0,-15)} direction={'top'}>
                        Er zijn {popup.length} problemen
                    </Tooltip>
                        <Popup>
                            {popup}
                        </Popup>
                    </Marker>
                )
            }
        }

        return markers;
    }

    /**
     * returns all the postMarkers the component got in its props
     * these are all the posts without a problem, to prevent overlap
     */
    getPostMarkers = (posts: PostDataInterface[]) : Array<JSX.Element> => {
        let markers : Array<JSX.Element> = [];
        for (let i = 0; i < posts.length; ++i) {
            markers.push(
                <Marker
                    position={new L.LatLng(posts[i].latitude,posts[i].longitude)}
                    icon={postIcon}
                    onclick={() => {this.onPostClicked(posts[i])}}
                >
                    <Tooltip permanent={true} offset={new L.Point(0,-15)} direction={'top'}>
                        {posts[i].title}
                    </Tooltip>
                </Marker>
            );
        }
        return markers;
    }

    /**
     * returns all the userMarkers the component got int its props
     */
    getUserMarkes = (users: UserDataInterface[]) : Array<JSX.Element> => {
        let markers : Array<JSX.Element> = [];
        for (let i = 0; i < users.length; ++i) {
            markers.push( 
                <Marker 
                    position={new L.LatLng(users[i].latitude, users[i].longitude)}
                    icon={userIcon}
                    onClick={() => {this.onUserClicked(users[i])}}
                >
                    <Tooltip permanent={true} offset={new L.Point(0,-15)} direction={'top'}>
                        {users[i].name}
                    </Tooltip>
                </Marker>
            );
        }
        return markers;
    }

    render () {
      if (this.props.isMarkerClickable) {
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
                    pathname: '/Data/Users',
                    state: this.state.user
                }} 
                />
            )
        }
      }

      let userMarkers : Array<JSX.Element> = this.getUserMarkes(this.props.users);
      let postMarkers : Array<JSX.Element> = this.getPostMarkers(this.props.posts);
      let problemMarkers : Array<JSX.Element> = this.getProblemMarkers(this.props.problems);

      let center : L.LatLng = new L.LatLng(50.962595, 5.358503);
      if (this.props.posts.length > 0) {
        center = new L.LatLng(this.props.posts[0].latitude, this.props.posts[0].longitude);
      } else if (this.props.problems.length > 0) {
        center = new L.LatLng(this.props.problems[0][0].latitude, this.props.problems[0][0].longitude);
      } else if (this.props.users.length > 0) {
        center = new L.LatLng(this.props.users[0].latitude,this.props.users[0].longitude);
      }

    return (
        <Map center={center} zoom={13} style={{height: this.props.height + 'vh'}} zoomControl={false}>
            <TileLayer
            attribution={'&amp;copy <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                     '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                     'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'}
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {postMarkers}
            {userMarkers}
            {problemMarkers}
        </Map>
      )
  }
}

export default MyMap