import React, {Component} from 'react';
import PostInterface from '../Interfaces/PostDataInterface';
import {Container,Paper,Grid } from '@material-ui/core';
import {Link} from 'react-router-dom';

interface State {
    data: PostInterface
}

interface Props {
    postdata: PostInterface
}

const paperStyle = {
    background: 'rgb(240, 255, 255)',
    padding: '10px',
    margin: '10px'
}
const labelStyle = {
    padding: '0 10px 0 0'
}

class Post extends Component<PostInterface, State> {
    state: State ={
        data: {title: "title", addres: "address", sector: -1, general: "general post", latitude: 0, longitude: 0}
    }
    constructor(props: PostInterface) {
        super(props);

        this.state = {
            data: {title: props.title, addres: props.addres, sector: props.sector, general: props.general, latitude: props.latitude, longitude: props.longitude}
        }
    }

    render() {
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
                        <Link to={{
                                    pathname: '/data/Post',
                                    state: this.props
                                }}>Ga naar</Link>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        );
    }
}

export default Post