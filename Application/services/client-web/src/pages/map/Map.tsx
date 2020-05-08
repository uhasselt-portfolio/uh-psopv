import React from 'react'
import L from 'leaflet';
import PostDataInterface from '../../interfaces/PostDataInterface';
import ProblemDataInterface from '../../interfaces/ProblemDataInterface';
import UserDataInterface from '../../interfaces/UserDataInterface';

var problemIcon = L.icon({
    iconUrl: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',


    iconAnchor:   [13, 0], // point of the icon which will correspond to marker's location
    popupAnchor:  [5, -76] // point from which the popup should open relative to the iconAnchor
});

interface IProps {
    problems : ProblemDataInterface[][],
    users: UserDataInterface[],
    posts: PostDataInterface[]
}

class MyMaptest extends React.Component<IProps> {

    /**
     * function to redirect the user to the detailspage of the problem on a click
     */
    onProblemClicked = (problem: ProblemDataInterface) => {

    }

    /**
     * function to show all the problems on a specific post on a click
     */
    onMultipleProblemsClicked = (problems: ProblemDataInterface[]) => {

    }

    /**
     * function to redirect the user to the defailspage of the post on a click
     */
    onPostClicked = (post: PostDataInterface[]) => {

    }

    /**
     * function to redirect the user to the detailspage of the user on a click
     */
    onUserClicked = (user: UserDataInterface) => {

    }

    addproblemMarkers = (map : L.Map) => {
        for (let i = 0; i < this.props.problems.length; ++i) {
            console.log("adding marker", this.props.problems[i]);
            if (this.props.problems[i].length === 1) {
                L.marker([this.props.problems[i][0].latitude, this.props.problems[i][0].longitude], {icon: problemIcon})
                    .bindTooltip(this.props.problems[i][0].problemType, {
                        permanent: true,
                        direction: 'top'
                    })
                    .addTo(map)
                    .on('click',() => {this.onProblemClicked(this.props.problems[i][0])});
            } else {
                L.marker([this.props.problems[i][0].latitude, this.props.problems[i][0].longitude], {icon: problemIcon})
                    .bindTooltip("Problemen", {
                        permanent: true,
                        direction: 'top'
                    })
                    .addTo(map)
                    .on('click',() => {this.onMultipleProblemsClicked(this.props.problems[i])});
            }
        }
    }

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

        console.log(this.props);

        this.addproblemMarkers(mymap);
    
        L.marker([51.5, -0.09]).addTo(mymap)
            .bindPopup("<b>Hello world!</b><br />I am a popup.");

        var greenIcon = L.icon({
            iconUrl: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        
            iconSize:     [38, 95], // size of the icon
            shadowSize:   [50, 64], // size of the shadow
            iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        });
        var marker = L.marker([51.7, -0.1], {icon: greenIcon}).addTo(mymap);
    
        L.circle([51.508, -0.11], 500, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5
        }).addTo(mymap).bindPopup("I am a circle.");
    
        L.polygon([
            [51.509, -0.08],
            [51.503, -0.06],
            [51.51, -0.047]
        ]).addTo(mymap).bindPopup("I am a polygon.");
    
    
        var popup = L.popup();
    
        function onMapClick(e: { latlng: L.LatLngExpression; }) {
            popup
                .setLatLng(e.latlng)
                .setContent("You clicked the map at " + e.latlng.toString())
                .openOn(mymap);
        }
    
        mymap.on('click', onMapClick);
    }

  render () {
    
    return (
        // <Map center={{lat: 51.505, lng: -0.09}} zoom={17}>
        //   <TileLayer
        //     url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        //     attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        //   />
        //   <Marker position={{lat: 51.505, lng: -0.09}}>
        //     <Popup>
        //       <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
        //     </Popup>
        //   </Marker>
        // </Map>
        <div id="mapid" style={{height: '700px'}}>
            
        </div>
      )
  }
}

export default MyMaptest