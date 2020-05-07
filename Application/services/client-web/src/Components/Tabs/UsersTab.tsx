import React, {Component} from 'react';
import DataNavBar from '../NavBars/DataNavBarComp';
import User from '../Components/UserComp';
import UserInterface from '../Interfaces/UserDataInterface';
import {Grid, Button} from '@material-ui/core';
import { AppState } from '../../Redux/Reducers';
import {connect} from 'react-redux';

interface UserssState {
    filter: string,
    filterValue: string,
}

type Props = LinkStateProps // & LinkDispatchProps;

class Users extends Component<Props> {
    state: UserssState = {
            filter: "",
            filterValue: "",
    }


    handleFilterForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.handleFilter();
    }
    handleFilter = () => {
        let element = (document.getElementById("filterinput")) as HTMLInputElement;
        var value = element.value;
        this.setState({
                ...this.state,
                filterValue: value
        })
    }
    filterChanged = () => {
        var element = (document.getElementById("filtertype")) as HTMLSelectElement;
        var index = element.selectedIndex;
        var value = element.options[index];
        this.setState({
                ...this.state,
                filter: value.value
        });
        console.log(this.state);
    }

    render() {
        let filteredUsers : Array<JSX.Element> = this.props.users.map(x =>(
                            <User userId={x.id} />
                        ));
        switch (this.state.filter) {
            case "name": { filteredUsers = this.props.users.filter(User => User.name === this.state.filterValue).map(x =>(
                            <User key={x.gsmNumber} userId={x.id}  />
                            ));
                        break;
            }
            case "lastName": { filteredUsers = this.props.users.filter(User => User.lastname === this.state.filterValue).map(x =>(
                            <User key={x.gsmNumber} userId={x.id}/>
                            ));
                        break;
            }
            case "number": { filteredUsers = this.props.users.filter(User => User.gsmNumber === this.state.filterValue).map(x =>(
                            <User key={x.gsmNumber} userId={x.id} />
                            ));
                        break;
            }
            // TODO: Wouter permission changed
            case "vrijwilliger": { filteredUsers = this.props.users.filter(User => User.permission === 'User').map(x =>(
                            <User key={x.gsmNumber} userId={x.id} />
                            ));
                        break;
            }
            case "verantwoordelijke": { filteredUsers = this.props.users.filter(User => User.permission === 'Moderator').map(x =>(
                            <User key={x.gsmNumber} userId={x.id} />
                            ));
                        break;
            }

            case "association": { filteredUsers = this.props.users.filter(User => (( ! User.permission) && (User.association === this.state.filterValue))).map(x =>(
                            <User key={x.gsmNumber} userId={x.id} />
                            ));
                        break;
            }
            case "has_internet": { filteredUsers = this.props.users.filter(User => User.has_internet).map(x =>(
                            <User key={x.gsmNumber} userId={x.id} />
                            ));
                        break;
            }
            case "hasnt_internet": { filteredUsers = this.props.users.filter(User => ! User.has_internet).map(x =>(
                            <User key={x.gsmNumber} userId={x.id}/>
                            ));
                        break;
            }
        }

        return(
            <div>
                <DataNavBar tab={1}/>
                <Grid container justify="center" direction='row' >
                    <form onSubmit={this.handleFilterForm} id="filter">
                        <Grid item>
                            <select id="filtertype" onChange={this.filterChanged} value={this.state.filter}>
                                <option value="">noFilter</option>
                                <option value="name">naam</option>
                                <option value="lastName">achternaam</option>
                                <option value="number">gsm nummer</option>
                                <option value="vrijwilliger">vrijwilliger</option>
                                <option value="verantwoordelijke">verantwoordelijke</option>
                                <option value="association">vereniging</option>
                                <option value="has_internet">heeft internet</option>
                                <option value="hasnt_internet">heeft geen internet</option>
                            </select>
                        </Grid>
                        <Grid item >
                            <input type="text" id="filterinput" placeholder={this.state.filter}/>
                        </Grid>
                        <Grid item >
                            <Button type="submit" variant="outlined" onClick={this.handleFilter}>Zoek</Button>
                        </Grid>
                    </form>
                </Grid>
                
                <div>
                    {filteredUsers}
                </div>
            </div>
        );
    }
}

interface LinkStateProps {
    users: UserInterface[]
}

const MapStateToProps = (state : AppState): LinkStateProps => {
    return {
        users: state.Globalreducer.users
    }
}

// export default Overview
export default connect(
    MapStateToProps,
)(Users);