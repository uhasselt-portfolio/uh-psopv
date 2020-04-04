import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';

const styleSticky = {
    position: "sticky" as 'sticky',
    top: 0,
    zIndex: 2
} 

interface IProps {
    history?: any
}

interface IState {
    value: String
}

class NavBar extends Component<IProps, IState> {
    state = {
        value: "/"
    }

    constructor(props: IProps) {
        super(props);
        this.state = {
            value: "/"
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
                    <Tab label="Overview" component={Link} to="/"/>
                    <Tab label="Rapportering" component={Link} to="/Rapportering"/>
                    <Tab label="Data" component={Link} to="/Data"/>
                </Tabs>
                </Paper>
        );
    }
}

export default NavBar;

