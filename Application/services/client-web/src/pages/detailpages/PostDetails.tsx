import React, {Component} from 'react';
import {Grid} from '@material-ui/core';
import PostInterface from '../../interfaces/PostDataInterface';
import { AppState } from '../../Redux/store';
import {connect} from 'react-redux';
import ShiftDataInterface from '../../interfaces/ShiftDataInterface';
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

/**
 * @author Wouter Grootjans
 */
class PostDetails extends Component<Props> {

    /**
     * gets called before the component is mounted
     * gets the planning from the database
     */
    componentWillMount = () => {
        this.props.fetchPlanning();
    }

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
                        {this.props.isMapFetched && <MyMap height={80} problems={[]} users={[]} posts={[this.props.location.state]} isMarkerClickable={false}/>}  
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