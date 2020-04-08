import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { NavLink} from 'react-router-dom';

const styleSticky = {
    position: "sticky" as 'sticky',
    top: 37,
    zIndex: 2
} 

interface IProps {
    tab: Number
}

interface IState {
    value: Number
}

class DataNavBar extends Component<IProps> {
    state: IState = {
        value: 0
    }

    componentWillMount() {
        this.setState({
            value: this.props.tab
        })
    }

    handleChange = (event: any, value: any) => {
        this.setState({
            value: value
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
                    <Tab label="Data" component={NavLink} to="/Data"/>
                    <Tab label="Vrijwilligers & verantwoordelijken" component={NavLink} to="/Data/Users"/>
                    <Tab label="Posten & sectoren" component={NavLink} to="/Data/Posts"/>
                    <Tab label="Problemen" component={NavLink} to="/data/Problems" />
                </Tabs>
                </Paper>
        );
    }
}

export default DataNavBar;

