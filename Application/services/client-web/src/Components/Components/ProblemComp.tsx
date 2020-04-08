import React, {Component} from 'react';
import {Container, Paper, Grid, Button} from '@material-ui/core';
import ProblemInterface from '../Interfaces/ProblemDataInterface';
import { Link } from 'react-router-dom';

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
            problemType: "",
            priority: 0,
            discription: "",
            timeStamp: "",
            shiftName: "",
            post: "",
            user: "",
            sender: "",
            latitude: 0,
            longitude: 0
        }
    }

    componentDidMount() {
        this.setState({
            Data: this.props
        });
    } 

    handleButton = () => {

    }

    render() {

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
                                {/* <Button variant="outlined" onClick={this.handleButton}>Ga naar</Button> */}
                                <Link to={{
                                    pathname: '/data/Problem',
                                    state: this.props
                                }}>Ga naar</Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        );
    }
}

export default Problem;