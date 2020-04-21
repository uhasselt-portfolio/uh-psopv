import React, {Component} from 'react';
import {Paper,Grid, Button} from '@material-ui/core';
import ProblemDataInterface from '../../interfaces/ProblemDataInterface';
import {Redirect} from 'react-router-dom';

const PaperStyle = {
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

        let date: Date = new Date(this.props.timeStamp);
        let parsedDate: string = date.toLocaleString();

        return(
            <Paper style={PaperStyle}>
                <Grid container direction="row">
                    <Grid container direction="column" style={LeftPartStyle}>
                        <Grid item>
                            <h3>{this.props.problemType}</h3>
                        </Grid>
                        <Grid item>
                            <p>{this.props.discription}</p>
                        </Grid>
                    </Grid>
                    <Grid container direction="column" style={RightPartStyle} justify="space-between">
                        <Grid container direction="row" justify="flex-end">
                            <Grid item>
                                <p>{parsedDate}</p>
                            </Grid>
                        </Grid>
                        <Grid container direction="row" justify="flex-end">
                            <Grid item>
                                <Button variant="outlined" onClick={this.handleLink} style={ButtonStyle}>details</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default ProblemPreview