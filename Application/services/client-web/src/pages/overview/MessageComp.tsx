import React, {Component} from 'react';
import MessageInterface from '../../interfaces/MessageDataInterface';
import {Grid, Paper, Button} from '@material-ui/core';
import {connect} from 'react-redux'
import {postMessageRead} from './OverviewAction'
import {bindActionCreators} from 'redux';

interface IState {
    data: MessageInterface
}

const paperStyle = {
    margin: '10px',
    padding: '4px',
    background: 'rgb(242,242,250)'
}
const ButtonStyle = {
    background: 'rgb(3,57,108)',
    color: 'white',
}

type Props = LinkDispatchToProps & MessageInterface;

class Message extends Component<Props> {
    state: IState = {
        data: {
            id: -1,
            title: "titel",
            sender: "verstuurder",
            content: "bericht",
            read: false
        }
    }

    componentDidMount() {
        this.setState({
            data: {
                id: this.props.id,
                title: this.props.title,
                sender: this.props.sender,
                content: this.props.content,
                read: false
            }
        })
    }

    handleButton = () => {
        this.props.postMessageRead(this.props.id);
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
                        <Grid container justify="space-between">
                            <Grid item>
                                <Button variant="outlined" onClick={this.handleButton} style={ButtonStyle}>Gelezen</Button>
                            </Grid>
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

interface LinkDispatchToProps {
    postMessageRead: (messageId: Number) => any
}

function MapDispatchToProps(dispatch: any) : LinkDispatchToProps {
    return bindActionCreators({
        postMessageRead
    }, dispatch);
}

// export default Overview
export default connect(
    null,
    MapDispatchToProps
)(Message);
