import React, {Component} from 'react';
import MessageInterface from '../../interfaces/MessageDataInterface';
import {Grid, Paper, Button, ListItem} from '@material-ui/core';
import {connect} from 'react-redux'
import {postMessageRead} from './OverviewAction'
import {bindActionCreators} from 'redux';
import { spacing } from '@material-ui/system';


interface IState {
    data: MessageInterface
}

const PaperStyle = {
    margin: '10px',
    background: '#eee'
}

const ButtonStyle = {
    background: 'rgb(3,57,108)',
    color: 'white',
    margin: '5px'
}
const LeftPartStyle = {
    width: '70%'
}
const RightPartStyle = {
    width: '30%'
}
const noPadding = {
    padding: '0',
    margin: '0'
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
            <Paper style={PaperStyle}>
            <ListItem button divider onClick={this.handleButton}>
                <Grid container direction="row">         
                        <Grid item xs={8} justify="flex-start" alignItems="flex-start"><strong>{this.state.data.sender}</strong></Grid>
                        <Grid container xs={4} justify="flex-end" alignContent="flex-start">
                            {this.state.data.sender}
                            {/* <Button variant="outlined" onClick={this.handleLink} style={ButtonStyle}>details</Button> */}
                        </Grid>
                  
                        <Grid item xs={10} justify="flex-start" alignItems="flex-start"><strong>{this.state.data.title}: </strong> {this.state.data.content}</Grid>
                        <Grid container xs={2} justify="flex-end" alignContent="flex-start">
                        <Button variant="outlined" onClick={this.handleButton} style={ButtonStyle}>Gelezen</Button>
                            {/* <Button variant="outlined" onClick={this.handleLink} style={ButtonStyle}>details</Button> */}
                        </Grid>
                    
                </Grid>
            </ListItem>
            </Paper>
            
            // <Paper style={paperStyle}>
            //     <Grid container direction="row">
            //         <Grid container direction="column" style={LeftPartStyle}>
            //             <Grid item>
            //                 <h3>{this.state.data.title}</h3>
            //             </Grid>
            //             <Grid item>
            //                 <p>{this.state.data.content}</p>
            //             </Grid>
            //             <Grid item>
            //                 <h5>{this.state.data.sender}</h5>
            //             </Grid>
            //         </Grid>
            //         <Grid container direction="column" justify="flex-end" style={RightPartStyle}>
            //             <Grid container direction="row" justify="flex-end">
            //                 <Button variant="outlined" onClick={this.handleButton} style={ButtonStyle}>Gelezen</Button>
            //             </Grid>
            //         </Grid>
            //     </Grid>
            // </Paper>
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
