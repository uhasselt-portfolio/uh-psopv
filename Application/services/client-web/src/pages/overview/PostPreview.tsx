import React, {Component} from 'react';
import {Paper, Grid, IconButton} from '@material-ui/core';
import PostDataInterface from '../../interfaces/PostDataInterface';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {Redirect} from 'react-router-dom';
import {AppState} from '../../Redux/store';
import {connect} from 'react-redux';
import userDataInterface from '../../interfaces/UserDataInterface';
import ShiftDataInterface from '../../interfaces/ShiftDataInterface';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import {formatTime, formatDate} from '../../Components/date_formatter';

import './ProblemPreview.css'

const PaperStyle = {
    margin: '10px',
    padding: '10px',
    background: '#eee'
}
const LeftColumnStyle = {
    width: '70%'
}
const RightColumnStyle = {
    width: '30%'
}

const flexHorizontal = {
    display: 'flex'
}


interface IState {
    redirecting: boolean,
    currentShift: number,
    anchorEl: null | HTMLElement,
}

type Props = LinkStateToProps & PostDataInterface;

class PostPreview extends Component<Props> {
    state: IState = {
        redirecting: false,
        currentShift: 0,
        anchorEl: null,
    }

    /**
     * sets the state to redirect to the specific post
     */
    handleLink = () => {
        this.setState({
            ...this.state,
            redirecting: true
        })
    }

    /**
     * show the nex shift from the one show
     */
    handleNextShift = () => {
        if (this.state.currentShift < this.props.planning.length - 1)
            this.setState({
                ...this.state,
                currentShift: this.state.currentShift + 1
            })
    }
    /**
     * show the previous shift from the one show
     */
    handleShiftprev = () => {
        if (this.state.currentShift > 0)
        this.setState({
            ...this.state,
            currentShift: this.state.currentShift - 1
        })
    }

    /**
     * renders the component
     */
    render() {
        if (this.state.redirecting) {
            return (
                <Redirect to={{
                    pathname: '/Data/Post',
                    state: {
                        id: this.props.id,
                        title: this.props.title,
                        addres: this.props.addres,
                        sector: this.props.sector,
                        general: this.props.general,
                        latitude: this.props.latitude,
                        longitude: this.props.longitude,
                        shifts: this.props.shifts,
                        users: this.props.users,
                        activeProblem: this.props.activeProblem
                    }
                }}/>
            );
        }

        let parsedDate : string = 'geen shiften op deze post';
        let this_users : string = "";

        if (this.props.planning.length > 0) {
            let date: Date = new Date(this.props.planning[this.state.currentShift].beginDate);
            let tempDate : string = formatDate(date.toString());
            let startTime : string =  formatTime(date.toString());
            let enddate: Date = new Date(this.props.planning[this.state.currentShift].endDate);
            let endTime : string = formatTime(enddate.toString());
            parsedDate = tempDate + " " + startTime + " tot " + endTime;
        }

        return(
            <Paper style={PaperStyle} elevation={5}>
                <Grid container direction="column">
                    <Grid container direction="row">
                        <Grid container direction="column" style={LeftColumnStyle} xs={10}> 
                            <Grid item>
                                <p><strong>{this.props.title}: </strong>{this.props.addres}</p>                                
                            </Grid>
                            <Grid container>
                                <div className="flexVertical">
                                    <div style={flexHorizontal}>
                                    <IconButton onClick={this.handleShiftprev}>
                                            <ArrowLeftIcon />
                                    </IconButton>
                                    <p>{parsedDate}</p>
                                    <IconButton onClick={this.handleNextShift}>
                                            <ArrowRightIcon />
                                    </IconButton>
                                    </div>
                                    <div className="center">{this_users}</div>      
                                </div>
                                                          
                            </Grid>
                        </Grid>
                        <Grid container direction="column" justify="space-around" style={RightColumnStyle} xs={2}>
                            <Grid>
                            <p>Sector: {this.props.sector}</p>
                            </Grid>
                            <Grid container direction="row" justify="center">
                                {this.props.hasProblem && <ReportProblemOutlinedIcon fontSize="large" style={{color: 'red'}}/>}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

interface LinkStateToProps {
    workingUsers: userDataInterface[][],
    planning: ShiftDataInterface[],
    hasProblem: boolean
};
const MapStateToProps = (state : AppState, ownProps: PostDataInterface): LinkStateToProps => {
    let shifts: ShiftDataInterface[] = [];
    for (let i = 0 ; i < ownProps.shifts.length; ++i) {
        let shift : ShiftDataInterface[] = state.OverviewReducer.planning.filter(shift => shift.shiftId === ownProps.shifts[i]);
        shifts.push(shift[0]);
    }

    let users: userDataInterface[][] = [];
    for (let i = 0; i < ownProps.users.length; ++i) {
        let subUsers: userDataInterface[] = [];
        for (let j = 0; j < ownProps.users[i].length; ++j) {
            let user : userDataInterface[] = state.OverviewReducer.users.filter(user => user.id === ownProps.users[i][j]);
            subUsers.push(user[0]);
        }
        users.push(subUsers);
    }

    let hasproblem: boolean = false;
    for (let i = 0; i < state.OverviewReducer.problems.length; ++i) {
        if (state.OverviewReducer.problems[i].postId === ownProps.id) {
            hasproblem = true;
            break;
        }
    }

    return {
        workingUsers: users,
        planning: shifts,
        hasProblem: hasproblem
    }
}

export default connect(
    MapStateToProps
)(PostPreview);