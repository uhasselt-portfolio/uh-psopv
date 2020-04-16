import React, {Component, FormEvent} from 'react';
import DataNavBar from '../../navBars/DataNavBarComp';
import Post from '../../Components/PostComp';
import {Container, Grid, Button} from '@material-ui/core';
import PostInterface from '../../interfaces/PostDataInterface';
import { withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import { AppState } from '../../Redux/store';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchPosts} from './PostAction';

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

type Props = LinkStateProps & LinkDispatchToProps;

class Posts extends Component<Props> {
    state: IState = {
            filter: "",
            filterValue: ""
    }

    componentWillMount = () => {
        this.props.fetchPosts();
    }

    handleFilterForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.handleFilter();
    }
    handleFilter = () => {
        let element = (document.getElementById("filterInput")) as HTMLInputElement;
        var value = element.value;
        this.setState({
                ...this.state,
                filterValue: value
        })
    }
    filterChanged = () => {
        var filterElement = (document.getElementById("filtertype")) as HTMLSelectElement;
        var index = filterElement.selectedIndex;
        var filterValue = filterElement.options[index];
        let valueElement = (document.getElementById("filterInput")) as HTMLInputElement;
        var valueValue = valueElement.value;
        this.setState({
                filterValue: valueValue,
                filter: filterValue.value
        });
 
    }

    handlePostMarkerClicked = (clicked : string) => {
        var selectelement = (document.getElementById("filtertype")) as HTMLSelectElement;
        selectelement.value = "post";
        var inputelement = (document.getElementById("filterInput")) as HTMLInputElement;
        inputelement.value = clicked;
        this.setState({
                ...this.state,
                filter: "post",
                filterValue: clicked
        });
    }

    render() {
        let filteredPosts: Array<JSX.Element> = this.props.posts.map(x =>(
            <Post key={Math.random()} id={x.id} title={x.title} addres={x.addres} sector={x.sector} general={x.general} latitude={x.latitude} longitude={x.longitude} />
        ));
        let markers: Array<JSX.Element> = this.props.posts.map(x => (
            <Marker position={{lat: x.latitude, lng: x.longitude}} label={x.title} options={{icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'}} onClick={(e) => this.handlePostMarkerClicked(x.title)}/>
        ));

        switch(this.state.filter) {
            case "post" : { filteredPosts = this.props.posts.filter(post => post.title === this.state.filterValue).map(x =>(
                    <Post key={Math.random()} id={x.id} title={x.title} addres={x.addres} sector={x.sector} general={x.general} latitude={x.latitude} longitude={x.longitude} />
                ));
                markers = this.props.posts.filter(post => post.title === this.state.filterValue).map(x =>(
                    <Marker position={{lat: x.latitude, lng: x.longitude}} label={x.title} options={{icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'}} onClick={(e) => this.handlePostMarkerClicked(x.title)}/>
                ));
                break;
            }
            case "sector" : {filteredPosts = this.props.posts.filter(post => post.sector.toString() === this.state.filterValue).map(x =>(
                    <Post key={Math.random()} id={x.id} title={x.title} addres={x.addres} sector={x.sector} general={x.general} latitude={x.latitude} longitude={x.longitude}/>
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
                <DataNavBar tab={2}/>
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
                                        <input id="filterInput" type="text" placeholder={this.state.filter}></input>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="outlined" onClick={this.handleFilter}>filter</Button>
                                    </Grid>
                                </form>
                            </Grid>
                            <div>
                                {filteredPosts.length > 0 && filteredPosts}
                                {filteredPosts.length === 0 && <p>Geen posten beschikbaar</p>}
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
        posts: state.PostReducer.posts,
    }
}

interface LinkDispatchToProps {
    fetchPosts: () => any
}
const MapDispatchToProps = (dispatch: any) : LinkDispatchToProps => {
    return bindActionCreators({
        fetchPosts
    },dispatch);
}

export default connect(
    MapStateToProps, MapDispatchToProps
)(Posts);