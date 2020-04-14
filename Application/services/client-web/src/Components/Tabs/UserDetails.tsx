import React, {Component} from 'react';
import DataNavBar from '../NavBars/DataNavBarComp';
import {Grid} from '@material-ui/core';
import { withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import UserDataInteface from '../Interfaces/UserDataInterface';

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
const labelStyle = {
    padding: '0 10px 0 0'
}

interface IPropsMyMapComponent {
    isMarkerShown: boolean
}

interface IProps {
    location : {
        state: UserDataInteface
    }
}

class UserDetails extends Component<IProps> {


    handleChangeInternet = () => {
        //TODO do change globally
    }

    render() {
        const MyMapComponent = withScriptjs(withGoogleMap((props: IPropsMyMapComponent) =>
        <GoogleMap
            defaultZoom={15}
            defaultCenter={{ lat: 50.962595, lng: 5.358503 }}
        >
            <Marker 
            position={{lat: this.props.location.state.latitude, lng: this.props.location.state.longitude}} 
            label={this.props.location.state.lastname + " " + this.props.location.state.name} 
            options={{icon: 'http://maps.google.com/mapfiles/ms/icons/green.png'}}
            />

        </GoogleMap>
        ));

        let permissionsView : JSX.Element = <div></div>;
        if (this.props.location.state.permission) {    //verantwoordelijke
            permissionsView =   <Grid item style={labelStyle}>
                                    <p>verantwoordelijke</p>
                                </Grid>
        } else {    //vrijwilliger
            permissionsView = <Grid container justify="space-between">
                                <Grid item style={labelStyle}>
                                    <p className="col s2">vrijwilliger</p>
                                </Grid>
                                <Grid item>
                                    <Grid container>
                                        <Grid item style={labelStyle}>
                                            <p className="col s2">vereniging: </p>
                                        </Grid>
                                        <Grid item>
                                            <p className="col s4">{this.props.location.state.association}</p>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
        }

        return(
            <div>
                <DataNavBar tab={-1}/>
                <Grid container>
                    <Grid item style={styleBorder}>
                        <Grid container justify="center">
                            <Grid item>
                                <h4>{this.props.location.state.name} {this.props.location.state.lastname}</h4>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container>
                                <Grid item style={labelStyle}>
                                    <p>nummer: </p>
                                </Grid>
                                <Grid item>
                                    <p>{this.props.location.state.gsmNumber}</p>
                                </Grid>
                            </Grid>
                        <Grid item>
                            <Grid container>
                                <Grid item style={labelStyle}>
                                    <p>email: </p>
                                </Grid>
                                <Grid item>
                                    <p>{this.props.location.state.email}</p>
                                </Grid>
                            </Grid>
                        </Grid>
                        </Grid>
                        {permissionsView}
                        <Grid container justify="space-between">
                            <Grid item>
                                <form action="#">
                                        {this.props.location.state.has_internet &&                             
                                            <label>
                                                <input type="checkbox" checked={true} onChange={this.handleChangeInternet}/>
                                                <span> heeft een internet verbinding </span>
                                            </label>
                                        }
                                        { ! this.props.location.state.has_internet && 
                                            <label>
                                                <input type="checkbox" checked={false}onChange={this.handleChangeInternet}/>
                                                <span> heeft geen internet verbinding </span>
                                            </label>
                                        }
                                </form>
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


export default UserDetails