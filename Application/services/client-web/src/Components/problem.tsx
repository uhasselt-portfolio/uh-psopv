import React, {Component} from 'react';
// import '../css/Problem.css';

interface ProblemState {
    ProblemType: string,
    Priority: Number,
    Discription: string,
    TimeStamp?: string, //question mark for optional parameter
    ShiftName?: string,
    Post?: string,
    User?: string,
    Sender?: string
}

class Problem extends Component<ProblemState> {
    state = {       //the state is pure visual information
        ProblemState: {
            ProblemType: "",
            Priority: null,
            Discription: "",
            TimeStamp: "",
            ShiftName: "",
            Post: "",
            User: "",
            Sender: ""
        }
    }

    componentDidMount() {
        this.setState({
            ProblemState: this.props
        });
    }

    render() {

        return(
            <div className="problem container card">
                <h4 className="center">{this.state.ProblemState.ProblemType}</h4>
                <p>{this.state.ProblemState.Discription}</p>
                <div className="row">
                    <p className="col">Shift: {this.state.ProblemState.ShiftName}</p>
                    <p className="col">{this.state.ProblemState.TimeStamp}</p>
                </div>
                <p>Post: {this.state.ProblemState.Post}</p>
                <p>Gaat over: {this.state.ProblemState.User}</p>
                <p>Gemeld door: {this.state.ProblemState.Sender}</p>
            </div>
        );
    }
}

export default Problem;