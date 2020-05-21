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
    padding: '10px',
    background: 'rgb(242,242,250)'
}
const ButtonStyle = {
    background: 'rgb(3,57,108)',
    color: 'white',
}
const LeftPartStyle = {
    width: '70%'
}
const RightPartStyle = {
    width: '30%'
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

    /**
     * gets called after the component is mounted
     * updates the state of the component with the props
     */
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

    /**
     * updates the database that the message has been read
     */
    handleButton = () => {
        this.props.postMessageRead(this.props.id);
    }

    /**
     * renders the component
     */
    render() {
        return (
            <Paper style={paperStyle}>
                <Grid container direction="row">
                    <Grid container direction="column" style={LeftPartStyle}>
                        <Grid item>
                            <h3>{this.state.data.title}</h3>
                        </Grid>
                        <Grid item>
                            <p>{this.state.data.content}</p>
                        </Grid>
                        <Grid item>
                            <h5>{this.state.data.sender}</h5>
                        </Grid>
                    </Grid>
                    <Grid container direction="column" justify="flex-end" style={RightPartStyle}>
                        <Grid container direction="row" justify="flex-end">
                            <Button variant="outlined" onClick={this.handleButton} style={ButtonStyle}>Gelezen</Button>
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
