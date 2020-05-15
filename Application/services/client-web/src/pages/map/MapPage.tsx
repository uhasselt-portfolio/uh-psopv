import React, {Component} from 'react';
import PostDataInterface from '../../interfaces/PostDataInterface';
import ProblemDataInterface from '../../interfaces/ProblemDataInterface';
import UserDataInterface from '../../interfaces/UserDataInterface';
import { AppState } from '../../Redux/store';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchMap} from './MapAction';
import MyMap from './Map';

type Props = LinkStateProps & LinkDispatchToProps;

class PukkelpopMap extends Component<Props> {

    componentWillMount = () => {
        this.props.fetchMap();          
        setInterval(this.props.fetchMap,300000);
    }

    render() {

        let sortedProblems : ProblemDataInterface[][] = [];
        for (let i = 0; i < this.props.problems.length; ++i) {
            let cur : ProblemDataInterface = this.props.problems[i];
            let inside: boolean = false;
            for (let j = 0; j < sortedProblems.length; ++j) {
                if (sortedProblems[j][0].postId === cur.postId) {
                    sortedProblems[j].push(cur);
                    inside = true;
                    break;
                }
            }
            if (! inside) {
                sortedProblems.push([cur]);
            }
        }

        let postsWithouProblems : PostDataInterface[] = [];
        for (let i = 0; i < this.props.posts.length; ++i) {
            let noProblem = true;
            for (let j = 0; j < this.props.problems.length; ++j) {
                if (this.props.posts[i].id === this.props.problems[j].postId)
                    noProblem = false;
            }
            if (noProblem)
                postsWithouProblems.push(this.props.posts[i]);
        }

        return(
            <div>
                {this.props.isMapFetched && <MyMap problems={sortedProblems} users={this.props.users} posts={postsWithouProblems} isMarkerClickable={true}/>}  
            </div>
        );
    }
}

interface LinkStateProps {
    posts: PostDataInterface[],
    problems: ProblemDataInterface[],
    users: UserDataInterface[],
    loading: boolean,
    isMapFetched: boolean,
    errorMessage: string
}
const MapStateToProps = (state : AppState): LinkStateProps => {
    return {
        posts: state.MapReducer.posts,
        problems: state.MapReducer.problems,
        users: state.MapReducer.users,
        loading: state.MapReducer.loading,
        isMapFetched: state.MapReducer.isMapFetched,
        errorMessage: state.MapReducer.errorMessage
    }
}

interface LinkDispatchToProps {
    fetchMap: any
}
const MapDispatchToProp = (dispatch: any) : LinkDispatchToProps => {
    return bindActionCreators({
        fetchMap
    }, dispatch);
}

// export default Overview
export default connect(
    MapStateToProps, MapDispatchToProp
)(PukkelpopMap);