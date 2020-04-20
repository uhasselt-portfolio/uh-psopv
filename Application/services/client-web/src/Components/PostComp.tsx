import React, {Component} from 'react';
import PostInterface from '../interfaces/PostDataInterface';
import {Container,Paper,Grid, Button } from '@material-ui/core';
import {Redirect} from 'react-router-dom';

interface State {
    data: PostInterface,
    redirecting: boolean
}

const paperStyle = {
    background: 'rgb(242,242,250)',
    padding: '10px',
    margin: '10px'
}
const labelStyle = {
    padding: '0 10px 0 0'
}
const ButtonStyle = {
    background: 'rgb(3,57,108)',
    color: 'white',
}

class Post extends Component<PostInterface> {
    state: State ={
        data: {id: -1, title: "title", addres: "address", sector: -1, general: "general post", latitude: 0, longitude: 0, shifts: [], users: [], activeProblem: false},
        redirecting: false
    }
    constructor(props: PostInterface) {
        super(props);

        this.state = {
            redirecting: false,
            data: {id: props.id, title: props.title, addres: props.addres, sector: props.sector, general: props.general, latitude: props.latitude, longitude: props.longitude, shifts: props.shifts, users: props.users, activeProblem: props.activeProblem}
        }
    }

    handleRedirectButton = () => {
        this.setState({
            ...this.state,
            redirecting: true
        });
    }

    render() {
        if (this.state.redirecting)
        return (
            <Redirect to={{
                pathname: '/Data/Post',
                state: this.state.data
            }}/>
        );
        return(
            <Container>
                <Paper style={paperStyle}>
                    <Grid container justify="center">
                        <Grid item>
                            <h4>{this.state.data.title}</h4>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item style={labelStyle}>
                            <p>adres:</p>
                        </Grid>
                        <Grid item>
                            <p>{this.state.data.addres}</p>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item style={labelStyle}>
                            <p>sector:</p>
                        </Grid>
                        <Grid item>
                            <p>{this.state.data.sector}</p>
                        </Grid>
                    </Grid>
                    <Grid container justify="space-between">
                        <Grid item style={labelStyle}>
                            <p>{this.state.data.general}</p>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" onClick={this.handleRedirectButton} style={ButtonStyle}>Ga naar</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        );
    }
}

export default Post