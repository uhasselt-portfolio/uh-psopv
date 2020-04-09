import React, {Component} from 'react';
import DataNavBar from '../NavBars/DataNavBarComp';
import Problem from '../Components/ProblemComp';
import { AppState } from '../../Redux/Reducers';
import {connect} from 'react-redux';
import ProblemDataInterface from '../Interfaces/ProblemDataInterface';

type Props = LinkStateProps // & LinkDispatchProps;

class Problems extends Component<Props> {

    render() {
        let Problems: Array<JSX.Element> = this.props.problems.filter(problem => ! problem.solved).map(x => (
            <Problem problemType={x.problemType}
                    priority={x.priority}
                    discription={x.discription}
                    shiftName={x.shiftName}
                    timeStamp={x.timeStamp}
                    post={x.post}
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
                <DataNavBar tab={4}/>
                <h4>Problems</h4>
                <div>
                    {Problems}
                </div>

            </div>
        );
    } 
}

interface LinkStateProps {
    problems: ProblemDataInterface[]
}

const MapStateToProps = (state : AppState): LinkStateProps => {
    const openProblems: ProblemDataInterface[] = state.Problemreducer.Problems.filter(problem => ! problem.solved);
    return {
        problems: openProblems
    }
}

// export default Overview
export default connect(
    MapStateToProps,
)(Problems);