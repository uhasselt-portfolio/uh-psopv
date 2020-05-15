import React, {Component} from 'react';
import {Grid} from '@material-ui/core';
import OverviewCom from './OverviewComp';
import {connect} from 'react-redux';
import PostDataInterface from '../../interfaces/PostDataInterface';
import ProblemDataInterface from '../../interfaces/ProblemDataInterface';
import UserDataInterface from '../../interfaces/UserDataInterface';
import { AppState } from '../../Redux/store';
import {bindActionCreators} from 'redux';
import {fetch} from './OverviewAction';
import MyMap from '../map/Map';


const styleBorder = {
    width: '45%',
    height: '100%'
} 
const styleMap = {
    height: '100%',
    width: '55%'
}

type Props = LinkStateProps & LinkDispatchToProps;

class Overview extends Component<Props> {

    componentWillMount = () => {
        this.props.fetch();
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
                <Grid container>
                    <Grid item style={styleBorder}>
                        <OverviewCom />
                    </Grid>
                    <Grid item style={styleMap}>
                        {this.props.isMapFetched && <MyMap problems={sortedProblems} users={this.props.users} posts={postsWithouProblems} isMarkerClickable={true}/>}  
                    </Grid>
                </Grid>
            </div>
        );
    }
}

interface LinkStateProps {
    posts: PostDataInterface[],
    problems: ProblemDataInterface[],
    users: UserDataInterface[],
    isMapFetched: boolean
}
const MapStateToProps = (state : AppState): LinkStateProps => {
    return {
        posts: state.OverviewReducer.posts,
        problems: state.OverviewReducer.problems,
        users: state.OverviewReducer.users,
        isMapFetched: state.OverviewReducer.isMapFetched
    }
}

interface LinkDispatchToProps {
    fetch : () => any
}
const MapDispatchToProps = (dispatch: any) : LinkDispatchToProps => {
    return bindActionCreators({
        fetch
    },dispatch);
}


// export default Overview
export default connect(
    MapStateToProps, MapDispatchToProps
)(Overview);