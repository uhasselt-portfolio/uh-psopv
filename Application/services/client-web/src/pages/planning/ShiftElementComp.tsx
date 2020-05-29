import React, {Component} from 'react';
import {Grid, Button} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ItemInterface from '../../interfaces/ItemDataInterface';
import Item from './ItemComp';

const style= {
    border: 'solid 1px black',
    margin: '2px 2px 2px 2px',
    padding: '4px'
}

interface IProps {
    postId: Number,
    post: string,
    userId: Number,
    user: string,
    shiftId: Number,
    items: ItemInterface[]
}

interface IState {
    dropdown: boolean
}

class ShiftElement extends Component<IProps> {
    state : IState = {
        dropdown: false
    }

    handleDropButton = () => {
        this.setState({
            dropdown: ! this.state.dropdown
        })
    }

    render() {
        let list : Array<JSX.Element> = this.props.items.map(x => (
            <Item name={x.itemType}/>
        ));

        return(
            <Grid container justify="space-evenly" style={style}>
                    <Grid item>
                        <p>post: {this.props.post}</p>
                    </Grid>
                    <Grid item> 
                            { ! this.state.dropdown && <Button variant="contained" startIcon={<ArrowDropDownIcon />} onClick={this.handleDropButton}>Items</Button>}
                            {this.state.dropdown && <Button variant="contained" startIcon={<ArrowDropUpIcon />} onClick={this.handleDropButton}>Items</Button>}
                        </Grid>
                    <Grid container justify="center">
                        {this.state.dropdown && list}
                    </Grid>
            </Grid>
        );
    }
}


export default ShiftElement;