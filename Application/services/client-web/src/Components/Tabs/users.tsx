import React, {Component} from 'react';
import DataNavBar from '../NavBars/dataNavBar';
import User from '../user';
import UserInterface from '../Interfaces/userInterface';
import {Grid, Button} from '@material-ui/core';

interface UserssState {
    filter: string,
    filterValue: string,
    UsersData: [UserInterface]
}

class Users extends Component {
    state = {
        UsersState: {
            filter: "",
            filterValue: "",
            UsersData: [
                {name:"naam", lastname:"lastname", gsmNumber:"gsmnummer", email:"email", has_internet: true, permissions:false, association:"vereneging"},
                {name: "naam2", lastname:"lastname2", gsmNumber:"gsmnummer2", email:"email2", has_internet:false, permissions:true },
                {name: "John", lastname:"verbrugen", gsmNumber:"0478536954", email:"john.verbrugen@hotmail.com", has_internet: true, permissions: false, association:"scouts Kiewit"},
                {name: "Marie", lastname:"Torfs", gsmNumber:"0475636984", email:"Marie.Torfs@gmail.Com", has_internet: true, permissions: false, association:"scouts Kiewit"},
                {name: "Arno", lastname:"Timmermans", gsmNumber:"0475633215", email:"TimmermansArno@gmail.com", has_internet: true, permissions: false, association:"scouts Kiewit"},
                {name: "Quinten", lastname:"Degroote", gsmNumber:"0478521478", email:"DegrooteQ@hotmail.com", has_internet: true, permissions: false, association:"scouts Kiewit"},
                {name: "Liese", lastname:"Verbeeck", gsmNumber:"0171589632", email:"LizVerbeeck@hotmail.com", has_internet: false, permissions: false, association:"scouts Kiewit"},
                {name: "Margriet", lastname:"Coene", gsmNumber:"0478526544", email:"CoeneMar@gmail.com", has_internet: true, permissions: true},
                {name: "Seba", lastname:"DeMilitair", gsmNumber:"0470310450", email:"SebastiaanMili@hotmail.com,", has_internet: true, permissions: true},
                {name: "Marlies", lastname:"VanZelem", gsmNumber:"0478523698", email:"VanZelemMarles@gmail.com", has_internet: false, permissions: false, association:"VZWKiewit"},
                {name: "Kasper", lastname:"Exspiravit", gsmNumber:"0471258963", email:"Kasper.Exspiravit@gmail.com", has_internet: true, permissions: false, association:"VZWKiewit"},
                {name: "An", lastname:"Nuits", gsmNumber:"047856321", email:"An.Nuits@gmail.com", has_internet: true, permissions: true},
                {name: "Liesbeth", lastname:"Saenen", gsmNumber:"0475896412", email:"Saenen.Liesbeth@gmail.com", has_internet: true, permissions: false, association:"VZWKiewit"},
                {name: "Sam", lastname:"Coppens", gsmNumber:"0475125699", email:"Sam.Coppens@live.be", has_internet: true, permissions: true}
            ]
        }
    }


    handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let element = (document.getElementById("filterinput")) as HTMLInputElement;
        var value = element.value;
        this.setState({
            UsersState: {
                ...this.state.UsersState,
                filterValue: value
            }
        })
    }
    handleFilterButton = () => {
        let element = (document.getElementById("filterinput")) as HTMLInputElement;
        var value = element.value;
        this.setState({
            UsersState: {
                ...this.state.UsersState,
                filterValue: value
            }
        })
    }

    filterChanged = () => {
        var element = (document.getElementById("filtertype")) as HTMLSelectElement;
        var index = element.selectedIndex;
        var value = element.options[index];
        this.setState({
            UsersState: {
                ...this.state.UsersState,
                filter: value.value
            }
        });
    }

    render() {
        let filteredUsers : Array<JSX.Element> = this.state.UsersState.UsersData.map(x =>(
                                            <User key={x.gsmNumber} name={x.name} lastname={x.lastname} gsmNumber={x.gsmNumber} email={x.email} has_internet={x.has_internet} permissions={x.permissions} association={x.association}  />
                                        ));
        switch (this.state.UsersState.filter) {
            case "name": { filteredUsers = this.state.UsersState.UsersData.filter(User => User.name === this.state.UsersState.filterValue).map(x =>(
                            <User key={x.gsmNumber} name={x.name} lastname={x.lastname} gsmNumber={x.gsmNumber} email={x.email} has_internet={x.has_internet} permissions={x.permissions} association={x.association}  />
                            ));
                        break;
            }
            case "lastName": { filteredUsers = this.state.UsersState.UsersData.filter(User => User.lastname === this.state.UsersState.filterValue).map(x =>(
                            <User key={x.gsmNumber} name={x.name} lastname={x.lastname} gsmNumber={x.gsmNumber} email={x.email} has_internet={x.has_internet} permissions={x.permissions} association={x.association}  />
                            ));
                        break;
            }
            case "number": { filteredUsers = this.state.UsersState.UsersData.filter(User => User.gsmNumber === this.state.UsersState.filterValue).map(x =>(
                            <User key={x.gsmNumber} name={x.name} lastname={x.lastname} gsmNumber={x.gsmNumber} email={x.email} has_internet={x.has_internet} permissions={x.permissions} association={x.association}  />
                            ));
                        break;
            }
            case "vrijwilliger": { filteredUsers = this.state.UsersState.UsersData.filter(User => ! User.permissions).map(x =>(
                            <User key={x.gsmNumber} name={x.name} lastname={x.lastname} gsmNumber={x.gsmNumber} email={x.email} has_internet={x.has_internet} permissions={x.permissions} association={x.association}  />
                            ));
                        break;
            }
            case "verantwoordelijke": { filteredUsers = this.state.UsersState.UsersData.filter(User => User.permissions === true).map(x =>(
                            <User key={x.gsmNumber} name={x.name} lastname={x.lastname} gsmNumber={x.gsmNumber} email={x.email} has_internet={x.has_internet} permissions={x.permissions} association={x.association}  />
                            ));
                        break;
            }
            case "association": { filteredUsers = this.state.UsersState.UsersData.filter(User => (( ! User.permissions) && (User.association === this.state.UsersState.filterValue))).map(x =>(
                            <User key={x.gsmNumber} name={x.name} lastname={x.lastname} gsmNumber={x.gsmNumber} email={x.email} has_internet={x.has_internet} permissions={x.permissions} association={x.association}  />
                            ));
                        break;
            }
            case "has_internet": { filteredUsers = this.state.UsersState.UsersData.filter(User => User.has_internet).map(x =>(
                            <User key={x.gsmNumber} name={x.name} lastname={x.lastname} gsmNumber={x.gsmNumber} email={x.email} has_internet={x.has_internet} permissions={x.permissions} association={x.association}  />
                            ));
                        break;
            }
            case "hasnt_internet": { filteredUsers = this.state.UsersState.UsersData.filter(User => ! User.has_internet).map(x =>(
                            <User key={x.gsmNumber} name={x.name} lastname={x.lastname} gsmNumber={x.gsmNumber} email={x.email} has_internet={x.has_internet} permissions={x.permissions} association={x.association}  />
                            ));
                        break;
            }
        }

        return(
            <div>
                <DataNavBar/>
                <h4 className="center">Users</h4>
                <Grid container justify="center" direction='row' >
                    <form onSubmit={this.handleFilter} id="filter">
                        <Grid item>
                            <select id="filtertype" onChange={this.filterChanged} value={this.state.UsersState.filter}>
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
                            <input type="text" id="filterinput" />
                        </Grid>
                        <Grid item >
                            <Button type="submit" variant="outlined" onClick={this.handleFilterButton}>Zoek</Button>
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

export default Users;