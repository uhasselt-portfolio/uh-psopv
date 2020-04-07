import React, {Component} from 'react';
import MessageInterface from './Interfaces/messageInterface';
import {Grid, Paper} from '@material-ui/core';

interface IState {
    data: MessageInterface
}

const paperStyle = {
    background: 'rgb(240, 255, 255)',
    padding: '10px',
    margin: '10px'
}

class Message extends Component<MessageInterface, IState> {
    state: IState = {
        data: {
            title: "titel",
            sender: "verstuurder",
            content: "bericht"
        }
    }

    componentDidMount() {
        this.setState({
            data: {
                title: this.props.title,
                sender: this.props.sender,
                content: this.props.content
            }
        })
    }

    render() {
        return (
            <Paper style={paperStyle}>
                <Grid container direction="column">
                    <Grid item>
                        <Grid container justify="center">
                            <Grid item>
                                <h5>{this.state.data.title}</h5>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <p>{this.state.data.content}</p>
                    </Grid>
                    <Grid item>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <h6>{this.state.data.sender}</h6>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}


export default Message;