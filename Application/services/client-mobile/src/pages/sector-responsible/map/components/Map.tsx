import React from 'react'
import L, { Point } from 'leaflet';
import { Redirect } from 'react-router-dom';
import postIcon from './NormalMarker'
import ProblemIcon from './ProblemMarker'
 
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
 
    // /**
    //  * adds all the problems the component got in its props to the map
    //  * if mulitple porblems are on the same post, puts them together
    //  */
    // addproblemMarkers = (problems: any[][] ,map : L.Map) => {
    //     console.log("prob",problems);
    //     for (let i = 0; i < problems.length; ++i) {
    //         if (problems[i].length === 1) {
    //             let marker : L.Marker = L.marker([problems[i][0].latitude, problems[i][0].longitude], {icon: problemIcon})
    //                 .bindTooltip(problems[i][0].problemType, {
    //                     permanent: false,
    //                     direction: 'top',
    //                     offset: new Point(0, 0)
    //                 })
    //                 .on('click',() => {this.onProblemClicked(problems[i][0])});
    //             marker.addTo(this.state.markergroup);
    //         } else {
    //             console.log("multiple");
    //             let marker : L.Marker = L.marker([problems[i][0].latitude, problems[i][0].longitude], {icon: problemIcon})
    //                 .bindTooltip("Problemen", {
    //                     permanent: false,
    //                     direction: 'top',
    //                     offset: new Point(0, 0)

    //                 })
    //             marker.on('click',() => {this.onMultipleProblemsClicked(problems[i],map,marker)});
    //             marker.addTo(this.state.markergroup);
    //         }
    //     }
    // }

    getSectorColor(sector_id: number){
        console.log(sector_id, this.props)
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
            console.log(posts[i])
            let icon = postIcon({post_id: posts[i].post_id, sector_color: this.getSectorColor(posts[i].sector_id)});
            if(posts[i].problem){
                icon = ProblemIcon({post_id: posts[i].post_id, sector_color: this.getSectorColor(posts[i].sector_id)});
            }
            let marker : L.Marker = L.marker([posts[i].loc_lat,posts[i].loc_lng], {icon: icon})
            .bindTooltip(posts[i].title, {
                permanent: false,
                direction: 'top',
                offset: new Point(0, -50)

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
      console.log(this.props)
    return (
        <div id={this.props.containerId} style={{height: this.props.mapHeight.toString() + 'px'}}>
 
        </div>
      )
  }
}
 
export default MyMap