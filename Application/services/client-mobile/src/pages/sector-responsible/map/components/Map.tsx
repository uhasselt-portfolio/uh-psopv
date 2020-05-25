import React from 'react'
import L, { Point } from 'leaflet';
import { Redirect } from 'react-router-dom';
import postIcon from './NormalMarker'
import ProblemIcon from './ProblemMarker'

import { Plugins } from '@capacitor/core';
import Auth from '../../../../utils/Auth';
const { Geolocation } = Plugins;

interface IProps {
    problems : any[][],
    users: any[],
    posts: any[],
    isMarkerClickable: boolean,
    containerId: string,
    centerLat: number,
    centerLong: number,
    mapHeight: number
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

var userIcon = L.icon({
    iconUrl: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    iconAnchor:   [13, 0], // point of the icon which will correspond to marker's location
    popupAnchor:  [5, -76] // point from which the popup should open relative to the iconAnchor
});


class MyMap extends React.Component<any> {
    state: IState = {
        problemClicked: false,
        problem: null,
        postClicked: false,
        post: null,
        userClicked: false,
        user: null,
        map: null,
        markers: [],
        updating: false,
        markergroup: new L.FeatureGroup(),
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

    getPost(): string {
        return '/PostView/'+ this.props.sector_id + '/' + this.props.post_id;
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

    getSectorColor(sector_id: number){
        // sector verantwoordelijke = 2
        let sector_info = this.props.sectors.find((element: any) =>{
            return (element.sector_id == sector_id);
        })
        return sector_info.color


    }
    /**
     * adds all the posts the component got in its props to the map
     * these are all the posts without a problem, to prevent overlap
     */
    addPostMarkers = (posts: any[], map : L.Map) => {
        for (let i = 0; i < posts.length; ++i) {
            let icon;
            if(Auth.getAuthenticatedUser().permission_type_id == 2){
                icon = postIcon({sector_id: posts[i].post_id, sector_color: this.getSectorColor(posts[i].sector_id)});
                if(posts[i].problem){
                    icon = ProblemIcon({sector_id: posts[i].post_id, sector_color: this.getSectorColor(posts[i].sector_id)});
                }
            } else{
                icon = userIcon;
            }
            let marker : L.Marker = L.marker([posts[i].latitude,posts[i].longitude], {icon: icon})


            marker.bindTooltip(posts[i].loc_description, {
                permanent: false,
                direction: 'top',
                offset: new Point(0, -40)

            })
                .on('click',() => {this.onPostClicked(posts[i])});
            marker.addTo(this.state.markergroup);
        }
    }
    /**
     * creates the map and attatches all the problems, posts, users as markers
     */
    componentDidMount = () => {
        var latlng1 = L.latLng(this.props.centerLat, this.props.centerLong);
        var mymap : L.Map = L.map(this.props.containerId).setView(latlng1, 12);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 25,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1
        }).addTo(mymap);

        // this.addproblemMarkers(this.props.problems,mymap);
        this.addPostMarkers(this.props.posts,mymap);
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
        if (this.props !== nextProps) {
            if (this.state.map != null) {
                this.state.map.removeLayer(this.state.markergroup);
                this.state.markergroup = new L.FeatureGroup();
                this.state.markergroup.addTo(this.state.map);
                this.addPostMarkers(nextProps.posts,this.state.map);
            }
        }
    }
 
  render () {    
    return (
        <div id={this.props.containerId} style={{height: this.props.mapHeight.toString() + 'px'}}>
 
        </div>
      )
  }
}

export default MyMap