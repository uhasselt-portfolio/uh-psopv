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
import {formatTime2, formatDate} from '../../Components/date_formatter';


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

/**
 * @author Wouter Grootjans
 */
class Planning extends Component<Props> {
    state: IState = {
            filter: "",
            filterValue: "",
            shiftFilter: ''
    }

    /**
     * called before the component is mounted
     * gets the latest planning from the database
     */
    componentWillMount = () => {
        this.props.fetchPlanning();
    }

    /**
     * handles the submit of the user of the filter from
     * prevents the default page reload of a html form
     */
    handleFilterForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.handleFilter();
    }
    /**
     * getls the value that the user searched for an applies it
     */
    handleFilter = () => {
        let element = (document.getElementById("filterInput")) as HTMLInputElement;
        var value = element.value;
        this.setState({
                ...this.state,
                filterValue: value
        })
    }
    /**
     * gets the new filter and applies it
     */
    handleFilterChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        let valueElement = (document.getElementById("filterInput")) as HTMLInputElement;
        var valueValue = valueElement.value;
        this.setState({
                filterValue: valueValue,
                filter: event.target.value
        });
    }

    /**
     * updates the state with the shift the user wants to view
     */
    handleShiftFilterChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            shiftFilter: event.target.value
        });
    }

    /**
     * filters all the shifts to user can view depending on the filter option he has chosen
     */
    organizePlanningFilter = () :ShiftProps[] => {
        let allShifts : ShiftInterface[] = this.props.planning;
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

    /**
     * takes the shifts from this.props and returns a Shift component array with only the shifts the user 
     * wants to see
     */
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

        let filterdShifts : ShiftInterface[][] = this.sortPlanningPerShift();
        let postsUi : Array<JSX.Element> = [];
        let shiftChoices : Array<JSX.Element> = []; 

        if (filterdShifts.length > 0 ) {
            shiftChoices = filterdShifts.map(x => {
                // let date: Date = new Date(x[0].beginDate);
                // let parsedBeginDate: string = date.toLocaleString();
                // let enddate: Date = new Date(x[0].endDate);
                // let parseEndDate : string = enddate.toLocaleString().split(" ")[1];

                let date: Date = new Date(x[0].beginDate);
                let tempDate: string = formatDate(date.toString());
                let beginTime : string = formatTime2(x[0].beginDate);
                let endtTime : string = formatTime2(x[0].endDate);

                return (
                    <MenuItem value={x[0].shiftName + date + beginTime}>{tempDate + " " + beginTime + " tot " + endtTime}</MenuItem>
                );
            });

            let selectedShiftIndex : number = -1;
            for (let i = 0; i <  filterdShifts.length; ++i) {
                let date: Date = new Date(filterdShifts[i][0].beginDate);
                let parsedBeginDate: string = date.toLocaleString().split(" ")[1];
                if ((date.getHours()-2) < 10) 
                    parsedBeginDate = "0" + (date.getHours()-2) + ":" + parsedBeginDate.split(":")[1];
                else
                    parsedBeginDate = (date.getHours()-2) + ":" + parsedBeginDate.split(":")[1];

                if (filterdShifts[i][0].shiftName + date.toString() + parsedBeginDate === this.state.shiftFilter) {
                    selectedShiftIndex = i;
                    break;
                }
            }


            if (selectedShiftIndex !== -1) {
                let shiftsPerPost : ShiftInterface[][] = this.sortShiftsperPost(filterdShifts[selectedShiftIndex]);
                let posts : PostInterface[] = [];
                let users : UserInterface[][] = [];
                let items : string[][] = [];
                for (let i = 0; i < shiftsPerPost.length; ++i) {
                    //search the current posts
                    for (let j = 0; j < filteredPosts.length; ++j) {
                        if (filteredPosts[j].id === shiftsPerPost[i][0].post_id) {
                            posts.push(filteredPosts[j]);
                            break;
                        }
                    }
                    //search all the users && items
                    let tempUsers : UserInterface[] = [];
                    let tempItems : string[] = [];
                    for (let j = 0; j < shiftsPerPost[i].length; ++j) {
                        //search the user
                        for (let k = 0; k < this.props.users.length; ++k) {
                            if (shiftsPerPost[i][j].User_id === this.props.users[k].id) {
                                tempUsers.push(this.props.users[k]);
                                break;
                            }
                        } 
                        //search the item
                        for (let k = 0; k < this.props.items.length; ++k) {
                            if (shiftsPerPost[i][j].id === this.props.items[k].shiftId) {
                                tempItems.push(this.props.items[k].itemType);
                                break;
                            }
                        } 
                    }

                    if (tempItems.length === 0)
                        tempItems.push("Geen items op deze post");

                    users.push(tempUsers);
                    items.push(tempItems);
                }


                for (let i = 0; i < posts.length; ++i) {
                    postsUi.push(
                        <Post postName={posts[i].title} items={items[i]} users={users[i]} />
                    );
                }
            }

        }

        console.log(postsUi);

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

    /**
     * function that sorts props.planning of shifts on ShiftId
     */
    sortPlanningPerShift() : ShiftInterface[][] {
        let returnArray : ShiftInterface[][]  = [];

        for ( let i = 0; i < this.props.planning.length; ++i) {
            let currentShift : ShiftInterface = this.props.planning[i];
            let inside: boolean = false;
            for (let j = 0; j < returnArray.length; ++j) {
                if (currentShift.shiftId === returnArray[j][0].shiftId) {
                    returnArray[j].push(currentShift);
                    inside = true;
                    break;
                }
            }
            if (! inside) {
                returnArray.push([currentShift]);
            }
        }
        return returnArray;
    }

    /**
     * function that sorts the given array of shifts on postId
     */
    sortShiftsperPost(shifts: ShiftInterface[]) : ShiftInterface[][] {
        let returnArray : ShiftInterface[][]  = [];
        for (let i = 0; i < shifts.length; ++i) {
            let currentShift = shifts[i];
            let inside: boolean = false;
            for (let j = 0; j < returnArray.length; ++j) {
                if (currentShift.post_id === returnArray[j][0].post_id) {
                    returnArray[j].push(currentShift);
                    inside = true;
                    break;
                }
            }
            if (! inside) {
                returnArray.push([currentShift]);
            }
        }
        return returnArray;
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