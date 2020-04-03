import React, {Component} from 'react';
import DataNavBar from '../NavBars/dataNavBar';
import User from '../user';
import UserInterface from '../Interfaces/userInterface';
import {Grid, Container} from '@material-ui/core';

interface UserssState {
    filter: string,
    UsersData: [UserInterface]
}

class Users extends Component {
    state = {
        UsersState: {
            filter: "",
            UsersData: [
                {name:"naam", lastname:"lastname", gsmNumber:"gsmnummer", email:"email", has_internet: true, permissions:false, association:"vereneging"},
                {name: "naam", lastname:"lastname", gsmNumber:"gsmnummer", email:"email", has_internet:true, permissions:true },
                {name: "John", lastname:"verbrugen", gsmNumber:"0478536954", email:"john.verbrugen@hotmail.com", has_internet: true, permissions: true, association:"scouts Kiewit"},
                {name: "Marie", lastname:"Torfs", gsmNumber:"0475636984", email:"Marie.Torfs@gmail.Com", has_internet: true, permissions: true, association:"scouts Kiewit"},
                {name: "Arno", lastname:"Timmermans", gsmNumber:"0475633215", email:"TimmermansArno@gmail.com", has_internet: true, permissions: true, association:"scouts Kiewit"},
                {name: "Quinten", lastname:"Degroote", gsmNumber:"0478521478", email:"DegrooteQ@hotmail.com", has_internet: true, permissions: true, association:"scouts Kiewit"},
                {name: "Liese", lastname:"Verbeeck", gsmNumber:"0171589632", email:"LizVerbeeck@hotmail.com", has_internet: true, permissions: true, association:"scouts Kiewit"},
                {name: "Margriet", lastname:"Coene", gsmNumber:"0478526544", email:"CoeneMar@gmail.com", has_internet: true, permissions: true},
                {name: "Seba", lastname:"DeMilitair", gsmNumber:"0470310450", email:"SebastiaanMili@hotmail.com,", has_internet: true, permissions: true},
                {name: "Marlies", lastname:"VanZelem", gsmNumber:"0478523698", email:"VanZelemMarles@gmail.com", has_internet: true, permissions: true, association:"VZWKiewit"},
                {name: "Kasper", lastname:"Exspiravit", gsmNumber:"0471258963", email:"Kasper.Exspiravit@gmail.com", has_internet: true, permissions: true, association:"VZWKiewit"},
                {name: "An", lastname:"Nuits", gsmNumber:"047856321", email:"An.Nuits@gmail.com", has_internet: true, permissions: true},
                {name: "Liesbeth", lastname:"Saenen", gsmNumber:"0475896412", email:"Saenen.Liesbeth@gmail.com", has_internet: true, permissions: true, association:"VZWKiewit"},
                {name: "Sam", lastname:"Coppens", gsmNumber:"0475125699", email:"Sam.Coppens@live.be", has_internet: true, permissions: true}
            ]
        }
    }


    filter = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(this.state.UsersState);
        console.log(this.state);
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

        if (this.state.UsersState.filter === "") {
            const Users = this.state.UsersState.UsersData.map(x =>(
                <User name={x.name} lastname={x.lastname} gsmNumber={x.gsmNumber} email={x.email} has_internet={x.has_internet} permissions={x.permissions} association={x.association}  />
            ));
        } else {
            
        }

        return(
            <div>
                <DataNavBar/>
                <h4 className="center">Users</h4>
                {/* <Container  */}
                <Grid container justify="space-around">
                    <form onSubmit={this.filter} id="filter">
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
                            </select>
                        </Grid>
                        <Grid item>
                            <input type="text" />
                        </Grid>
                        <Grid item>
                            <button type="submit">Zoek</button>
                        </Grid>
                    </form>
                </Grid>
                <form onSubmit={this.filter} id="filter">
                    <select id="filtertype" onChange={this.filterChanged} value={this.state.UsersState.filter}>
                        <option value="">noFilter</option>
                        <option value="name">naam</option>
                        <option value="lastName">achternaam</option>
                        <option value="number">gsm nummer</option>
                        <option value="vrijwilliger">vrijwilliger</option>
                        <option value="verantwoordelijke">verantwoordelijke</option>
                        <option value="association">vereniging</option>
                        <option value="has_internet">heeft internet</option>
                    </select>
                    <input type="text" />
                    <button type="submit">Zoek</button>
                </form>

                <div>
                    <User name="naam" lastname="lastname" gsmNumber="gsmnummer" email="email" has_internet={true} permissions={false} association="vereneging"/>
                    <User name="naam" lastname="lastname" gsmNumber="gsmnummer" email="email" has_internet={true} permissions={true}/>
                    <User name="John" lastname="verbrugen" gsmNumber="0478536954" email="john.verbrugen@hotmail.com" has_internet={true} permissions={false} association="scouts Kiewit"/>
                    <User name="Marie" lastname="Torfs" gsmNumber="0475636984" email="Marie.Torfs@gmail.Com" has_internet={true} permissions={false} association="scouts Kiewit"/>
                    <User name="Arno" lastname="Timmermans" gsmNumber="0475633215" email="TimmermansArno@gmail.com" has_internet={false} permissions={false} association="scouts Kiewit"/>
                    <User name="Quinten" lastname="Degroote" gsmNumber="0478521478" email="DegrooteQ@hotmail.com" has_internet={true} permissions={false} association="scouts Kiewit"/>
                    <User name="Liese" lastname="Verbeeck" gsmNumber="0171589632" email="LizVerbeeck@hotmail.com" has_internet={true} permissions={false} association="scouts Kiewit"/>
                    <User name="Margriet" lastname="Coene" gsmNumber="0478526544" email="CoeneMar@gmail.com" has_internet={true} permissions={true}/>
                    <User name="Seba" lastname="DeMilitair" gsmNumber="0470310450" email="SebastiaanMili@hotmail.com" has_internet={false} permissions={true}/>
                    <User name="Marlies" lastname="VanZelem" gsmNumber="0478523698" email="VanZelemMarles@gmail.com" has_internet={true} permissions={false} association="VZWKiewit"/>
                    <User name="Kasper" lastname="Exspiravit" gsmNumber="0471258963" email="Kasper.Exspiravit@gmail.com" has_internet={true} permissions={false} association="VZWKiewit"/>
                    <User name="An" lastname="Nuits" gsmNumber="047856321" email="An.Nuits@gmail.com" has_internet={true} permissions={true}/>
                    <User name="Liesbeth" lastname="Saenen" gsmNumber="0475896412" email="Saenen.Liesbeth@gmail.com" has_internet={false} permissions={false} association="VZWKiewit"/>
                    <User name="Sam" lastname="Coppens" gsmNumber="0475125699" email="Sam.Coppens@live.be" has_internet={true} permissions={true}/>
                </div>
            </div>
        );
    }
}

export default Users;