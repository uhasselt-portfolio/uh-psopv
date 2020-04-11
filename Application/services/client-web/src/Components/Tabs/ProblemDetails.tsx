import React, {Component} from 'react';
import DataNavBar from '../NavBars/DataNavBarComp';
import {Grid, Button} from '@material-ui/core';
import { withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import ProblemInterface from '../Interfaces/ProblemDataInterface';

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
        state: ProblemInterface
    }
}

class ProblemDetails extends Component<IProps> {

    handleSolvedButton = () => {
        //TODO
    }

    render() {
        const MyMapComponent = withScriptjs(withGoogleMap((props: IPropsMyMapComponent) =>
        <GoogleMap
            defaultZoom={15}
            defaultCenter={{ lat: 50.962595, lng: 5.358503 }}
        >
            <Marker 
            position={{lat: this.props.location.state.latitude, lng: this.props.location.state.longitude}} 
            label={this.props.location.state.problemType} 
            />

        </GoogleMap>
        ));

        return(
            <div>
                <DataNavBar tab={-1 }/>
                <Grid container>
                    <Grid item style={styleBorder}>
                        <Grid container justify="center">
                            <Grid item>
                                <h4>{this.props.location.state.problemType}</h4>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <p>{this.props.location.state.discription}</p>
                        </Grid>
                        <Grid item>
                            <p>Shift: {this.props.location.state.shiftName}</p>
                        </Grid>
                        <Grid item>
                            <p>tijdstip: {this.props.location.state.timeStamp}</p>
                        </Grid>
                        <Grid item>
                            <p>post: {this.props.location.state.post}</p>
                        </Grid>
                        <Grid item>
                            <p>gaat over: {this.props.location.state.user}</p>
                        </Grid>
                        <Grid item>
                            <p>melder: {this.props.location.state.sender}</p>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" onClick={this.handleSolvedButton}>Solved</Button>
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


export default ProblemDetails