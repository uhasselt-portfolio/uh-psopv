import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';

const styleSticky = {
    position: "sticky" as 'sticky',
    top: 37,
    zIndex: 2
} 

interface IProps {
    history?: any
}

interface IState {
    value: String
}

class DataNavBar extends Component<IProps, IState> {
    state = {
        value: "/Data"
    }

    constructor(props: IProps) {
        super(props);
        this.state = {
            value: "/Data"
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {

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
                    <Tab label="Data" component={Link} to="/Data"/>
                    <Tab label="Vrijwilligers & verantwoordelijken" component={Link} to="/Data/Users"/>
                    <Tab label="Posten & sectoren" component={Link} to="/Data/Posts"/>
                    <Tab label="Problemen" component={Link} to="/data/Problems" />
                </Tabs>
                </Paper>
        );
    }
}

export default DataNavBar;

