import React, {Component} from 'react';
import DataNavBar from '../NavBars/DataNavBarComp';
import {Grid} from '@material-ui/core';
import { withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import PostInterface from '../Interfaces/PostDataInterface';

const styleBorder = {
    border: 'solid 1px black',
    width: '40%',
    height: '100%',
    padding: '5px',
} 
const styleMap = {
    height: '600px',
    width: '60%'
}

interface IPropsMyMapComponent {
    isMarkerShown: boolean
}

interface IProps {
    location : {
        state: PostInterface
    }
}

class PostDetails extends Component<IProps> {

    render() {
        const MyMapComponent = withScriptjs(withGoogleMap((props: IPropsMyMapComponent) =>
        <GoogleMap
            defaultZoom={15}
            defaultCenter={{ lat: 50.962595, lng: 5.358503 }}
        >
            <Marker 
            position={{lat: this.props.location.state.latitude, lng: this.props.location.state.longitude}} 
            label={this.props.location.state.title} 
            options={{icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'}}
            />

        </GoogleMap>
        ));

        return(
            <div>
                <DataNavBar />
                <Grid container>
                    <Grid item style={styleBorder}>
                        <Grid container justify="center">
                            <Grid item>
                                <h4>{this.props.location.state.title}</h4>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <p>Adres: {this.props.location.state.addres}</p>
                        </Grid>
                        <Grid item>
                            <p>Sector: {this.props.location.state.sector}</p>
                        </Grid>
                        <Grid item>
                            <p>{this.props.location.state.general}</p>
                        </Grid>
                    </Grid>
                    <Grid item style={styleMap}>
                        <MyMapComponent
                            isMarkerShown
                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAT9J4RP-_5EPa6k4L9mY5SLld6rrJa-YM&v=3.exp&libraries=geometry,drawing,places"
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `100%` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                        />
                    </Grid>
                </Grid>
            </div> 
            );
    }
}


export default PostDetails