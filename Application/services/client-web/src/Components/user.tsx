import React, {Component} from 'react';
import UserInterface from './Interfaces/userInterface';

interface State {
    data: UserInterface
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
                <div className="User container card">
                    <h4 className="center">{this.state.data.name} {this.state.data.lastname}</h4>
                    <div className="row s12">
                        <p className="col s2">nummer: </p>
                        <p className="col s2">{this.state.data.gsmNumber}</p>
                        <p className="col s3" />
                        <p className="col s2">email: </p>
                        <p className="col s3">{this.state.data.email}</p>
                    </div>
                    <div className="row">
                        <p className="col">verantwoordelijke</p>
                    </div>
                    <div className="row">
                        <form action="#">
                            {this.state.data.has_internet &&                             
                                <label>
                                    <input type="checkbox" checked={true} onChange={this.handleChangeInternet}/>
                                    <span className="col"> heeft een internet verbinding </span>
                                </label>
                            }
                            { ! this.state.data.has_internet && 
                                <label>
                                    <input type="checkbox" checked={false} onChange={this.handleChangeInternet}/>
                                    <span className="col"> heeft geen internet verbinding </span>
                                </label>
                            }
                        </form>
                    </div>
                </div>
            );
        } else {
            return(
                <div className="User container card">
                    <h4 className="center">{this.state.data.name} {this.state.data.lastname}</h4>
                    <div className="row s12">
                        <p className="col s2">nummer: </p>
                        <p className="col s2">{this.state.data.gsmNumber}</p>
                        <p className="col s3" />
                        <p className="col s2">email: </p>
                        <p className="col s3">{this.state.data.email}</p>
                    </div>
                    <div className="row s12">
                        <p className="col s2">vrijwilliger</p>
                        <p className="col s1" />
                        <p className="col s2">vereniging: </p>
                        <p className="col s4">{this.state.data.association}</p>
                    </div>
                    <div className="row">
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
                    </div>
                </div>
            );
        }
    }
}

export default User;