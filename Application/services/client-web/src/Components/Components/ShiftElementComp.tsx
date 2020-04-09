import React, {Component} from 'react';
import {Grid, Button} from '@material-ui/core';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {ActionShiftChanged} from '../../Redux/Actions';
import {Actions} from '../../Redux/Reducers';

const style= {
    border: 'solid 1px black',
    margin: '2px 2px 2px 2px',
    padding: '4px'
}

interface IProps {
    postId: Number,
    post: string,
    userId: Number,
    user: string;
    shiftId: Number
}

interface IState {
    changing: boolean
}

type Props = LinkDispatchToProps & IProps;

class ShiftElement extends Component<Props> {
    state : IState = {
        changing : false
    }

    handleButtonSwitchChange = () => {
        this.setState({
            changing: ! this.state.changing
        });
    }

    handleButtonSave = () => {
        var inputelement = (document.getElementById("input")) as HTMLInputElement;
        var newUser : string = inputelement.value;
        if (newUser !== this.props.user && newUser !== "") {
            this.props.shiftChanged(this.props.shiftId,newUser);
        }
        this.setState({
            changing: false
        })
    }

    render() {
        return(
            <Grid container justify="space-evenly" style={style}> {/*TODO als ik er een from rondzet wordt de layout niet meer goed, maar form is wel meerwaarde*/}
                    <Grid item>
                        <p>post: {this.props.post}</p>
                    </Grid>
                    <Grid item>
                        { ! this.state.changing && <p>vrijwilliger: {this.props.user}</p>}
                        { this.state.changing && <input type="text" id="input" placeholder={this.props.user} />}
                    </Grid>
                    <Grid item>
                        { ! this.state.changing && <Button variant="outlined" onClick={this.handleButtonSwitchChange}>change</Button>}
                        { this.state.changing && 
                            <Grid container justify="space-between">
                                <Grid item>
                                    <Button variant="outlined" onClick={this.handleButtonSave}>Save</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" onClick={this.handleButtonSwitchChange}>Discard</Button>
                                </Grid>
                            </Grid>
                        }
                    </Grid>
            </Grid>
        );
    }
}

interface LinkDispatchToProps {
    shiftChanged: (changedShiftid: Number, newUser: string) => void
}

const MapDispatchToProps = (
    dispatch: Dispatch<Actions>,
    ownProps: IProps
): LinkDispatchToProps => {
    return {
        shiftChanged: (changedShiftid: Number, newUser: string) => {dispatch(ActionShiftChanged(changedShiftid,newUser))}
    };
}

export default connect(
    null,MapDispatchToProps
)(ShiftElement);