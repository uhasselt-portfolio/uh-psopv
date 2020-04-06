import React, {Component, FormEvent} from 'react';
import DataNavBar from '../NavBars/DataNavBarComp';
import Post from '../PostComp';
import {Container, Grid, Button} from '@material-ui/core';
import PostInterface from '../Interfaces/PostDataInterface';

interface IState {
    filter: string,
    filterValue: string,
    PostsData: [PostInterface]
}


class Posts extends Component {
    state = {
        IState: {
            filter: "",
            filterValue: "",
            PostsData: [
                { title: "post", addres: "addres", sector: 1, general: "generalpost" },
                { title: "Parking1", addres: "Visserstraat 27", sector: 1, general: "Parking Controle" },
                { title: "Parking2", addres: "Berglaan 5", sector: 1, general: "Parking Controle" },
                { title: "Parking3", addres: "Hemelstraat 164", sector: 1, general: "Parking Controle" },
                { title: "Parking4", addres: "Pukkelpoplaan 1", sector: 3, general: "Parking Controle" },
                { title: "Drank stand 1", addres: "Terein", sector: 2, general: "Dranken Stand" },
                { title: "Schoonmaak terein", addres: "Terein", sector: 2, general: "Schoonmaak" },
                { title: "Security", addres: "terein", sector: 2, general: "Security" },
                { title: "Straat-affzetting1", addres: "Rodeberg - Geraardslaan", sector: 4, general: "Straatafzetting" },
                { title: "Straat-affzetting2", addres: "Addelbaan - Rodeberg", sector: 4, general: "Straatafzetting" },
                { title: "Straat-affzetting3", addres: "Visserstraat - Geraardslaan", sector: 1, general: "Straatafzetting" }
            ]
        }
    }

    handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let element = (document.getElementById("filterInput")) as HTMLInputElement;
        var value = element.value;
        console.log(value);
        this.setState({
            IState: {
                ...this.state.IState,
                filterValue: value
            }
        })
    }
    handleFilterButton = () => {
        let element = (document.getElementById("filterInput")) as HTMLInputElement;
        var value = element.value;
        console.log(value);
        this.setState({
            IState: {
                ...this.state.IState,
                filterValue: value
            }
        })
    }
    filterChanged = () => {
        var element = (document.getElementById("filtertype")) as HTMLSelectElement;
        var index = element.selectedIndex;
        var value = element.options[index];
        this.setState({
            IState: {
                ...this.state.IState,
                filter: value.value
            }
        });
    }

    render() {

        let filteredPosts: Array<JSX.Element> = this.state.IState.PostsData.map(x =>(
            <Post key={Math.random()} title={x.title} addres={x.addres} sector={x.sector} general={x.general} />
        ));

        switch(this.state.IState.filter) {
            case "post" : { filteredPosts = this.state.IState.PostsData.filter(post => post.title === this.state.IState.filterValue).map(x =>(
                    <Post key={Math.random()} title={x.title} addres={x.addres} sector={x.sector} general={x.general} />
                ));
                break;
            }
            case "sector" : {filteredPosts = this.state.IState.PostsData.filter(post => post.sector.toString() === this.state.IState.filterValue).map(x =>(
                    <Post key={Math.random()} title={x.title} addres={x.addres} sector={x.sector} general={x.general} />
                ));
                break;
            }
        }

        return(
            <div>
                <DataNavBar />
                <Container>
                    <Grid container>
                        <Grid item>
                            <h4>Posten</h4>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item> {/*opsomming posten*/}
                            <Grid container>
                                <form onSubmit={this.handleFilter}>
                                    <Grid item>
                                        <select id="filtertype" onChange={this.filterChanged} value={this.state.IState.filter}>
                                            <option value="">No filter</option>
                                            <option value="post">Post</option>
                                            <option value="sector">Sector</option>
                                        </select>
                                    </Grid>
                                    <Grid item>
                                        <input id="filterInput" type="text" placeholder="sector"></input>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="outlined" onClick={this.handleFilterButton}>filter</Button>
                                    </Grid>
                                </form>
                            </Grid>
                            <div>
                                {filteredPosts}
                            </div>
                        </Grid>
                        <Grid item> {/*map*/}

                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default Posts;