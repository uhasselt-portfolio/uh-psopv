import React, {Component} from 'react';
import {Grid, Button, TextField, MenuItem } from '@material-ui/core';
import { AppState } from '../../Redux/store';
import {connect} from 'react-redux';
import ShiftInterface from '../../interfaces/ShiftDataInterface';
import Shift from './ShiftComp';
import ItemInterface from '../../interfaces/ItemDataInterface';
import {bindActionCreators} from 'redux';
import {fetchPlanning} from './PlanningAction';

const styleFilter = {
    background: 'rgb(248,248,248)',
    padding: '10px',
    borderRadius: '25px',
    width: '25%',
    textAlign: 'center' as 'center',
    margin: '10px'
}
const styleFormElement = {
    margin: '4px'
}

interface IState {
    filter: string,
    filterValue: string,
    shiftFilter: string
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
            filterValue: "",
            shiftFilter: 'All shifts'
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
    handleFilterChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        let valueElement = (document.getElementById("filterInput")) as HTMLInputElement;
        var valueValue = valueElement.value;
        this.setState({
                filterValue: valueValue,
                filter: event.target.value
        });
    }

    handleShiftFilterChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            shiftFilter: event.target.value
        });
    }

    organizePlanningFilter = () :ShiftProps[] => {
        let allShifts : ShiftInterface[] = this.props.shifts;
        let shifts : ShiftProps[] = [];
        console.log(allShifts);

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
    } //TODO filter nakijken

    render () {      
        let shiftUi : Array<JSX.Element> = this.filter();
        return(
            <div>
                <Grid container direction="column">
                    <Grid container justify="center">
                        <h4>Planning</h4>
                    </Grid>
                    <Grid container justify="center">
                        <form onSubmit={this.handleFilterForm} style={styleFilter}>
                            <Grid item>
                                <TextField
                                    id="filter"
                                    select
                                    label="filter"
                                    value={this.state.filter}
                                    onChange={this.handleFilterChanged}
                                    helperText="Selecteer een filter"
                                    variant="outlined"
                                    style={styleFormElement}
                                    >
                                    <MenuItem value="No filter">Geen filter</MenuItem>
                                    <MenuItem value="post">Post</MenuItem>
                                    <MenuItem value="sector">Sector</MenuItem>
                                    <MenuItem value="user">Vrijwilliger</MenuItem>
                                    <MenuItem value="shift">Shift</MenuItem>
                                    <MenuItem value="startDate">Start tijdstip</MenuItem>
                                    <MenuItem value="endDate">Eind tijdstip</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item>
                                <TextField variant="outlined" id="filterInput" style={styleFormElement} type="text" placeholder={this.state.filter}></TextField>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" onClick={this.handleFilter} style={styleFormElement}>filter</Button>
                            </Grid>
                        </form>
                    </Grid>
                    <Grid container justify="center">
                        <Grid item>
                            <TextField
                                id="shiftFilter"
                                select
                                label="shiftFilter"
                                value={this.state.shiftFilter}
                                onChange={this.handleShiftFilterChanged}
                                helperText="Selecteer een shift"
                                variant="outlined"
                                style={styleFormElement}
                                >
                                <MenuItem value="All shifts">Alle shiften</MenuItem>
                                <MenuItem value="Shift1">Shift1: 04/12/2020 8:00 - 16:00</MenuItem>
                                <MenuItem value="Shift2">Shift2: 04/12/2020 8:00 - 16:00</MenuItem>
                                <MenuItem value="Shift3">Shift3: 04/12/2020 8:00 - 16:00</MenuItem>
                                <MenuItem value="Shift4">Shift4: 04/12/2020 8:00 - 16:00</MenuItem>
                                <MenuItem value="Shift5">Shift5: 04/12/2020 8:00 - 16:00</MenuItem>
                                <MenuItem value="Shift6">Shift6: 04/12/2020 8:00 - 16:00</MenuItem>
                            </TextField>
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