import React, {Component} from 'react';
import {Grid, Button} from '@material-ui/core';
import { withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import ProblemInterface from '../../interfaces/ProblemDataInterface';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {problemSolved} from './DetailActions';

const styleBorder = {
    width: '40%',
    height: '100%',
    padding: '5px',
} 
const styleMap = {
    height: '600px',
    width: '60%'
}
const ButtonStyle = {
    background: 'rgb(3,57,108)',
    color: 'white',
    margin: '4px'
}

interface IPropsMyMapComponent {
    isMarkerShown: boolean
}

interface IProps {
    location : {
        state: ProblemInterface
    }
}

type props = LinkDispatchToProps & IProps;

class ProblemDetails extends Component<props> {

    handleSolvedButton = () => {
        this.props.problemSolved(this.props.location.state.id);
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
                <Grid container>
                    <Grid container justify="center" direction="column" style={styleBorder}>
                        <Grid container justify="center">
                            <Grid item>
                                    <h4>{this.props.location.state.problemType}</h4>
                            </Grid>  
                        </Grid>
                        <Grid container justify="center">
                            <Grid item>
                                <p>{this.props.location.state.discription}</p>
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                        </Grid>
                        <Grid container justify="center">
                            <Grid item>
                                <p>tijdstip: { new Date(this.props.location.state.timeStamp).toLocaleString()}</p>
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                            <Grid item>
                                <p>post: {this.props.location.state.post}</p>
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                            <Grid item>
                                <p>gaat over: {this.props.location.state.user}</p>
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                            <Grid item>
                                <p>melder: {this.props.location.state.sender}</p>
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                            <Grid item>
                                <Button variant="outlined" onClick={this.handleSolvedButton} style={ButtonStyle}>Solved</Button>
                            </Grid>
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

interface LinkDispatchToProps {
    problemSolved: (ProblemId: Number) => any
}
const MapDispatchToProps = (dispatch: any) : LinkDispatchToProps => {
    return bindActionCreators({
        problemSolved
    },dispatch);
}


export default connect(
    null,
    MapDispatchToProps
)(ProblemDetails);