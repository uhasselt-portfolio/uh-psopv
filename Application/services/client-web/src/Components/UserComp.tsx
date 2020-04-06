import React, {Component} from 'react';
import UserInterface from './Interfaces/UserDataInterface';
import {Container, Grid, Paper} from '@material-ui/core';

interface State {
    data: UserInterface
}
const paperStyle = {
    background: 'rgb(240, 255, 255)',
    padding: '10px',
    margin: '10px'
}
const labelStyle = {
    padding: '0 10px 0 0'
}

class User extends Component<UserInterface, State> {

    state: State = {
        data: {    
            name: "voornaam",
            lastname: "achternaam",
            has_internet: true,
            gsmNumber: "gsm-nummer",
            email: "email",
            permissions: false,
            association: "vereniging"
        }
    }

    constructor(props: UserInterface) {
        super(props);

        this.state = {
            data: {    
                name: props.name,
                lastname: props.lastname,
                has_internet: props.has_internet,
                gsmNumber: props.gsmNumber,
                email: props.email,
                permissions: props.permissions,
                association: props.association
            }
        }
    }

    handleChangeInternet = () => {
        this.setState({
            data: {
                ...this.state.data,
                has_internet: ! this.state.data.has_internet
            }
        });
        //TODO do change globally
    }

    render() {
        if (this.state.data.permissions) {
            return (     
                <Container>
                    <Paper style={paperStyle}>
                    <Grid container justify="center">
                            <Grid item>
                                <h4>{this.state.data.name} {this.state.data.lastname}</h4>
                            </Grid>
                        </Grid>
                        <Grid container justify="space-evenly">
                            <Grid item>
                                <Grid container>
                                    <Grid item style={labelStyle}>
                                        <p>nummer: </p>
                                    </Grid>
                                    <Grid item>
                                        <p>{this.state.data.gsmNumber}</p>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container>
                                    <Grid item style={labelStyle}>
                                        <p>email: </p>
                                    </Grid>
                                    <Grid item>
                                        <p>{this.state.data.email}</p>
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
                                        {this.state.data.has_internet &&                             
                                            <label>
                                                <input type="checkbox" checked={true} onChange={this.handleChangeInternet}/>
                                                <span> heeft een internet verbinding </span>
                                            </label>
                                        }
                                        { ! this.state.data.has_internet && 
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
                                <h4 className="center">{this.state.data.name} {this.state.data.lastname}</h4>
                            </Grid>
                        </Grid>
                        <Grid container justify="space-evenly">
                            <Grid item>
                                <Grid container>
                                    <Grid item style={labelStyle}>
                                        <p className="col s2">nummer: </p>
                                    </Grid>
                                    <Grid item>
                                        <p className="col s2">{this.state.data.gsmNumber}</p>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container>
                                    <Grid item style={labelStyle}>
                                        <p className="col s2">email: </p>
                                    </Grid>
                                    <Grid item>
                                        <p className="col s3">{this.state.data.email}</p>
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
                                        <p className="col s4">{this.state.data.association}</p>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                            <Grid item>
                                <form action="#">
                                        {this.state.data.has_internet &&                             
                                            <label>
                                                <input type="checkbox" checked={true} onChange={this.handleChangeInternet}/>
                                                <span className="col"> heeft een internet verbinding </span>
                                            </label>
                                        }
                                        { ! this.state.data.has_internet && 
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

export default User;