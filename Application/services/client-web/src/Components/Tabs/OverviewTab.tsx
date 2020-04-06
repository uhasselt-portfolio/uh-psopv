import React, {Component} from 'react';
import {Grid} from '@material-ui/core';
import OverviewCom from '../OverviewComp';
import { withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";

const styleBorder = {
    border: 'solid 1px black',
    width: '40%',
    height: '100%'
} 
const styleMap = {
    height: '100%',
    width: '60%'
}

interface MarkerP {
    lat: Number,
    long: Number,
    name: string
}

interface IState {
    posts: MarkerP[],
    problems: MarkerP[]
}

interface IPropsMyMapComponent {
    isMarkerShown: boolean
}


class Overview extends Component {
    state: IState = {
        posts: [{ lat: 0, long: 0, name: "0"}],
        problems: [{ lat: 0, long: 0, name: "0"}]
    }
    componentDidMount() {
        this.setState({
            posts: [
                { lat: 50.962595, long: 5.358503, name: "parking 1"},
                { lat: 50.962068, long: 5.358836, name: "parking 2"},
                { lat: 50.963642, long: 5.359328, name: "parking 3"},
                { lat: 50.963257, long: 5.356721, name: "parking 4"},
                { lat: 50.963902, long: 5.355056, name: "parking 5"},
                { lat: 50.964240, long: 5.360195, name: "parking 6"},
                { lat: 50.961780, long: 5.361407, name: "parking 7"}
            ],
            problems: [
                { lat: 50.960703, long: 5.357232, name: "Afwezigheid"},
            ]
        })
    }

    render() {
        let postMarkers: Array<JSX.Element> = this.state.posts.map(x => (
            <Marker  
                key={Math.random()}       
                position={{ lat: x.lat, lng: x.long}}
                label={x.name}
                options={{icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'}}
            />
        ));
        let problemMarkers: Array<JSX.Element> = this.state.problems.map(x => (
            <Marker  
                key={Math.random()}       
                position={{ lat: x.lat, lng: x.long}}
                label={x.name}
                options={{icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'}}
            />
        ));
            // console.log(postMarkers);
            // console.log(problemMarkers);

            const MyMapComponent = withScriptjs(withGoogleMap((props: IPropsMyMapComponent) =>
                <GoogleMap
                    defaultZoom={15}
                    defaultCenter={{ lat: 50.962595, lng: 5.358503 }}
                >
                    <Marker
                        position={{ lat: 50.962595, lng: 5.358503}}
                        label={"testmarker"}
                    />
                    {postMarkers}
                    {problemMarkers}

                </GoogleMap>
                ));

        return(
            <div>
                <h4>Overview</h4>
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

export default Overview