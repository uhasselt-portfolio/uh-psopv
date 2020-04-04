import React, {Component} from 'react';
import {Container, Paper, Grid} from '@material-ui/core';
import ProblemInterface from './Interfaces/problemInterface';

interface ProblemState {
    Data: ProblemInterface
}

const paperStyle = {
    background: 'rgb(240, 255, 255)',
    padding: '10px',
    margin: '10px'
}
const labelStyle = {
    padding: '0 10px 0 0'
}

class Problem extends Component<ProblemInterface, ProblemState> {
    state: ProblemState = {
        Data: {
            ProblemType: "",
            Priority: 0,
            Discription: "",
            TimeStamp: "",
            ShiftName: "",
            Post: "",
            User: "",
            Sender: ""
        }
    }

    componentDidMount() {
        this.setState({
            Data: this.props
        });
    } 

    render() {

        return(
            <Container>
                <Paper style={paperStyle}>
                    <Grid container justify="center">
                        <Grid item>
                            <h4 className="center">{this.state.Data.ProblemType}</h4>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item>
                            <p>{this.state.Data.Discription}</p>
                        </Grid>
                    </Grid>
                    <Grid container justify="space-evenly">
                        <Grid item style={labelStyle}>
                            <p className="col">Shift: {this.state.Data.ShiftName}</p>
                        </Grid>
                        <Grid item style={labelStyle}>
                        <p>Post: {this.state.Data.Post}</p>
                        </Grid>
                    </Grid>
                    <Grid container justify="space-evenly">
                        <Grid item style={labelStyle}>
                            <p>Gaat over: {this.state.Data.User}</p>
                        </Grid>
                        <Grid item style={labelStyle}>
                            <p>Gemeld door: {this.state.Data.Sender}</p>
                        </Grid>
                        <Grid container>
                            <Grid item style={labelStyle}>
                                <p className="col">{this.state.Data.TimeStamp}</p>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        );
    }
}

export default Problem;