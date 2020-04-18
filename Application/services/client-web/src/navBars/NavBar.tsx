import React, {Component} from 'react';
import {Paper, Button, Menu, MenuItem, Grid, IconButton} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';

const styleSticky = {
    position: "sticky" as 'sticky',
    height: '5%',
    top: 0,
    zIndex: 2,
    padding: '2px',
    // background: 'rgb(204, 231, 232)'
    background: 'rgb(248,248,248)',
    margin: '4px'
} 
const TabStyle = {
    margin: '10px'
}
const MenuStyle = {
    margin: '5px',
    width: '10%'
}
const TabsStyle = {
    width: '80%'
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

    handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({
            ...this.state,
            anchorEl: event.currentTarget
        });
    }

    handleClose = () => {
        this.setState({
            ...this.state,
            anchorEl: null
        });
    };

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
                                <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                                    <MenuIcon/>
                                </IconButton>
                            }
                            {this.state.active !== 0 && 
                                <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                                    <MenuIcon/>
                                </IconButton>
                            }
                        </Grid>
                    <Grid container justify="center" style={TabsStyle}>

                        <Grid item style={TabStyle}>
                            {this.state.active === 1 && <Button variant="outlined" onClick={() => this.handleLink("",1)}>
                                Overview</Button>}
                            {this.state.active !== 1 && <Button variant="contained" onClick={() => this.handleLink("",1)}>Overview</Button>}
                        </Grid>
                        <Grid item style={TabStyle}>
                            {this.state.active === 2 &&  <Button variant="outlined" onClick={() => this.handleLink("Map",2)}>
                                Map</Button>}
                            {this.state.active !== 2 &&  <Button variant="contained" onClick={() => this.handleLink("Map",2)}>Map</Button>}
                        </Grid>
                        <Grid item style={TabStyle}>
                            {this.state.active === 3 && <Button variant="outlined" onClick={() => this.handleLink("Rapportering",3)}>
                                Rapportering</Button>}
                            {this.state.active !== 3 && <Button variant="contained" onClick={() => this.handleLink("Rapportering",3)}>Rapportering</Button>}
                        </Grid>
                        <Grid item style={TabStyle}>
                            {this.state.active === 4 && <Button variant="outlined" onClick={() => this.handleLink("Data",4)}>
                                Data</Button>}
                            {this.state.active !== 4 && <Button variant="contained" onClick={() => this.handleLink("Data",4)}>Data</Button>}
                        </Grid>
                    </Grid>
                </Grid>



                    
                </Paper>
        );
    }
}

export default NavBar;

