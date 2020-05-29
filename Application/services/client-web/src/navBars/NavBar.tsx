import React, {Component} from 'react';
import {Paper, Button, Menu, MenuItem, Grid, IconButton, Avatar} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import logo from './logo.jpg';
import GeneratePdfButton from './PDFGeneration/GeneratePDFButton';

const styleSticky = {
    position: "sticky" as 'sticky',
    height: '10%',
    top: 0,
    zIndex: 2,
    padding: '1vh 2vw',
    background: 'rgb(0,91,150)',
} 
const TabStyle = {
    margin: '10px'
}
const MenuStyle = {
    margin: '5px',
    width: '10%'
}
const TabsStyle = {
    width: '40%'
}
const InActiveTabStyle = {
    background: 'rgb(3,57,108)',
    color: 'white',
}
const ActiveTabStyle = {
    background: 'rgb(8, 117, 189)',
    color: 'white'
}
const LogoStyle= {
    width: '150px',
    height: '50px'
}

interface IProps {
    history?: any
}

interface IState {
    value: String,
    anchorEl: null | HTMLElement,
    redirecting: boolean,
    active: Number
}

/**
 * @author Wouter Grootjans
 */
class NavBar extends Component<IProps, IState> {
    state = {
        value: "/",
        anchorEl: null,
        redirecting: false,
        active: 1
    }

    constructor(props: IProps) {
        super(props);
        this.state = {
            ...this.state,
            value: "/"
        }
    }

    /**
     * updates the state to display the menu
     */
    handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({
            ...this.state,
            anchorEl: event.currentTarget
        });
    }

    /**
     * updates the state to close the menu
     */
    handleClose = () => {
        this.setState({
            ...this.state,
            anchorEl: null
        });
    };

    /**
     * updates the state to redirect to the right tab
     */
    handleLink = (tab: string, active: Number) => {
        this.setState({
            value: '/' + tab,
            redirecting: true,
            anchorEl: null,
            active: active
        });
    }

    render() {
        if (this.state.redirecting) {
            this.setState({
                ...this.state,
                redirecting: false
            });
            return(
                <Redirect to={{
                    pathname: this.state.value
                }}/>
            )
        }

        return(
            <Paper style={styleSticky}>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={() => this.handleLink("Data/Posts",0)}>Posten</MenuItem>
                    <MenuItem onClick={() => this.handleLink("Data/Users",0)}>Vrijwilligers & Verantwoordelijken</MenuItem>
                    <MenuItem onClick={() => this.handleLink("Data/Shifts",0)}>Planning</MenuItem>
                    <MenuItem onClick={() => this.handleLink("Data/Problems",0)}>Problemen</MenuItem>
                </Menu>
                <Grid container direction="row">
                        <Grid container justify="flex-start" style={MenuStyle}> 
                            {this.state.active === 0 && 
                                <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick} style={ActiveTabStyle}>
                                    <MenuIcon/>
                                </IconButton>
                            }
                            {this.state.active !== 0 && 
                                <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick} style={InActiveTabStyle}>
                                    <MenuIcon/>
                                </IconButton>
                            }
                        </Grid>
                    <Grid container justify="flex-start" style={TabsStyle}>
                        <Grid item style={TabStyle}>
                            {this.state.active === 1 && <Button variant="outlined" onClick={() => this.handleLink("",1)} style={ActiveTabStyle}>
                                Overview</Button>}
                            {this.state.active !== 1 && <Button variant="contained" onClick={() => this.handleLink("",1)} style={InActiveTabStyle}>
                                Overview</Button>}
                        </Grid>
                        <Grid item style={TabStyle}>
                            {this.state.active === 2 &&  <Button variant="outlined" onClick={() => this.handleLink("Map",2)} style={ActiveTabStyle}>
                                Map</Button>}
                            {this.state.active !== 2 &&  <Button variant="contained" onClick={() => this.handleLink("Map",2)} style={InActiveTabStyle}>
                                Map</Button>}
                        </Grid>
                        <Grid item style={TabStyle}>
                            <GeneratePdfButton/>
                        </Grid>
                        <Grid item style={TabStyle}>
                            {this.state.active === 4 && <Button variant="outlined" onClick={() => this.handleLink("Data",4)} style={ActiveTabStyle}>
                                Data</Button>}
                            {this.state.active !== 4 && <Button variant="contained" onClick={() => this.handleLink("Data",4)} style={InActiveTabStyle}>
                                Data</Button>}
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Avatar alt="Pukkelpop Logo" src={logo} style={LogoStyle}/>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default NavBar;

