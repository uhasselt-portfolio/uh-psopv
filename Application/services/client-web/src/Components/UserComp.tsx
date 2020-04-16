import React, {Component} from 'react';
import UserInterface from '../interfaces/UserDataInterface';
import {Container, Grid, Paper} from '@material-ui/core';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { AppState } from '../Redux/store';
import {changeConnection, fetchuser} from './ComponentActions';

interface IProps {
    userId: Number
}
const paperStyle = {
    background: 'rgb(240, 255, 255)',
    padding: '10px',
    margin: '10px'
}
const labelStyle = {
    padding: '0 10px 0 0'
}

type Props = LinkDispatchToProps & LinkStateToProps & IProps

class User extends Component<Props> {

    componentWillMount = () => {
        this.props.fetchuser();
    }

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
        else if (this.props.userData.permissions) {
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
                                <p>verantwoordelijke</p>
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
                permissions: false,
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
    changeConnection: (userid: Number, connection: boolean) => any,
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