import React, {Component} from 'react';
import DataNavBar from '../../navBars/DataNavBarComp';
import {Grid, Button } from '@material-ui/core';
import { AppState } from '../../Redux/store';
import {connect} from 'react-redux';
import ShiftInterface from '../../interfaces/ShiftDataInterface';
import Shift from './ShiftComp';
import ItemInterface from '../../interfaces/ItemDataInterface';
import {bindActionCreators} from 'redux';
import {fetchPlanning} from './PlanningAction';

interface IState {
    filter: string,
    filterValue: string,
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

type Props = LinkStateProps & LinkDispatchToProps;

class Planning extends Component<Props> {
    state: IState = {
            filter: "",
            filterValue: ""
    }

    componentWillMount = () => {
        this.props.fetchPlanning();
    }

    handleFilterForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.handleFilter();
    }
    handleFilter = () => {
        let element = (document.getElementById("filterInput")) as HTMLInputElement;
        var value = element.value;
        this.setState({
                ...this.state,
                filterValue: value
        })
    }
    filterChanged = () => {
        var filterElement = (document.getElementById("filtertype")) as HTMLSelectElement;
        var index = filterElement.selectedIndex;
        var filterValue = filterElement.options[index];
        let valueElement = (document.getElementById("filterInput")) as HTMLInputElement;
        var valueValue = valueElement.value;
        this.setState({
                filterValue: valueValue,
                filter: filterValue.value
        });
    }

    organizePlanningFilter = () :ShiftProps[] => {
        let allShifts : ShiftInterface[] = this.props.shifts;
        let shifts : ShiftProps[] = [];

        while (allShifts.length > 0) {
            let temp : ShiftInterface[] = allShifts.filter(shift => shift.shiftId === allShifts[0].shiftId);
            let tempJobs : job[] = [];
            for (let i : number = 0; i < temp.length; ++i) {
                if ((this.state.filter === "post" && this.state.filterValue === temp[i].post) ||
                    (this.state.filter === "sector" && this.state.filterValue === temp[i].sector.toString()) ||
                    (this.state.filter === "user" && this.state.filterValue === temp[i].user) ||
                    this.state.filter === "" || this.state.filter ==="shift" || this.state.filter === "startDate" || this.state.filter === "endDate"
                ) {
                    tempJobs = [...tempJobs, {
                        postId: temp[i].post_id,
                        post: temp[i].post,
                        user: temp[i].user,
                        userId: temp[i].User_id,
                        shiftId: temp[i].id,
                        items: this.getItems(temp[i].id)
                    }];
                }
            }
            if (tempJobs.length > 0) {
                let tempProps : ShiftProps = {
                    shiftname: temp[0].shiftName,
                    begindate: temp[0].beginDate,
                    enddate: temp[0].endDate,
                    jobs: tempJobs
                };
                shifts = [...shifts, tempProps];
            }
            allShifts = allShifts.filter(shift => shift.shiftId !== temp[0].shiftId);
        }
        return shifts
    }
    getItems = (shiftId: Number) : ItemInterface[] => {
        return this.props.items.filter(item => item.shiftId === shiftId);
    }

    filter = () : Array<JSX.Element> => {
        let shifts: ShiftProps[] = this.organizePlanningFilter().sort((x,y) => {
            if (x.shiftname <= y.shiftname)
                return -1;
            else
                return 1;
        });

        switch(this.state.filter) {
            case "shift": return shifts.filter(shift => shift.shiftname === this.state.filterValue).map(x => (
                    <Shift shiftname={x.shiftname} begindate={x.begindate} enddate={x.enddate} jobs={x.jobs} />
                ));
            case "startDate": return shifts.filter(shift => shift.begindate === this.state.filterValue).map(x => (
                    <Shift shiftname={x.shiftname} begindate={x.begindate} enddate={x.enddate} jobs={x.jobs}/>
                ));
            case "endDate": return shifts.filter(shift => shift.enddate === this.state.filterValue).map(x => (
                    <Shift shiftname={x.shiftname} begindate={x.begindate} enddate={x.enddate} jobs={x.jobs}/>
                ));
            default: return shifts.map(x => (
                    <Shift shiftname={x.shiftname} begindate={x.begindate} enddate={x.enddate} jobs={x.jobs}/>
                ));
        }
    }

    render () {      
        let shiftUi : Array<JSX.Element> = this.filter();
        return(
            <div>
                <DataNavBar tab={3}/>
                <Grid container direction="column">
                    <Grid item> {/*search*/}
                        <Grid container justify="center">
                            <form onSubmit={this.handleFilterForm}>
                                <Grid item>
                                    <select id="filtertype" onChange={this.filterChanged} value={this.state.filter}>
                                        <option value="">No filter</option>
                                        <option value="post">Post</option>
                                        <option value="sector">Sector</option>
                                        <option value="user">Vrijwilliger</option>
                                        <option value="shift">Shift</option>
                                        <option value="startDate">Start tijdstip</option>
                                        <option value="endDate">Eind tijdstip</option>
                                    </select>
                                </Grid>
                                <Grid item>
                                    <input id="filterInput" type="text" placeholder={this.state.filter}></input>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" onClick={this.handleFilter}>filter</Button>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                    <Grid item> {/*List*/ }
                        {shiftUi.length > 0 && shiftUi}
                        {shiftUi.length === 0 && <p>Nog geen shiften aanwezig</p>}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

interface LinkStateProps {
    shifts: ShiftInterface[],
    items: ItemInterface[]
}
const MapStateToProps = (state : AppState): LinkStateProps => {
    return {
        shifts: state.PlanningReducer.planning,
        items: state.PlanningReducer.items
    }
}

interface LinkDispatchToProps {
    fetchPlanning: () => any
}
const MapDispatchToProps = (dispatch: any) : LinkDispatchToProps => {
    return bindActionCreators({
        fetchPlanning
    },dispatch);
}

export default connect(
    MapStateToProps, MapDispatchToProps
)(Planning);