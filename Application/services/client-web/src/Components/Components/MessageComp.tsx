import React, {Component} from 'react';
import MessageInterface from '../Interfaces/MessageDataInterface';
import {Grid, Paper, Button} from '@material-ui/core';
import {Dispatch} from 'redux';
import {ActionMessageRead} from '../../Redux/Actions';
import {Actions} from '../../Redux/Reducers';
import {connect} from 'react-redux'

interface IState {
    data: MessageInterface
}

const paperStyle = {
    background: 'rgb(240, 255, 255)',
    padding: '10px',
    margin: '10px'
}

type Props = LinkDispatchProps & MessageInterface;

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
        this.props.messageRead(this.props.id);
    }

    render() {
        console.log(this.props);
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
                                <Button variant="outlined" onClick={this.handleButton}>Gelezen</Button>
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

interface LinkDispatchProps {
    messageRead: (messageId: Number) => void
}

const MapDispatchToProps = (
    dispatch: Dispatch<Actions>,
    // ownProps: OwnProps
): LinkDispatchProps => {
    return {
        messageRead: (messageId: Number) => {dispatch(ActionMessageRead(messageId))}
    };
}

// export default Overview
export default connect(
    null,
    MapDispatchToProps
)(Message);
