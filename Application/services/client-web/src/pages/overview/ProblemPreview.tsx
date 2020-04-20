import React, {Component} from 'react';
import {Paper,Grid, Button} from '@material-ui/core';
import ProblemDataInterface from '../../interfaces/ProblemDataInterface';
import {Redirect} from 'react-router-dom';

const PaperStyle = {
    margin: '10px',
    padding: '4px',
    // background: 'rgb(250,250,250)'
    background: 'rgb(242,242,250)'
}
const ButtonStyle = {
    background: 'rgb(3,57,108)',
    color: 'white',
}

interface IState {
    redirecting: boolean
}

class ProblemPreview extends Component<ProblemDataInterface> {
    state: IState = {
        redirecting: false
    }

    handleLink = () => {
        this.setState({
            redirecting: true
        });
    }

    render() {

        if (this.state.redirecting) {
            return (
                <Redirect to={{
                    pathname: '/Data/Problem',
                    state: this.props
                }}/>
            );
        }
        return(
            <Paper style={PaperStyle}>
                <Grid container direction="column">
                    <Grid container direction="row" justify="space-between">
                        <Grid item>
                            <h5>{this.props.post}</h5>
                        </Grid>
                        <Grid item>
                            <p>{this.props.timeStamp}</p>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="space-between">
                        <Grid item>
                            <p>{this.props.discription}</p>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" onClick={this.handleLink} style={ButtonStyle}>details</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default ProblemPreview