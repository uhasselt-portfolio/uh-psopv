import React, {Component} from 'react';
import {Paper, Grid, Button, IconButton, Menu} from '@material-ui/core';
import PostDataInterface from '../../interfaces/PostDataInterface';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {Redirect} from 'react-router-dom';
import {AppState} from '../../Redux/store';
import {connect} from 'react-redux';
import userDataInterface from '../../interfaces/UserDataInterface';
import ShiftDataInterface from '../../interfaces/ShiftDataInterface';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';

const PaperStyle = {
    margin: '10px',
    padding: '4px',
    background: 'rgb(250,250,250)'
}
const LeftColumnStyle = {
    width: '70%'
}
const RightColumnStyle = {
    width: '30%'
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
        currentShift: 0, //TODO how to calculate currentShift,
        anchorEl: null,
    }

    handleLink = () => {
        this.setState({
            ...this.state,
            redirecting: true
        })
    }

    handleNextShift = () => {
        console.log(this.state.currentShift);
        console.log(this.props.planning.length);
        if (this.state.currentShift < this.props.planning.length - 1)
            this.setState({
                ...this.state,
                currentShift: this.state.currentShift + 1
            })
    }
    handleShiftprev = () => {
        if (this.state.currentShift > 0)
        this.setState({
            ...this.state,
            currentShift: this.state.currentShift - 1
        })
    }
    handleShowUsers = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({
            ...this.state,
            anchorEl: event.currentTarget
        });
    }
    handleClose = () => {
        this.setState({
            ...this.state,
            anchorEl: null
        });
    }
    handleUserLink = () => {

    }

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

        let parsedDate : string = this.props.planning[this.state.currentShift].beginDate;
        parsedDate += " tot ";
        parsedDate += this.props.planning[this.state.currentShift].endDate.split(" ")[1];
        let CurrentUsers : Array<JSX.Element> = this.props.workingUsers[this.state.currentShift].map(x => (
            <Paper style={PaperStyle}>
                <h5 onClick={() => this.handleUserLink()}>{x.name + " " + x.lastname}</h5>
            </Paper>
        ));

        return(
            <Paper style={PaperStyle}>
                <Grid container direction="row">
                    <Grid container direction="column" style={LeftColumnStyle}>
                        <Grid item>
                            <h5>{this.props.title} </h5>
                        </Grid>
                        <Grid item>
                            <p>{this.props.addres}</p>
                        </Grid>
                        <Grid container>
                            <Grid item>
                                <IconButton onClick={this.handleShiftprev}>
                                    <ArrowLeftIcon />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <p>{parsedDate}</p>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={this.handleNextShift}>
                                    <ArrowRightIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Button endIcon={<ArrowDropDownIcon />} aria-controls="current-users" aria-haspopup="true" 
                            onClick={this.handleShowUsers}>Vrijwilligers</Button>
                            <Menu
                                id="current-users"
                                anchorEl={this.state.anchorEl}
                                keepMounted
                                open={Boolean(this.state.anchorEl)}
                                onClose={this.handleClose}
                            >
                                {CurrentUsers}

                            </Menu>
                        </Grid>
                    </Grid>
                    <Grid container direction="column" style={RightColumnStyle} justify="space-evenly">
                        <Grid item>
                            <p>Sector: {this.props.sector}</p>
                        </Grid>
                        <Grid item>
                            {this.props.activeProblem && <ReportProblemOutlinedIcon fontSize="large" />}
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" onClick={this.handleLink}>Details</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

interface LinkStateToProps {
    workingUsers: userDataInterface[][],
    planning: ShiftDataInterface[]
};
const MapStateToProps = (state : AppState, ownProps: PostDataInterface): LinkStateToProps => {

    let shifts: ShiftDataInterface[] = [];
    for (let i = 0 ; i < ownProps.shifts.length; ++i) {
        let shift : ShiftDataInterface[] = state.OverviewReducer.planning.filter(shift => shift.id === ownProps.shifts[i]);
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
    return {
        workingUsers: users,
        planning: shifts
    }
}

export default connect(
    MapStateToProps
)(PostPreview);