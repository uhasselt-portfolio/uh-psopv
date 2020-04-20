import React, {Component, } from 'react';
import {Container, Paper, Grid, Button} from '@material-ui/core';
import ProblemInterface from '../interfaces/ProblemDataInterface';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {problemSolved} from './ComponentActions';
import { AppState } from '../Redux/store';
import {Redirect} from 'react-router-dom';

interface IState {
    Data: ProblemInterface,
    Redirecting: boolean
}

const paperStyle = {
    background: 'rgb(242,242,250)',
    padding: '10px',
    margin: '20px',
    borderRadius: '50px',
}
const ButtonStyle = {
    background: 'rgb(3,57,108)',
    color: 'white',
}


type Props = LinkDispatchToProps & ProblemInterface & LinkStateToProps;

class Problem extends Component<Props> {
    state: IState = {
        Data: {
            problemType: "",
            priority: 0,
            discription: "",
            timeStamp: "",
            shiftName: "",
            post: "",
            user: "",
            postId: -1,
            sender: "",
            latitude: 0,
            longitude: 0,
            solved: false,
            id: -1
        },
        Redirecting: false
    }

    componentDidMount() {
        this.setState({
            Data: {
                problemType: this.props.problemType,
                priority: this.props.priority,
                discription: this.props.discription,
                timeStamp: this.props.timeStamp,
                shiftName: this.props.shiftName,
                post: this.props.post,
                user: this.props.user,
                sender: this.props.sender,
                latitude: this.props.latitude,
                longitude: this.props.longitude,
                solved: this.props.solved,
                id: this.props.id
            }
        });
    } 

    handleSolved = () => {
        this.props.problemSolved(this.state.Data.id);
    }

    handleRedirectButton = () => {
        this.setState({
            ...this.state,
            Redirecting: true
        })
    }

    render() {
        if (this.state.Redirecting)
            return (
                <Redirect to={{
                    pathname: '/Data/Problem',
                    state: this.state.Data
                }}/>
            );
        let dataSplit : string[] =  this.props.timeStamp.split("T");
        let yearSplit : string[] = dataSplit[0].split("-");
        let hourSplit : string[] = dataSplit[1].split(".");
        let parsedDate : string = yearSplit[2] + "/" + yearSplit[1] + "/" + yearSplit[0];
        parsedDate += " " + hourSplit[0];

        return(
            <Container>
                <Paper style={paperStyle}>
                    <Grid container justify="center" direction="column">
                        <Grid container justify="center" direction="row">
                            <h4>{this.state.Data.problemType}</h4>
                        </Grid>
                        <Grid item>
                                <p>{this.state.Data.discription}</p>
                        </Grid>
                        <Grid container direction="row" justify="space-evenly" >
                            <Grid item>
                                <Grid container direction="column">
                                    <Grid item>
                                        <p>Shift: {this.state.Data.shiftName}</p>
                                    </Grid>
                                    <Grid item>
                                        <p>Gaat over: {this.state.Data.user}</p>
                                    </Grid>
                                    <Grid item>
                                        <p>{parsedDate}</p>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container direction="column">
                                    <Grid item>
                                        <p>Post: {this.state.Data.post}</p>
                                    </Grid>
                                    <Grid item>
                                        <p>Gemeld door: {this.state.Data.sender}</p>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="outlined" onClick={this.handleRedirectButton} style={ButtonStyle}>Ga naar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container justify="center" direction="row">
                            <Button variant="outlined" onClick={this.handleSolved} style={ButtonStyle}>Probleem opgelost</Button>
                        </Grid>
                        {this.props.loading && this.props.isProblemSolvedPosted === false &&
                            <Grid container justify="center" direction="row">
                                <p>Modificatie aan het doorgeven</p>
                            </Grid>}
                        { ! this.props.loading && this.props.errorMessage !== "" && this.props.isProblemSolvedPosted === false &&
                            <Grid container justify="center" direction="row">
                                <p>Er liep iets fout, probeer opnieuw</p>
                            </Grid>
                        }
                        { ! this.props.loading && this.props.errorMessage === "" && this.props.isProblemSolvedPosted === true &&
                            <Grid container justify="center" direction="row">
                                <p>Aanpassing doorgevoerd</p>
                            </Grid>
                        }
                    </Grid>
                </Paper>
            </Container>
        );
    }
}

interface LinkStateToProps {
    loading: boolean,
    errorMessage: String,
    isProblemSolvedPosted: boolean
}
const MapStateToProps = (state : AppState): LinkStateToProps => {
    return {
        loading: state.ComponentReducer.loading,
        errorMessage: state.ComponentReducer.errorMessage,
        isProblemSolvedPosted: state.ComponentReducer.isProblemSolvedPosted
    }
}

interface LinkDispatchToProps {
    problemSolved: (problemId: Number) => any
}
const MapDispatchToProp = (dispatch: any) : LinkDispatchToProps => {
    return bindActionCreators({
        problemSolved
    },dispatch);
}


export default connect(
    MapStateToProps,
    MapDispatchToProp
)(Problem);