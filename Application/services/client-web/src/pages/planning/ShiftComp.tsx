import React, {Component} from 'react';
import {Grid, Paper, Button} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ShiftElement from './ShiftElementComp';
import ItemInterface from '../../interfaces/ItemDataInterface';

const labelStyle = {
    padding: '0 10px 0 0'
}
const paperStyle = {
    background: 'rgb(240, 255, 255)',
    padding: '10px',
    margin: '10px'
}

interface job {
    postId: Number,
    post: string,
    userId: Number,
    user: string,
    shiftId: Number,
    items: ItemInterface[]
}

interface IProps {
    shiftname: string,
    begindate: string,
    enddate: string,
    jobs: job[]
}

interface IState {
    dropdwon: boolean
}

/**
 * @author Wouter Grootjans
 */
class Shift extends Component<IProps> {
    state: IState = {
        dropdwon : false
    }

    /**
     * updates the state to dipslay or hide the dropdown
     */
    handleButton = () => {
        this.setState({
            dropdwon: ! this.state.dropdwon
        })
    }

    render() {

        let list : Array<JSX.Element> = this.props.jobs.sort((x,y) => x.postId.valueOf() - y.postId.valueOf()).map(x => (
            <ShiftElement post={x.post} postId={x.postId} user={x.user} userId={x.userId} shiftId={x.shiftId} items={x.items}/>
        ));
            
        return(
                <Paper style={paperStyle}>
                    <Grid container justify="flex-start">
                        <Grid item style={labelStyle}>
                            <p>{this.props.shiftname}</p>
                        </Grid>
                        <Grid item style={labelStyle}>
                            <p>strarts om: {this.props.begindate}</p>
                        </Grid>
                        <Grid item style={labelStyle}>
                            <p>eindigd om: {this.props.enddate}</p>
                        </Grid>
                        <Grid item style={labelStyle}> 
                            { ! this.state.dropdwon && <Button variant="contained" startIcon={<ArrowDropDownIcon />} onClick={this.handleButton}>Shift inhoud</Button>}
                            {this.state.dropdwon && <Button variant="contained" startIcon={<ArrowDropUpIcon />} onClick={this.handleButton}>Shift inhoud</Button>}
                        </Grid>
                        <Grid container justify="center">
                            {this.state.dropdwon && list}
                        </Grid>
                    </Grid>
                </Paper>
        );
    }
}

export default Shift;