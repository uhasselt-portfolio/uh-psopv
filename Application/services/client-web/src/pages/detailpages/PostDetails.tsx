import React, {Component} from 'react';
import {Grid} from '@material-ui/core';
import PostInterface from '../../interfaces/PostDataInterface';
import { AppState } from '../../Redux/store';
import {connect} from 'react-redux';
import ShiftDataInterface from '../../interfaces/ShiftDataInterface';
import Shift from '../planning/ShiftComp';
import ItemInterface from '../../interfaces/ItemDataInterface';
import {fetchPlanning} from './DetailActions';
import {bindActionCreators} from 'redux';
import MyMap from '../map/Map';

const styleBorder = {
    width: '50%',
    height: '100%',
    padding: '5px',
} 
const styleMap = {
    height: '600px',
    width: '50%'
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

    /**
     * gets called before the component is mounted
     * gets the planning from the database
     */
    componentWillMount = () => {
        this.props.fetchPlanning();
    }

    //TODO show planning and problems on post

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

    /**
     * renders the component
     */
    render() {
        return(
            <div>
                <Grid container direction="row">
                    <Grid container direction="column" style={styleBorder}>
                        <Grid container justify="center">
                            <Grid item>
                                <h4>{this.props.location.state.title}</h4>
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                            <Grid item>
                                <p>Adres: {this.props.location.state.addres}</p>
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                            <Grid item>
                                <p>Sector: {this.props.location.state.sector}</p>
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                            <Grid item>
                                <p>{this.props.location.state.general}</p>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item style={styleMap}>
                        {this.props.isMapFetched && <MyMap problems={[]} users={[]} posts={[this.props.location.state]} isMarkerClickable={false}/>}  
                    </Grid>
                </Grid>
            </div> 
            );
    }
}

interface LinkStateProps {
    planning: ShiftDataInterface[],
    items: ItemInterface[],
    isMapFetched: boolean
}
const MapStateToProps = (state : AppState): LinkStateProps => {
    return {
        planning: state.DetailReducer.planning,
        items: state.DetailReducer.items,
        isMapFetched: state.DetailReducer.isMapFetched
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