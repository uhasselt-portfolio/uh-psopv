import React, {Component} from 'react';
import {Grid, Paper} from '@material-ui/core';

const paperStyle = {
    margin: '10px',
    padding: '10px',
    background: 'rgb(242,242,250)'
}
const LeftPartStyle = {
    width: '70%'
}
interface IProps {
    title: string,
    content: string
}

/**
 * @author Wouter Grootjans
 */
class Notification extends Component<IProps> {
    render() {
        return (
            <Paper style={paperStyle}>
                <Grid container direction="row">
                    <Grid container direction="column" style={LeftPartStyle}>
                        <Grid item>
                            <h3>{this.props.title}</h3>
                        </Grid>
                        <Grid item>
                            <p>{this.props.content}</p>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default Notification;
