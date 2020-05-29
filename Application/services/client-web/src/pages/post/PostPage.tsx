import React, {Component} from 'react';
import Post from '../../Components/PostComp';
import {Container, Grid, Button, TextField, MenuItem} from '@material-ui/core';
import PostInterface from '../../interfaces/PostDataInterface';
import { AppState } from '../../Redux/store';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchPosts} from './PostAction';
import MyMap from '../map/Map';

const styleBorder = {
    width: '40%',
    height: '100%',
    padding: '5px',
} 
const styleMap = {
    height: '600px',
    width: '60%'
}
const styleFormElement = {
    margin: '4px'
}
const styleFilter = {
    background: 'rgb(242,242,250)',
    padding: '10px',
    borderRadius: '25px',
    width: '75%',
    textAlign: 'center' as 'center'
}
const ButtonStyle = {
    background: 'rgb(3,57,108)',
    color: 'white',
    margin: '4px'
}

interface IState {
    filter: string,
    filterValue: string
}

type Props = LinkStateProps & LinkDispatchToProps;

/**
 * @author Wouter Grootjans
 */
class Posts extends Component<Props> {
    state: IState = {
            filter: "Geen filter",
            filterValue: ""
    }

    componentWillMount = () => {
        this.props.fetchPosts();
    }

    /**
     * function gets called when user commits form without pressing the search button
     * used to prevent default behavior of html submit
     */
    handleFilterForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.handleFilter();
    }
    /**
     * gets called when the filtervalue is changed
     * the state gets changed to contain the search values of the user
     * filter gets applied
     */
    handleFilter = () => {
        let element = (document.getElementById("filterInput")) as HTMLInputElement;
        var value = element.value;
        this.setState({
                ...this.state,
                filterValue: value
        })
    }
    /**
     * gets called when the filter is changed
     * the state gets changed to contain the new filter
     * filter gets applied
     */
    handleFilterChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        let valueElement = (document.getElementById("filterInput")) as HTMLInputElement;
        var valueValue = valueElement.value;
        this.setState({
                filterValue: valueValue,
                filter: event.target.value
        });
 
    }

    render() {
        let filteredPostsComp: Array<JSX.Element> = this.props.posts.map(x =>(
            <Post key={Math.random()} id={x.id} title={x.title} addres={x.addres} sector={x.sector} general={x.general} latitude={x.latitude} longitude={x.longitude} shifts={x.shifts} users={x.users} activeProblem={x.activeProblem}/>
        ));
        let filteredPosts: PostInterface[] = this.props.posts;

        switch(this.state.filter) {
            case "Post" : { filteredPostsComp = this.props.posts.filter(post => post.title === this.state.filterValue).map(x =>(
                    <Post key={Math.random()} id={x.id} title={x.title} addres={x.addres} sector={x.sector} general={x.general} latitude={x.latitude} longitude={x.longitude}  shifts={x.shifts} users={x.users} activeProblem={x.activeProblem}/>
                ));
                filteredPosts = this.props.posts.filter(post => post.title === this.state.filterValue);
                break;
            }
            case "Sector" : {filteredPostsComp = this.props.posts.filter(post => post.sector.toString() === this.state.filterValue).map(x =>(
                    <Post key={Math.random()} id={x.id} title={x.title} addres={x.addres} sector={x.sector} general={x.general} latitude={x.latitude} longitude={x.longitude}  shifts={x.shifts} users={x.users} activeProblem={x.activeProblem}/>
                ));
                filteredPosts = this.props.posts.filter(post => post.sector.toString() === this.state.filterValue);
                break;
            }
        }

        console.log("posts",filteredPosts);

        return(
            <div>
                <Container>
                    <Grid container>
                        <Grid item style={styleBorder}>
                            <Grid container justify="center">
                                <form onSubmit={this.handleFilterForm} style={styleFilter}>
                                    <Grid item>
                                        <TextField
                                            id="filter"
                                            select
                                            label="filter"
                                            value={this.state.filter}
                                            onChange={this.handleFilterChanged}
                                            helperText="Selecteer een filter"
                                            variant="outlined"
                                            style={styleFormElement}
                                            >
                                            <MenuItem value={'Geen filter'}>Geen filter</MenuItem>
                                            <MenuItem value={'Post'}>Post</MenuItem>
                                            <MenuItem value={'Sector'}>Sector</MenuItem>
                                            </TextField>
                                    </Grid>
                                    <Grid item>
                                        <TextField variant="outlined" id="filterInput" type="text" placeholder={this.state.filter}></TextField>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="outlined" onClick={this.handleFilter} style={ButtonStyle}>filter</Button>
                                    </Grid>
                                </form>
                            </Grid>
                            <div>
                                {filteredPostsComp.length > 0 && filteredPostsComp}
                                {filteredPostsComp.length === 0 && <p>Geen posten beschikbaar</p>}
                            </div>
                        </Grid>
                        <Grid item style={styleMap}>
                            {this.props.isMapFetched && <MyMap height={100} problems={[]} users={[]} posts={filteredPosts} isMarkerClickable={true}/>} 
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}

interface LinkStateProps {
    posts: PostInterface[],
    isMapFetched: boolean
}
const MapStateToProps = (state : AppState): LinkStateProps => {
    return {
        posts: state.PostReducer.posts,
        isMapFetched: state.PostReducer.isMapFetched
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