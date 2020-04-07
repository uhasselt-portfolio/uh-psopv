import React, {Component, FormEvent} from 'react';
import DataNavBar from '../NavBars/DataNavBarComp';
import Post from '../Components/PostComp';
import {Container, Grid, Button} from '@material-ui/core';
import PostInterface from '../Interfaces/PostDataInterface';
import { withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import { AppState } from '../../Redux/Reducers';
import {connect} from 'react-redux';

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
}

interface IPropsMyMapComponent {
    isMarkerShown: boolean
}

type Props = LinkStateProps // & LinkDispatchProps;

class Posts extends Component<Props> {
    state: IState = {
            filter: "",
            filterValue: ""
    }

    handleFilterForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.handleFilter();
    }
    handleFilter = () => {
        let element = (document.getElementById("filterInput")) as HTMLInputElement;
        var value = element.value;
        console.log(value);
        this.setState({
                ...this.state,
                filterValue: value
        })
    }
    filterChanged = () => {
        var element = (document.getElementById("filtertype")) as HTMLSelectElement;
        var index = element.selectedIndex;
        var value = element.options[index];
        this.setState({
                ...this.state,
                filter: value.value
        });
    }

    handlePostMarkerClicked = (clicked : string) => {
        var Selectelement = (document.getElementById("filtertype")) as HTMLSelectElement;
        Selectelement.value = "post";
        var Inputelement = (document.getElementById("filterInput")) as HTMLInputElement;
        Inputelement.value = clicked;
        this.setState({
                ...this.state,
                filter: "post",
                filterValue: clicked
        });
    }

    render() {
        let filteredPosts: Array<JSX.Element> = this.props.posts.map(x =>(
            <Post key={Math.random()} title={x.title} addres={x.addres} sector={x.sector} general={x.general} latitude={x.latitude} longitude={x.longitude} />
        ));
        let markers: Array<JSX.Element> = this.props.posts.map(x => (
            <Marker position={{lat: x.latitude, lng: x.longitude}} label={x.title} options={{icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'}} onClick={(e) => this.handlePostMarkerClicked(x.title)}/>
        ));

        switch(this.state.filter) {
            case "post" : { filteredPosts = this.props.posts.filter(post => post.title === this.state.filterValue).map(x =>(
                    <Post key={Math.random()} title={x.title} addres={x.addres} sector={x.sector} general={x.general} latitude={x.latitude} longitude={x.longitude} />
                ));
                markers = this.props.posts.filter(post => post.title === this.state.filterValue).map(x =>(
                    <Marker position={{lat: x.latitude, lng: x.longitude}} label={x.title} options={{icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'}} onClick={(e) => this.handlePostMarkerClicked(x.title)}/>
                ));
                break;
            }
            case "sector" : {filteredPosts = this.props.posts.filter(post => post.sector.toString() === this.state.filterValue).map(x =>(
                    <Post key={Math.random()} title={x.title} addres={x.addres} sector={x.sector} general={x.general} latitude={x.latitude} longitude={x.longitude}/>
                ));
                markers = this.props.posts.filter(post => post.sector.toString() === this.state.filterValue).map(x =>(
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
                                <form onSubmit={this.handleFilterForm}>
                                    <Grid item>
                                        <select id="filtertype" onChange={this.filterChanged} value={this.state.filter}>
                                            <option value="">No filter</option>
                                            <option value="post">Post</option>
                                            <option value="sector">Sector</option>
                                        </select>
                                    </Grid>
                                    <Grid item>
                                        <input id="filterInput" type="text" placeholder="sector"></input>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="outlined" onClick={this.handleFilter}>filter</Button>
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

interface LinkStateProps {
    posts: PostInterface[],
}

const MapStateToProps = (state : AppState): LinkStateProps => {
    return {
        posts: state.reducer.Posts,
    }
}

// export default Overview
export default connect(
    MapStateToProps,
)(Posts);