import React, {Component} from 'react';
import {Grid, Button, TextField, MenuItem } from '@material-ui/core';
import { AppState } from '../../Redux/store';
import {connect} from 'react-redux';
import ShiftInterface from '../../interfaces/ShiftDataInterface';
import PostInterface from '../../interfaces/PostDataInterface';
import Shift from './ShiftComp';
import ItemInterface from '../../interfaces/ItemDataInterface';
import {bindActionCreators} from 'redux';
import {fetchPlanning} from './PlanningAction';
import Post from './PlanningPost';
import UserInterface from '../../interfaces/UserDataInterface';

const styleFilter = {
    background: 'rgb(242,242,250)',
    padding: '10px',
    borderRadius: '25px',
    width: '25%',
    textAlign: 'center' as 'center',
    margin: '10px'
}
const ButtonStyle = {
    background: 'rgb(3,57,108)',
    color: 'white',
    margin: '4px'
}
const styleFormElement = {
    margin: '4px'
}
const shiftFilterStyle = {
    color: 'rgb(3,57,108)',
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
            shiftFilter: ''
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
        let allShifts : ShiftInterface[] = this.props.planning;
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

    filterShift = () : Array<JSX.Element> => {


        return (
            [<Post postName="post2" items={['item1','item2','item3']} users={[]} />]
        )
    }

    render () {      
        let filteredPosts : PostInterface[] = this.props.posts;

        switch(this.state.filter) {
            case 'post': {
                filteredPosts = this.props.posts.filter(post => post.title === this.state.filterValue);
                break;
            }
            case 'sector': {
                filteredPosts = this.props.posts.filter(post => post.sector.toString() === this.state.filterValue);
                break;
            }
        }

        let uniqueShifts : ShiftInterface[] = [];
        for (let i = 0; i < this.props.planning.length; ++i) {
            let alreadyIn : boolean = false;
            for (let j = 0; j < uniqueShifts.length; ++j) {
                if (uniqueShifts[j].shiftId === this.props.planning[i].shiftId)
                    alreadyIn = true;
            }
            if (! alreadyIn)
                uniqueShifts.push(this.props.planning[i]);
        }

        let shiftChoices : Array<JSX.Element> = uniqueShifts.map( x => {
            let date: Date = new Date(x.beginDate);
            let parsedBeginDate: string = date.toLocaleString();
            let enddate: Date = new Date(x.endDate);
            let parseEndDate : string = enddate.toLocaleString().split(" ")[1];
            return (
                <MenuItem value={x.shiftName + parsedBeginDate}> {x.shiftName + " "} {parsedBeginDate + " tot " + parseEndDate}</MenuItem>
            );
        });

        let selectedShiftId : Number = -1;
        for (let i = 0; i <  uniqueShifts.length; ++i) {
            let date: Date = new Date(uniqueShifts[i].beginDate);
            let parsedBeginDate: string = date.toLocaleString();
            if (uniqueShifts[i].shiftName + parsedBeginDate === this.state.shiftFilter) {
                selectedShiftId = uniqueShifts[i].shiftId;
                break;
            }
        }

        let posts3: PostInterface[] = [];
        for (let i = 0; i < filteredPosts.length; ++i) {
            for (let j = 0; j < this.props.planning.length; ++j)
                if (this.props.planning[j].post_id === filteredPosts[i].id && this.props.planning[j].shiftId === selectedShiftId) {
                    posts3.push(filteredPosts[i]);
                    break;
                }
        }

        let users: UserInterface[][] = [];
        for (let i = 0; i < posts3.length; ++i) {
            let usersid: Number[] = [];
            for (let j = 0; j < this.props.planning.length; ++j) {
                if (this.props.planning[j].shiftId === selectedShiftId && this.props.planning[i].post_id === posts3[i].id) {
                    usersid.push(this.props.planning[j].User_id);
                }
            }
            let tempUsers : UserInterface[] = [];
            for (let j = 0; j < this.props.users.length; ++j)
                if (usersid.includes(this.props.users[j].id))
                    tempUsers.push(this.props.users[j]);
            users.push(tempUsers);
        }

        let items: string[][] = [];
        for (let i = 0; i < posts3.length; ++i) {
            let tempItems : string[] = [];
            for (let j = 0; j < this.props.items.length; ++j) {
                for (let k = 0; k < this.props.planning.length; ++k) {
                    if (this.props.items[j].shiftId === this.props.planning[k].id && this.props.planning[k].shiftId === selectedShiftId
                            && this.props.planning[k].post_id === posts3[i].id)
                        tempItems.push(this.props.items[j].itemType);
                }
            }
            items.push(tempItems);
        }

        let postsUi : Array<JSX.Element> = [];
        for (let i = 0; i < posts3.length; ++i) {
            postsUi.push(
                <Post postName={posts3[i].title} items={items[i]} users={users[i]} />
            );
        }

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
                                </TextField>
                            </Grid>
                            <Grid item>
                                <TextField variant="outlined" id="filterInput" style={styleFormElement} type="text" placeholder={this.state.filter}></TextField>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" onClick={this.handleFilter} style={ButtonStyle}>filter</Button>
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
                                style={shiftFilterStyle}
                                >
                                {shiftChoices}
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid item> 
                        {postsUi}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

interface LinkStateProps {
    planning: ShiftInterface[],
    posts: PostInterface[],
    items: ItemInterface[],
    users: UserInterface[]
}
const MapStateToProps = (state : AppState): LinkStateProps => {
    return {
        planning: state.PlanningReducer.planning,
        items: state.PlanningReducer.items,
        posts: state.PlanningReducer.posts,
        users: state.PlanningReducer.users
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