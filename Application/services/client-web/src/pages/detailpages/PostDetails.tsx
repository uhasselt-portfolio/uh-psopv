import React, {Component} from 'react';
import DataNavBar from '../../navBars/DataNavBarComp';
import {Grid} from '@material-ui/core';
import { withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import PostInterface from '../../interfaces/PostDataInterface';
import { AppState } from '../../Redux/store';
import {connect} from 'react-redux';
import ShiftDataInterface from '../../interfaces/ShiftDataInterface';
import Shift from '../planning/ShiftComp';
import ItemInterface from '../../interfaces/ItemDataInterface';
import {fetchPlanning} from './DetailActions';
import {bindActionCreators} from 'redux';

const styleBorder = {
    border: 'solid 1px black',
    width: '50%',
    height: '100%',
    padding: '5px',
} 
const styleMap = {
    height: '600px',
    width: '50%'
}

interface IPropsMyMapComponent {
    isMarkerShown: boolean
}

interface job {
    postId: Number,
    post: string,
    userId: Number,
    user: string,
    shiftId: Number,
    items: ItemInterface[]
}

interface ShiftProps {
    shiftname: string,
    begindate: string,
    enddate: string,
    jobs: job[]
}

interface IProps {
    location : {
        state: PostInterface
    }
}

type Props = IProps & LinkStateProps & LinkDispatchToProps;

class PostDetails extends Component<Props> {

    componentWillMount = () => {
        this.props.fetchPlanning();
    }

    organizePlanning = (ownshifts: ShiftDataInterface[]): ShiftProps[] => {
        let allShifts : ShiftDataInterface[] = ownshifts;
        let shifts : ShiftProps[] = [];

        while (allShifts.length > 0) {
            let temp : ShiftDataInterface[] = allShifts.filter(shift => shift.shiftId=== allShifts[0].shiftId);
            let tempJobs : job[] = [];
            for (let i : number = 0; i < temp.length; ++i) {
                tempJobs = [...tempJobs, {
                    postId: temp[i].post_id,
                    post: temp[i].post,
                    user: temp[i].user,
                    userId: temp[i].User_id,
                    shiftId: temp[i].id,
                    items: this.getItems(temp[i].id)
                }];
            }
            let tempProps : ShiftProps = {
                shiftname: temp[0].shiftName,
                begindate: temp[0].beginDate,
                enddate: temp[0].endDate,
                jobs: tempJobs
            };
            shifts = [...shifts, tempProps];
            allShifts = allShifts.filter(shift => shift.shiftId !== temp[0].shiftId);
        }
        return shifts
    }
    getItems = (shiftId: Number) : ItemInterface[] => {
        return this.props.items.filter(item => item.shiftId === shiftId);
    }

    filterPlanning = () : Array<JSX.Element> => {
        let ownShifts : ShiftDataInterface[] = this.props.planning.filter(shift => shift.post_id === this.props.location.state.id);
        let shifts: ShiftProps[] = this.organizePlanning(ownShifts).sort((x,y) => {
            if (x.shiftname <= y.shiftname)
                return -1;
            else
                return 1;
        });
        let shiftUi : Array<JSX.Element> = shifts.map(x => (
            <Shift shiftname={x.shiftname} begindate={x.begindate} enddate={x.enddate} jobs={x.jobs}/>
        ));
        return shiftUi;
    }

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

        let shiftUi = this.filterPlanning();

        return(
            <div>
                <DataNavBar tab={-1}/>
                <Grid container direction="row">
                    <Grid item style={styleBorder}>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container>
                                    <Grid item >
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
                                </Grid>
                            </Grid>
                            <Grid item> {/*List*/ }
                                {shiftUi}
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

interface LinkStateProps {
    planning: ShiftDataInterface[],
    items: ItemInterface[]
}
const MapStateToProps = (state : AppState): LinkStateProps => {
    return {
        planning: state.PlanningReducer.planning,
        items: state.PlanningReducer.items //
    };
}

interface LinkDispatchToProps {
    fetchPlanning: () => any
}
const MapDispatchToProp = (dispatch: any) : LinkDispatchToProps => {
    return bindActionCreators({
        fetchPlanning
    }, dispatch);
}

export default connect(
    MapStateToProps, MapDispatchToProp
)(PostDetails);