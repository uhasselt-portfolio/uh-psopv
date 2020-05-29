import React, {Component} from 'react';
import Problem from '../../Components/ProblemComp';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ProblemInterface from '../../interfaces/ProblemDataInterface';
import {fetchProblem} from './ProblemAction';
import { AppState } from '../../Redux/store';
import {Grid } from '@material-ui/core';

type Props = LinkStateProps  & LinkDispatchToProps;

/**
 * @author Wouter Grootjans
 */
class Problems extends Component<Props> {

    componentWillMount = () => {
        this.props.fetchProblem();
    }

    render() {
        let ProblemsUI: Array<JSX.Element> = this.props.problems.map(x => (
            <Problem problemType={x.problemType}
                    priority={x.priority}
                    discription={x.discription}
                    shiftName={x.shiftName}
                    timeStamp={x.timeStamp}
                    post={x.post}
                    postId={x.postId}
                    user={x.user}
                    sender={x.sender}
                    latitude={x.latitude} 
                    longitude={x.longitude}
                    solved={x.solved}
                    id={x.id}
                    key={x.id.toString()}
            />
        ));
        
        return(
            <div>
                <Grid container justify="center">
                    <Grid item>
                        <h4>Problemen</h4>
                    </Grid>
                </Grid>
                <div>
                    {this.props.loading && 
                        <p>Problemen aan het inladen</p>}
                    {this.props.errorMessage !== '' && 
                        <p>Er trad een probleem op: {this.props.errorMessage}</p>}
                    {this.props.isProblemFetched && 
                        ProblemsUI}
                    {this.props.isProblemFetched && ! this.props.loading && ProblemsUI.length === 0 &&
                        <p>Geen problemen gevonden</p>}
                </div>

            </div>
        );
    } 
}

interface LinkStateProps {
    problems: ProblemInterface[],
    isProblemFetched: boolean,
    loading: boolean,
    errorMessage:string,
}
function mapStateToProps(state: AppState) : LinkStateProps{
    return({
        isProblemFetched: state.ProblemReducer.isProblemFetched,
        loading: state.ProblemReducer.loading,
        errorMessage: state.ProblemReducer.errorMessage,
        problems: state.ProblemReducer.problems
    })
}

interface LinkDispatchToProps {
    fetchProblem: any
}
const MapDispatchToProps = (dispatch: any) : LinkDispatchToProps => {
    return bindActionCreators({
        fetchProblem
    }, dispatch);
}

export default connect(
    mapStateToProps, MapDispatchToProps
)(Problems);