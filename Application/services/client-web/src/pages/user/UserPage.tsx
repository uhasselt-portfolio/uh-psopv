import React, {Component} from 'react';
import User from '../../Components/UserComp';
import UserInterface from '../../interfaces/UserDataInterface';
import {Grid, Button, TextField, MenuItem} from '@material-ui/core';
import { AppState } from '../../Redux/store';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUsers} from './UserAction';

const styleFilter = {
    background: 'rgb(242,242,250)',
    padding: '10px',
    borderRadius: '25px',
    width: '25%',
    textAlign: 'center' as 'center'
}
const ButtonStyle = {
    background: 'rgb(3,57,108)',
    color: 'white',
    margin: '4px'
}
const styleFormElement = {
    margin: '4px'
}

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
    handleFilterChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        let element = (document.getElementById("filterinput")) as HTMLInputElement;
        var value = element.value;
        this.setState({
                ...this.state,
                filter: event.target.value,
                filterValue: value
        });
    }

    render() {
        let filteredUsers : Array<JSX.Element> = this.props.users.map(x =>(
                            <User userId={x.id} />
                        ));

        switch (this.state.filter) {
            case "voornaam": { filteredUsers = this.props.users.filter(User => User.name === this.state.filterValue).map(x =>(
                            <User key={x.gsmNumber} userId={x.id}  />
                            ));
                        break;
            }
            case "achternaam": { filteredUsers = this.props.users.filter(User => User.lastname === this.state.filterValue).map(x =>(
                            <User key={x.gsmNumber} userId={x.id}/>
                            ));
                        break;
            }
            case "vrijwilliger": { filteredUsers = this.props.users.filter(User => User.permission === 1).map(x =>(
                            <User key={x.gsmNumber} userId={x.id} />
                            ));
                        break;
            }
            case "verantwoordelijke": { filteredUsers = this.props.users.filter(User => User.permission === 2).map(x =>(
                            <User key={x.gsmNumber} userId={x.id} />
                            ));
                        break;
            }

            case "vereniging": { filteredUsers = this.props.users.filter(User => (( ! User.permission) && (User.association === this.state.filterValue))).map(x =>(
                            <User key={x.gsmNumber} userId={x.id} />
                            ));
                        break;
            }
            case "heeft internet": { filteredUsers = this.props.users.filter(User => User.has_internet).map(x =>(
                            <User key={x.gsmNumber} userId={x.id} />
                            ));
                        break;
            }
            case "heeft geen internet": { filteredUsers = this.props.users.filter(User => ! User.has_internet).map(x =>(
                            <User key={x.gsmNumber} userId={x.id}/>
                            ));
                        break;
            }
        }

        console.log(this.props);

        return(
            <div>
                <Grid container justify="center" direction='column' >
                    <Grid container justify="center">
                        <h4>Vrijwilligers & Verantwoordelijken</h4>
                    </Grid>
                    <Grid container justify="center">
                        <form onSubmit={this.handleFilterForm} id="filter" style={styleFilter}>
                            <Grid item>
                                <TextField
                                    id="filter"
                                    select
                                    label="filter"
                                    value={this.state.filter}
                                    onChange={this.handleFilterChanged}
                                    helperText="Selecteer een filter"
                                    variant="outlined"
                                    style={styleFormElement}
                                    >
                                    <MenuItem value="Geen filter">Geen filter</MenuItem>
                                    <MenuItem value="voornaam">naam</MenuItem>
                                    <MenuItem value="achternaam">achternaam</MenuItem>
                                    <MenuItem value="vrijwilliger">vrijwilliger</MenuItem>
                                    <MenuItem value="verantwoordelijke">verantwoordelijke</MenuItem>
                                    <MenuItem value="vereniging">vereniging</MenuItem>
                                    <MenuItem value="heeft internet">heeft internet</MenuItem>
                                    <MenuItem value="heeft geen internet">heeft geen internet</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item >
                                <TextField variant="outlined" style={styleFormElement} type="text" id="filterinput" placeholder={this.state.filter}/>
                            </Grid>
                            <Grid item >
                                <Button type="submit" variant="outlined" onClick={this.handleFilter} style={ButtonStyle}>Zoek</Button>
                            </Grid>
                        </form>
                    </Grid>
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