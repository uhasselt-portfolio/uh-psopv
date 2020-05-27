import React, {Component} from 'react';
import UserInterface from '../interfaces/UserDataInterface';
import {Container, Grid, Paper} from '@material-ui/core';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { AppState } from '../Redux/store';
import {changeConnection, fetchuser} from './ComponentActions';

interface IProps {
    userId: number
}
const paperStyle = {
    background: 'rgb(242,242,250)',
    padding: '10px',
    margin: '10px',
    borderRadius: '50px',
}
const labelStyle = {
    padding: '0 10px 0 0'
}

type Props = LinkDispatchToProps & LinkStateToProps & IProps

class User extends Component<Props> {

    /**
     * is called before the component is mounted
     * will request the latest state of the users from the database
     */
    componentWillMount = () => {
        this.props.fetchuser();
    }

    /**
     * updates the connection of the user in the database
     */
    handleChangeInternet = () => {
        this.props.changeConnection(this.props.userData.id, ! this.props.userData.has_internet);
    }

    render() {
        if (this.props.userData.id === -1) {
            return(
                <div>
                    <p>Er is iets fout gegaan, deze gebruiker bestaat niet</p>
                </div>
            )
        }
        if (this.props.loading)
            return (
                <Container>
                    <Paper style={paperStyle}>
                        <p>De gebruiker wordt ingeladen</p>
                    </Paper>
                </Container>
            )
        else if (! this.props.isUserFetched && this.props.errormessage !== "")
            return (
                <Container>
                    <Paper style={paperStyle}>
                        <p>Er liep iets mis, {this.props.errormessage}</p>
                    </Paper>
                </Container>
            )
        else if (this.props.userData.permission) {
            return (     
                <Container>
                    <Paper style={paperStyle}> 
                    <Grid container justify="center">
                            <Grid item>
                                <h4>{this.props.userData.name} {this.props.userData.lastname}</h4>
                            </Grid>
                        </Grid>
                        <Grid container justify="space-evenly">
                            <Grid item>
                                <Grid container>
                                    <Grid item style={labelStyle}>
                                        <p>nummer: </p>
                                    </Grid>
                                    <Grid item>
                                        <p>{this.props.userData.gsmNumber}</p>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container>
                                    <Grid item style={labelStyle}>
                                        <p>email: </p>
                                    </Grid>
                                    <Grid item>
                                        <p>{this.props.userData.email}</p>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                            <Grid item style={labelStyle}>
                                {this.props.userData.permission === 2 && <p>verantwoordelijke</p>}
                                {this.props.userData.permission === 1 && <p>vrijwilliger</p>}
                                {this.props.userData.permission === 3 && <p>Admin</p>}
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                            <Grid item>
                                <form action="#">
                                        {this.props.userData.has_internet &&                             
                                            <label>
                                                <input type="checkbox" checked={true} onChange={this.handleChangeInternet}/>
                                                <span> heeft een internet verbinding </span>
                                            </label>
                                        }
                                        { ! this.props.userData.has_internet && 
                                            <label>
                                                <input type="checkbox" checked={false}onChange={this.handleChangeInternet}/>
                                                <span> heeft geen internet verbinding </span>
                                            </label>
                                        }
                                </form>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>       
            );
        } else {
            return(
                <Container>
                    <Paper style={paperStyle}>
                        <Grid container justify="center">
                            <Grid item>
                                <h4 className="center">{this.props.userData.name} {this.props.userData.lastname}</h4>
                            </Grid>
                        </Grid>
                        <Grid container justify="space-evenly">
                            <Grid item>
                                <Grid container>
                                    <Grid item style={labelStyle}>
                                        <p className="col s2">nummer: </p>
                                    </Grid>
                                    <Grid item>
                                        <p className="col s2">{this.props.userData.gsmNumber}</p>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container>
                                    <Grid item style={labelStyle}>
                                        <p className="col s2">email: </p>
                                    </Grid>
                                    <Grid item>
                                        <p className="col s3">{this.props.userData.email}</p>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container justify="space-evenly">
                            <Grid item style={labelStyle}>
                                <p className="col s2">vrijwilliger</p>
                            </Grid>
                            <Grid item>
                                <Grid container>
                                    <Grid item style={labelStyle}>
                                        <p className="col s2">vereniging: </p>
                                    </Grid>
                                    <Grid item>
                                        <p className="col s4">{this.props.userData.association}</p>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                            <Grid item>
                                <form action="#">
                                        {this.props.userData.has_internet &&                             
                                            <label>
                                                <input type="checkbox" checked={true} onChange={this.handleChangeInternet}/>
                                                <span className="col"> heeft een internet verbinding </span>
                                            </label>
                                        }
                                        { ! this.props.userData.has_internet && 
                                            <label>
                                                <input type="checkbox" checked={false}onChange={this.handleChangeInternet}/>
                                                <span className="col"> heeft geen internet verbinding </span>
                                            </label>
                                        }
                                </form>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            );
        }
    }
}

interface LinkStateToProps {
    userData : UserInterface,
    loading: boolean,
    isUserFetched: boolean,
    errormessage: String
}
const MapStateToProps = (state: AppState, ownProps: IProps) : LinkStateToProps => {
    let users : UserInterface[] = state.ComponentReducer.users.filter(user => user.id === ownProps.userId);
    if (users.length > 0) {
        let userData : UserInterface = users[0];
        return {
            userData: userData,
            loading: state.ComponentReducer.loading,
            isUserFetched: state.ComponentReducer.isUsersFetched,
            errormessage: state.ComponentReducer.errorMessage
        };
    } else {
        return {
            userData : {
                id: -1,
                name: "geen bestaande gebruiker",
                lastname: "",
                has_internet: true,
                gsmNumber: "",
                email: "",
                permission: 1,
                association: "",
                latitude: 0,
                longitude: 0
            },
            loading: state.ComponentReducer.loading,
            isUserFetched: state.ComponentReducer.isUsersFetched,
            errormessage: state.ComponentReducer.errorMessage
        }
    }

}

interface LinkDispatchToProps {
    changeConnection: (userid: number, connection: boolean) => any,
    fetchuser: () => any
}

const MapDispatchToProp = (dispatch: any) : LinkDispatchToProps => {
    return bindActionCreators({
        changeConnection,
        fetchuser
    },dispatch);
}

export default connect(
    MapStateToProps,
    MapDispatchToProp 
)(User);