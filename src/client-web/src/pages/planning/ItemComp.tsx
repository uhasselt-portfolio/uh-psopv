import React, {Component} from 'react';
import {Grid} from '@material-ui/core';

const style= {
    border: 'solid 1px black',
    margin: '2px 2px 2px 2px',
    padding: '4px'
}

interface IProps {
    name: string
}

/**
 * @author Wouter Grootjans
 */
class Item extends Component<IProps> {


        render() {
        return(
            <Grid container justify="space-evenly" style={style}>
                    <Grid item>
                        <p>{this.props.name}</p>
                    </Grid>
            </Grid>
        );
    }
}

export default Item;