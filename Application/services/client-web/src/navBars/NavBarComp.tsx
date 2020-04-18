import React, {Component} from 'react';
import {Paper, Tabs, Tab} from '@material-ui/core';
import { Link } from 'react-router-dom';

const styleSticky = {
    position: "sticky" as 'sticky',
    height: '5%',
    top: 0,
    zIndex: 2,
    padding: '2px'
} 


interface IProps {
    history?: any
}

interface IState {
    value: String,
}


class NavBar extends Component<IProps, IState> {
    state = {
        value: "/",
    }

    constructor(props: IProps) {
        super(props);
        this.state = {
            value: "/"
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: any, value: any) {
        this.setState({
            value
        });
    }

    render() {
        return(
            <Paper style={styleSticky}>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Overview" component={Link} to="/"/>
                    <Tab label="Rapportering" component={Link} to="/Rapportering"/>
                    <Tab label="map" component={Link} to="/Map" />
                    <Tab label="Data" component={Link} to="/Data"/>
                    <Tab label="Instellingen" component={Link} to="/Settings"/>
                </Tabs>
                </Paper>
        );
    }
}

export default NavBar;

