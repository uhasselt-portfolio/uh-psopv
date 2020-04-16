import React, {Component} from 'react';
import DataNavBar from '../../navBars/DataNavBarComp';
import User from '../../Components/UserComp';
import UserInterface from '../../interfaces/UserDataInterface';
import {Grid, Button} from '@material-ui/core';
import { AppState } from '../../Redux/store';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUsers} from './UserAction';

interface UserssState {
    filter: string,
    filterValue: string,
}

type Props = LinkStateProps & LinkDispatchToProps;

class Users extends Component<Props> {
    state: UserssState = {
            filter: "",
            filterValue: "",
    }

    componentWillMount = () => {
        this.props.fetchUsers();
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
            case "vrijwilliger": { filteredUsers = this.props.users.filter(User => ! User.permissions).map(x =>(
                            <User key={x.gsmNumber} userId={x.id} />
                            ));
                        break;
            }
            case "verantwoordelijke": { filteredUsers = this.props.users.filter(User => User.permissions === true).map(x =>(
                            <User key={x.gsmNumber} userId={x.id} />
                            ));
                        break;
            }
            case "association": { filteredUsers = this.props.users.filter(User => (( ! User.permissions) && (User.association === this.state.filterValue))).map(x =>(
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
                    {this.props.loading && 
                        <p>Gebruikers aan het inladen</p>}
                    { ! this.props.loading && this.props.errorMessage !== '' && 
                        <p>Er trad een fout up: {this.props.errorMessage}</p>}
                    { ! this.props.loading && this.props.errorMessage === "" && this.props.isUsersFetched && filteredUsers.length > 0 &&
                        filteredUsers}
                    { ! this.props.loading && this.props.errorMessage === "" && this.props.isUsersFetched && filteredUsers.length === 0 &&
                        <p>Geen gebruikers beschikbaar</p>}
                </div>
            </div>
        );
    }
}

interface LinkStateProps {
    users: UserInterface[]
    loading: boolean,
    errorMessage: string,
    isUsersFetched: boolean
}
const MapStateToProps = (state : AppState): LinkStateProps => {
    return {
        users: state.UsersReducer.users,
        loading: state.UsersReducer.loading,
        errorMessage: state.UsersReducer.errorMessage,
        isUsersFetched: state.UsersReducer.isUsersFetched
    }
}

interface LinkDispatchToProps {
    fetchUsers: () => any
}
const MapDispatchToProps = (dispatch: any) : LinkDispatchToProps => {
    return bindActionCreators({
        fetchUsers
    },dispatch);
}

// export default Overview
export default connect(
    MapStateToProps, MapDispatchToProps
)(Users);