import React, {Component} from 'react';
import {Grid, Button} from '@material-ui/core';
import ItemInterface from '../Interfaces/ItemDataInterface';

const style= {
    border: 'solid 1px black',
    margin: '2px 2px 2px 2px',
    padding: '4px'
}

interface IProps {
    name: string
}

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