import React, {Component, } from 'react';
import {Container, Paper, Grid, Button} from '@material-ui/core';
import ProblemInterface from '../interfaces/ProblemDataInterface';
import { Link } from 'react-router-dom';
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
    background: 'rgb(240, 255, 255)',
    padding: '10px',
    margin: '10px'
}
const labelStyle = {
    padding: '0 10px 0 0'
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
        return(
            <Container>
                <Paper style={paperStyle}>
                    <Grid container justify="center">
                        <Grid item>
                            <h4 className="center">{this.state.Data.problemType}</h4>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item>
                            <p>{this.state.Data.discription}</p>
                        </Grid>
                    </Grid>
                    <Grid container justify="space-evenly">
                        <Grid item style={labelStyle}>
                            <p className="col">Shift: {this.state.Data.shiftName}</p>
                        </Grid>
                        <Grid item style={labelStyle}>
                        <p>Post: {this.state.Data.post}</p>
                        </Grid>
                    </Grid>
                    <Grid container justify="space-evenly">
                        <Grid item style={labelStyle}>
                            <p>Gaat over: {this.state.Data.user}</p>
                        </Grid>
                        <Grid item style={labelStyle}>
                            <p>Gemeld door: {this.state.Data.sender}</p>
                        </Grid>
                        <Grid container justify="space-between">
                            <Grid item style={labelStyle}>
                                <p className="col">{this.state.Data.timeStamp}</p>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" onClick={this.handleRedirectButton}>Ga naar</Button>
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                            <Grid item>
                                <Button variant="outlined" onClick={this.handleSolved}>Probleem opgelost</Button>
                            </Grid>
                            {this.props.loading && this.props.isProblemSolvedPosted === false &&
                                <Grid item>
                                    <p>Modificatie aan het doorgeven</p>
                                </Grid>}
                            { ! this.props.loading && this.props.errorMessage !== "" && this.props.isProblemSolvedPosted === false &&
                                <Grid item>
                                    <p>Er liep iets fout, probeer opnieuw</p>
                                </Grid>
                            }
                            { ! this.props.loading && this.props.errorMessage === "" && this.props.isProblemSolvedPosted === true &&
                                <Grid item>
                                    <p>Aanpassing doorgevoerd</p>
                                </Grid>
                            }
                        </Grid>
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