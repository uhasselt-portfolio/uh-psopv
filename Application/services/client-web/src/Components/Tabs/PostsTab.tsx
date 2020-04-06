import React, {Component, FormEvent} from 'react';
import DataNavBar from '../NavBars/DataNavBarComp';
import Post from '../PostComp';
import {Container, Grid, Button} from '@material-ui/core';
import PostInterface from '../Interfaces/PostDataInterface';
import { withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";

const styleBorder = {
    border: 'solid 1px black',
    width: '40%',
    height: '100%',
    padding: '5px',
} 
const styleMap = {
    height: '600px',
    width: '60%'
}

interface IState {
    filter: string,
    filterValue: string,
    PostsData: [PostInterface]
}

interface IPropsMyMapComponent {
    isMarkerShown: boolean
}


class Posts extends Component {
    state = {
        IState: {
            filter: "",
            filterValue: "",
            PostsData: [
                { title: "post", addres: "addres", sector: 1, general: "generalpost", latitude: 50.962595, longitude: 5.358503 },
                { title: "Parking1", addres: "Visserstraat 27", sector: 1, general: "Parking Controle", latitude: 50.962068, longitude: 5.358836 },
                { title: "Parking2", addres: "Berglaan 5", sector: 1, general: "Parking Controle", latitude: 50.963642, longitude: 5.359328 },
                { title: "Parking3", addres: "Hemelstraat 164", sector: 1, general: "Parking Controle", latitude: 50.963257, longitude: 5.356721 },
                { title: "Parking4", addres: "Pukkelpoplaan 1", sector: 3, general: "Parking Controle", latitude: 50.963902, longitude: 5.355056 },
                { title: "Drank stand 1", addres: "Terein", sector: 2, general: "Dranken Stand", latitude: 50.964240, longitude: 5.360195 },
                { title: "Schoonmaak terein", addres: "Terein", sector: 2, general: "Schoonmaak", latitude: 50.961780, longitude: 5.361407 },
                { title: "Security", addres: "terein", sector: 2, general: "Security", latitude: 50.962595, longitude: 5.358503 },
                { title: "Straat-affzetting1", addres: "Rodeberg - Geraardslaan", sector: 4, general: "Straatafzetting", latitude: 50.962595, longitude: 5.358503 },
                { title: "Straat-affzetting2", addres: "Addelbaan - Rodeberg", sector: 4, general: "Straatafzetting", latitude: 50.962595, longitude: 5.358503 },
                { title: "Straat-affzetting3", addres: "Visserstraat - Geraardslaan", sector: 1, general: "Straatafzetting", latitude: 50.962595, longitude: 5.358503 }
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

    handlePostMarkerClicked = (clicked : string) => {
        var Selectelement = (document.getElementById("filtertype")) as HTMLSelectElement;
        Selectelement.value = "post";
        var Inputelement = (document.getElementById("filterInput")) as HTMLInputElement;
        Inputelement.value = clicked;
        this.setState({
            IState: {
                ...this.state.IState,
                filter: "post",
                filterValue: clicked
            }
        });
    }

    render() {
        let filteredPosts: Array<JSX.Element> = this.state.IState.PostsData.map(x =>(
            <Post key={Math.random()} title={x.title} addres={x.addres} sector={x.sector} general={x.general} latitude={x.latitude} longitude={x.longitude} />
        ));
        let markers: Array<JSX.Element> = this.state.IState.PostsData.map(x => (
            <Marker position={{lat: x.latitude, lng: x.longitude}} label={x.title} options={{icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'}} onClick={(e) => this.handlePostMarkerClicked(x.title)}/>
        ));

        switch(this.state.IState.filter) {
            case "post" : { filteredPosts = this.state.IState.PostsData.filter(post => post.title === this.state.IState.filterValue).map(x =>(
                    <Post key={Math.random()} title={x.title} addres={x.addres} sector={x.sector} general={x.general} latitude={x.latitude} longitude={x.longitude} />
                ));
                markers = this.state.IState.PostsData.filter(post => post.title === this.state.IState.filterValue).map(x =>(
                    <Marker position={{lat: x.latitude, lng: x.longitude}} label={x.title} options={{icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'}} onClick={(e) => this.handlePostMarkerClicked(x.title)}/>
                ));
                break;
            }
            case "sector" : {filteredPosts = this.state.IState.PostsData.filter(post => post.sector.toString() === this.state.IState.filterValue).map(x =>(
                    <Post key={Math.random()} title={x.title} addres={x.addres} sector={x.sector} general={x.general} latitude={x.latitude} longitude={x.longitude}/>
                ));
                markers = this.state.IState.PostsData.filter(post => post.sector.toString() === this.state.IState.filterValue).map(x =>(
                    <Marker position={{lat: x.latitude, lng: x.longitude}} label={x.title} options={{icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'}} onClick={(e) => this.handlePostMarkerClicked(x.title)}/>
                ));
                break;
            }
        }

        const MyMapComponent = withScriptjs(withGoogleMap((props: IPropsMyMapComponent) =>
        <GoogleMap
            defaultZoom={15}
            defaultCenter={{ lat: 50.962595, lng: 5.358503 }}
        >
            {markers}
        </GoogleMap>
        ));

        return(
            <div>
                <DataNavBar />
                <Container>
                    <Grid container>
                        <Grid item style={styleBorder}> {/*opsomming posten*/}
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
                        <Grid item style={styleMap}> {/*map*/}
                            <MyMapComponent
                                isMarkerShown
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAT9J4RP-_5EPa6k4L9mY5SLld6rrJa-YM&v=3.exp&libraries=geometry,drawing,places"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `100%` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default Posts;