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

    filterShift = () : Array<JSX.Element> => {


        return (
            [<Post postName="post2" items={['item1','item2','item3']} users={[]} />]
        )
    }

    render () {      
        let shiftUi : Array<JSX.Element> = this.filter();

        let posts : Array<JSX.Element> = [
            <Post postName="post1" items={['item1','item2','item3']} users={[
                {id:1, name: "naam2", lastname:"lastname2", gsmNumber:"gsmnummer2", email:"email2", has_internet:false, permission: 1, latitude: 50, longitude: 0 },
                {id:2, name: "John", lastname:"verbrugen", gsmNumber:"0478536954", email:"john.verbrugen@hotmail.com", has_internet: true, permission:  0, association:"scouts Kiewit", latitude: 50, longitude: 0},
                {id:3, name: "Marie", lastname:"Torfs", gsmNumber:"0475636984", email:"Marie.Torfs@gmail.Com", has_internet: true, permission:  0, association:"scouts Kiewit", latitude: 50, longitude: 0},
                {id:4, name: "Arno", lastname:"Timmermans", gsmNumber:"0475633215", email:"TimmermansArno@gmail.com", has_internet: true, permission:  0, association:"scouts Kiewit", latitude: 50, longitude: 0},
            ]} />,
            <Post postName="post2" items={['item1','item2','item3']} users={[]} />,
            <Post postName="post2" items={['item1','item2','item3']} users={[]} />,
            <Post postName="post2" items={['item1','item2','item3']} users={[]} />,
            <Post postName="post2" items={['item1','item2','item3']} users={[]} />,
            <Post postName="post2" items={['item1','item2','item3']} users={[]} />,
            <Post postName="post2" items={['item1','item2','item3']} users={[]} />,
            <Post postName="post2" items={['item1','item2','item3']} users={[]} />,
            <Post postName="post2" items={['item1','item2','item3']} users={[]} />,
            <Post postName="post2" items={['item1','item2','item3']} users={[]} />,
            <Post postName="post2" items={['item1','item2','item3']} users={[]} />,
            <Post postName="post2" items={['item1','item2','item3']} users={[]} />,
            <Post postName="post2" items={['item1','item2','item3']} users={[]} />,
            <Post postName="post2" items={['item1','item2','item3']} users={[]} />,
            <Post postName="post2" items={['item1','item2','item3']} users={[]} />,
            <Post postName="post2" items={['item1','item2','item3']} users={[]} />,
        ];

        let ids: Number[];
        let visited : string[][] = [];
        function onlyUnique(value : ShiftInterface, index: Number, self: ShiftInterface[]) : boolean { 
            let ownValue : string[] = [value.beginDate, value.endDate];
            for (let i = 0; i < visited.length; ++i) {
                if (value.beginDate === visited[i][0] && value.endDate === visited[i][1])
                    return false
            }
            visited.push(ownValue);
            return true;

            // if (ids.includes(value.shiftName))
            //     return false;
            // ids.push(value.shiftId);
            // return true;
        }
        let uniqueShifts : ShiftInterface[] = this.props.shifts.filter(onlyUnique);

        let shiftChoices : Array<JSX.Element> = uniqueShifts.map( x => {
            let splitDate : string[] = x.beginDate.split("T");
            let yearSplit : string[] = splitDate[0].split("-");
            let year : string = yearSplit[2] + "/" +  yearSplit[1] + "/" + yearSplit[0];
            let starthour : string = splitDate[1].split(".")[0];
            let endhour : string = x.endDate.split("T")[1].split(".")[0];
            let time : string = year + " " + starthour + " - " + endhour 
            return (
                <MenuItem value="Shift1"> {x.shiftName + " "} {time}</MenuItem>
            );
        });

        let uniqueid: Number[] = uniqueShifts.map(x => x.shiftId);

        let posts2: Array<JSX.Element> = [];

        for (let i = 0; i < uniqueid.length ; ++i) {
            let shifts: ShiftInterface[] = this.props.shifts.filter(shift => shift.shiftId === uniqueid[i]);
            let items: string[] = [];
            for (let j = 0; j < shifts.length; ++j) {
                let temp : ItemInterface[] = this.props.items.filter(item => item.shiftId === shifts[j].id);
                for (let k = 0; k < temp.length; ++k)
                    items.push(temp[k].itemType);
            }
        }

        // let filteredPosts : Array<JSX.Element> = uniqueid.map(x => {
        //     let shifts : ShiftInterface[] =  this.props.shifts.filter(shift => shift.shiftId === x);
        //     let posts: PostInterface[] = [];
        //     let items: string[] = [];
        //     for (let i = 0; i < shifts.length; ++i) {
        //         posts.push(this.props.posts.filter(post => post.id === shifts[i].post_id)[0]);
        //         let tempitems : ItemInterface[] = this.props.items.filter(item => item.shiftId === shifts[i].id);
        //         for (let j = 0; j < tempitems.length; ++j)
        //             items.push(tempitems[j].itemType);
        //     }
        //     let users : UserInterface[] = this.props.
        //     return (
        //         <Post postName="post2" items={items} users={[]} />
        //     );
        // });

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
                                <MenuItem value="All shifts">Alle shiften</MenuItem>
                                {shiftChoices}
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid item> 
                        {posts}
                        {/* {shiftUi.length > 0 && shiftUi}
                        {shiftUi.length === 0 && <p>Nog geen shiften aanwezig</p>} */}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

interface LinkStateProps {
    shifts: ShiftInterface[],
    posts: PostInterface[],
    items: ItemInterface[],
    users: UserInterface[]
}
const MapStateToProps = (state : AppState): LinkStateProps => {
    return {
        shifts: state.PlanningReducer.planning,
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