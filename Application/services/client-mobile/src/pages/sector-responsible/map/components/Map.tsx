import React from 'react'
import L from 'leaflet';
import { Redirect } from 'react-router-dom';

var problemIcon = L.icon({
    iconUrl: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
    iconAnchor:   [13, 0], // point of the icon which will correspond to marker's location
    popupAnchor:  [5, -76] // point from which the popup should open relative to the iconAnchor
});
var postIcon = L.icon({
    iconUrl: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    iconAnchor:   [13, 0], // point of the icon which will correspond to marker's location
    popupAnchor:  [5, -76] // point from which the popup should open relative to the iconAnchor
});
var userIcon = L.icon({
    iconUrl: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    iconAnchor:   [13, 0], // point of the icon which will correspond to marker's location
    popupAnchor:  [5, -76] // point from which the popup should open relative to the iconAnchor
}) 

interface IProps {
    problems : any[][],
    users: any[],
    posts: any[],
    isMarkerClickable: boolean
}

interface IState {
    problemClicked: boolean,
    problem: any | null,
    postClicked: boolean,
    post: any | null,
    userClicked: boolean,
    user: any | null,
    map: L.Map | null,
    markers: L.Marker[],
    updating: boolean,
    markergroup: L.FeatureGroup
}

class MyMap extends React.Component<IProps> {
    state : IState = {
        problemClicked: false,
        problem: null,
        postClicked: false,
        post: null,
        userClicked: false,
        user: null,
        map: null,
        markers: [],
        updating: false,
        markergroup: new L.FeatureGroup()
    }

    /**
     * function to redirect the user to the detailspage of the problem on a click
     */
    onProblemClicked = (problem: any) => {
        this.setState({
            problem: problem,
            problemClicked: true
        })
    }

    /**
     * function to show all the problems on a specific post on a click
     */
    onMultipleProblemsClicked = (problems: any[],map : L.Map,marker: L.Marker) => { //TODO
        let popup : string = "";
        // for (let i = 0; i < problems.length; ++i) {
        //     popup = popup + '<Button onclick={fun()} >' + problems[i].problemType + '</Button></br>';
        // }
       for (let i = 0; i < problems.length; ++i) {
           popup = popup + '<div>' + problems[i].problemType + '</div></br>';
       }
        marker.bindPopup(popup);
    }

    /**
     * function to redirect the user to the defailspage of the post on a click
     */
    onPostClicked = (post: any) => {
        this.setState({
            post: post,
            postClicked: true
        })
    }

    /**
     * function to redirect the user to the detailspage of the user on a click
     */
    onUserClicked = (user: any) => {
        this.setState({
            user: user,
            userClicked: true
        })
    }

    /**
     * adds all the problems the component got in its props to the map
     * if mulitple porblems are on the same post, puts them together
     */
    addproblemMarkers = (problems: any[][] ,map : L.Map) => {
        for (let i = 0; i < problems.length; ++i) {
            if (problems[i].length === 1) {
                let marker : L.Marker = L.marker([problems[i][0].latitude, problems[i][0].longitude], {icon: problemIcon})
                    .bindTooltip(problems[i][0].problemType, {
                        permanent: true,
                        direction: 'top'
                    })
                    .on('click',() => {this.onProblemClicked(problems[i][0])});
                marker.addTo(this.state.markergroup);
            } else {
                let marker : L.Marker = L.marker([problems[i][0].latitude, problems[i][0].longitude], {icon: problemIcon})
                    .bindTooltip("Problemen", {
                        permanent: true,
                        direction: 'top'
                    })
                marker.on('click',() => {this.onMultipleProblemsClicked(problems[i],map,marker)});
                marker.addTo(this.state.markergroup);
            }
        }
    }

    /**
     * adds all the posts the component got in its props to the map
     * these are all the posts without a problem, to prevent overlap
     */
    addPostMarkers = (posts: any[], map : L.Map) => {
        for (let i = 0; i < posts.length; ++i) {
            let marker : L.Marker = L.marker([posts[i].latitude,posts[i].longitude], {icon: postIcon})
            .bindTooltip(posts[i].title, {
                permanent: true,
                direction: 'top'
            })
            .on('click',() => {this.onPostClicked(posts[i])});
            marker.addTo(this.state.markergroup);
        }
    }

    /**
     * adds all the users the component got int its props to the map
     */
    addUserMarkers = (users: any[],map: L.Map) => {
        for (let i = 0; i < users.length; ++i) {
            let marker : L.Marker = L.marker([users[i].latitude,users[i].longitude], {icon: userIcon})
            .bindTooltip(users[i].name, {
                permanent: true,
                direction: 'top'
            })
            .on('click',() => {this.onUserClicked(users[i])});
            marker.addTo(this.state.markergroup);
        }
    }

    /**
     * creates the map and attatches all the problems, posts, users as markers
     */
    componentDidMount = () => {
        var latlng1 = L.latLng(50.962595, 5.358503);
        var mymap : L.Map = L.map('mapid').setView(latlng1, 18);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 25,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1
        }).addTo(mymap);

        this.addproblemMarkers(this.props.problems,mymap);
        this.addPostMarkers(this.props.posts,mymap);
        this.addUserMarkers(this.props.users,mymap);
        mymap.addLayer(this.state.markergroup);
        this.setState({
            ...this.state,
            map: mymap
        });
        setTimeout(function(){ mymap.invalidateSize()}, 1000);
    }


    /**
     * function will update the markers when the redux props change
     */
    componentWillReceiveProps = (nextProps : IProps) => {
        console.log(nextProps);
        if (this.props !== nextProps) {
            console.log("different");
            if (this.state.map !== null) {
                this.state.map.removeLayer(this.state.markergroup);
                this.state.markergroup = new L.FeatureGroup();
                this.state.markergroup.addTo(this.state.map);
                this.addproblemMarkers(nextProps.problems,this.state.map);
                this.addPostMarkers(nextProps.posts,this.state.map);
                this.addUserMarkers(nextProps.users,this.state.map);
            }
        }
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
                    pathname: '/Data/User',
                    state: this.state.user
                }} 
                />
            )
        }
      }
    
      console.log("rendering");

    return (
        <div id="mapid" style={{height: '700px'}}>

        </div>
      )
  }
}

export default MyMap