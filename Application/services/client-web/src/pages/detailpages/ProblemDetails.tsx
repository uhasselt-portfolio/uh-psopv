import React, {Component} from 'react';
import {Grid, Button, TextField} from '@material-ui/core';
import ProblemInterface from '../../interfaces/ProblemDataInterface';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {problemSolved} from './DetailActions';
import MyMap from '../map/Map';

const styleBorder = {
    width: '40%',
    height: '100%',
    padding: '5px',
} 
const styleMap = {
    height: '600px',
    width: '60%'
}
const ButtonStyle = {
    background: 'rgb(3,57,108)',
    color: 'white',
    margin: '4px'
}

interface IProps {
    location : {
        state: ProblemInterface
    }
}

interface IState {
    editing: boolean
}

type props = LinkDispatchToProps & IProps;

class ProblemDetails extends Component<props> {
    state : IState = {
        editing: false
    }

    /**
     * updates the database that the problems has been solved
     */
    handleSolvedButton = () => {
        this.props.problemSolved(this.props.location.state.id);
    }

    DisplauEditingField = () =>{ //TODO
        this.setState({
            editing: true
        });
    }

    handleEditSave = () => { //TODO
        this.setState({
            editing: false
        });
    }

    render() {

        return(
            <div>
                <Grid container>
                    <Grid container justify="center" direction="column" style={styleBorder}>
                        <Grid container justify="center">
                            <Grid item>
                                    <h4>{this.props.location.state.problemType}</h4>
                            </Grid>  
                        </Grid>
                        <Grid container justify="center">
                            <Grid item>
                                <p>{this.props.location.state.discription}</p>
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                        </Grid>
                        <Grid container justify="center">
                            <Grid item>
                                <p>tijdstip: { new Date(this.props.location.state.timeStamp).toLocaleString()}</p>
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                            <Grid item>
                                <p>post: {this.props.location.state.post}</p>
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                            <Grid item>
                                <p>gaat over: {this.props.location.state.user}</p>
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                            <Grid item>
                                <p>melder: {this.props.location.state.sender}</p>
                            </Grid>
                        </Grid>
                        {
                            ! this.state.editing && 
                            <Grid container justify="center">
                                <Button variant="outlined" style={ButtonStyle} onClick={this.DisplauEditingField}>Voeg een notitie toe</Button>
                            </Grid>
                        }
                        { 
                            this.state.editing &&
                            <Grid container justify="center">
                                <Grid item>
                                    <TextField variant="outlined" placeholder="notitie" id="receiver"/>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" style={ButtonStyle} onClick={this.handleEditSave}>Voeg toe</Button>
                                </Grid>
                            </Grid>
                        }
                        <Grid container justify="center">
                            <Grid item>
                                <Button variant="outlined" onClick={this.handleSolvedButton} style={ButtonStyle}>Solved</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item style={styleMap}>
                        {<MyMap problems={[[this.props.location.state]]} height={80} users={[]} posts={[]} isMarkerClickable={false}/>}
                    </Grid>
                </Grid>
            </div> 
            );
    }
}

interface LinkDispatchToProps {
    problemSolved: (ProblemId: number) => any
}
const MapDispatchToProps = (dispatch: any) : LinkDispatchToProps => {
    return bindActionCreators({
        problemSolved
    },dispatch);
}


export default connect(
    null,
    MapDispatchToProps
)(ProblemDetails);