import React, {Component} from 'react';
import {Paper,Grid, Button, ListItem} from '@material-ui/core';
import ProblemDataInterface from '../../interfaces/ProblemDataInterface';
import {Redirect} from 'react-router-dom';
import './ProblemPreview.css'

const PaperStyle = {
    margin: '10px',
    background: '#eee'
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
            <ListItem button divider onClick={this.handleLink}>
                <Grid container direction="row">                
                    <Grid item xs={8} justify="flex-start" alignItems="flex-start"><strong>{this.props.problemType}</strong>: {this.props.discription}</Grid>
                    <Grid container xs={4} justify="flex-end" alignContent="flex-start">
                        {parsedDate}
                        {/* <Button variant="outlined" onClick={this.handleLink} style={ButtonStyle}>details</Button> */}
                    </Grid>
                </Grid>
            </ListItem>
            </Paper>
            
           
        )
    }
}

export default ProblemPreview