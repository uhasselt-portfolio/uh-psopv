import React, {Component} from 'react';
import {Paper, Grid, Button} from '@material-ui/core';
import UserDatatInterface from '../../interfaces/UserDataInterface';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const paperStyle = {
    background: 'rgb(242,242,250)',
    padding: '10px',
    margin: '20px',
    borderRadius: '50px',
}
const paperListStyle = {
    background: 'rgb(235,235,250)',
    padding: '10px',
    margin: '5px',
    borderRadius: '20px',
    width: '100%'
}
const ButtonStyle = {
    background: 'rgb(3,57,108)',
    color: 'white',
}

interface IProps {
    postName: string,
    items: string[],
    users: UserDatatInterface[]
}
interface IState {
    dropdownUsers: boolean,
    dropdownItems: boolean
}

class Post extends Component<IProps> {
    state: IState = {
        dropdownUsers: false,
        dropdownItems: false
    }

    /**
     * updates the state to hide or show the users working on this post 
     * hides the items
     */
    handleDropdownUsers = () => {
        this.setState({
            dropdownItems: false,
            dropdownUsers: ! this.state.dropdownUsers
        });
    }
    /**
     * updates the state to hide or show the items
     * hides the users
     */
    handleDropdownItems = () => {
        this.setState({
            dropdownItems: ! this.state.dropdownItems,
            dropdownUsers: false
        });
    }

    render() {

        let UsersUi : Array<JSX.Element> = this.props.users.map(x => (
            <Grid item>
                <Paper style={paperListStyle}>
                    <p>{x.name + " " + x.lastname}</p>
                </Paper>
            </Grid>
        ));

        let ItemsUi : Array<JSX.Element>  = this.props.items.map(x => (
            <Grid item>
                <Paper style={paperListStyle}>
                    <p>{x}</p>
                </Paper>
            </Grid>
        ));

        return(
            <Paper style={paperStyle}>
                <Grid container direction="row" justify="space-evenly">
                    <Grid item>
                        <h5>{this.props.postName}</h5>
                    </Grid>
                    <Grid item>
                        { ! this.state.dropdownUsers && <Button variant="contained" startIcon={<ArrowDropDownIcon />} 
                            onClick={this.handleDropdownUsers} style={ButtonStyle}>Vrijwilligers</Button>}
                        {this.state.dropdownUsers && <Button variant="contained" startIcon={<ArrowDropUpIcon />} 
                            onClick={this.handleDropdownUsers} style={ButtonStyle}>Vrijwilligers</Button>}
                    </Grid>
                    <Grid item>
                        { ! this.state.dropdownItems && <Button variant="contained" startIcon={<ArrowDropDownIcon />} 
                            onClick={this.handleDropdownItems} style={ButtonStyle}>Items</Button>}
                        {this.state.dropdownItems && <Button variant="contained" startIcon={<ArrowDropUpIcon />} 
                            onClick={this.handleDropdownItems} style={ButtonStyle}>Items</Button>}
                    </Grid>

                    <Grid container direction="row" justify="center">
                        <Grid item>
                            <Grid container direction="column">
                                {this.state.dropdownUsers && UsersUi}   
                                {this.state.dropdownItems && ItemsUi}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default Post;