import React, {Component} from 'react';
import UserInterface from '../Interfaces/UserDataInterface';
import {Container, Grid, Paper} from '@material-ui/core';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {ActionChangeUserConnection} from '../../Redux/Actions';
import {Actions} from '../../Redux/Reducers';
import { AppState } from '../../Redux/Reducers';

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

type Props = LinkDispatchProps & LinkStateToProps & IProps

class User extends Component<Props> {

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
        if (this.props.userData.permissions) {
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
    userData : UserInterface
}
const MapStateToProps = (state: AppState, ownProps: IProps) : LinkStateToProps => {
    let users : UserInterface[] = state.UserReducer.users.filter(user => user.id === ownProps.userId);
    if (users.length > 0) {
        let userData : UserInterface = users[0];
        return {
            userData: userData
        };
    } else {
        return {
            userData : {
                id: -1,
                name: "no existing user",
                lastname: "",
                has_internet: true,
                gsmNumber: "",
                email: "",
                permissions: false,
                association: "",
                latitude: 0,
                longitude: 0
            }
        }
    }

}

interface LinkDispatchProps {
    changeConnection: (userid: Number, connection: boolean) => void
}

const MapDispatchToProps = (
    dispatch: Dispatch<Actions>,
    // ownProps: OwnProps
): LinkDispatchProps => {
    return {
        changeConnection: (userid: Number, connection: boolean) => {dispatch(ActionChangeUserConnection(userid,connection))}
    };
}

// export default Overview
export default connect(
    MapStateToProps,
    MapDispatchToProps 
)(User);