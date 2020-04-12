import React, {Component} from 'react';
import {Grid, Button, Container} from '@material-ui/core';
import { AppState } from '../../Redux/Reducers';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {ActionChangeDelay} from '../../Redux/Actions';
import {Actions} from '../../Redux/Reducers';

interface IState {
    changing: boolean
}

type Props = LinkStateProps & LinkDispatchToProps;

class Settings extends Component<Props> {
    state : IState = {
        changing: false
    }

    handleButtonChange = () => {
        this.setState({
            changing : ! this.state.changing
        })
    }

    handleButtonSave = () => {
        var value = ((document.getElementById("input")) as HTMLInputElement).value;
        if( (value !== "") && (value !== this.props.positionDelay.toString())) {
            this.props.changeDelay(parseInt(value.valueOf()));
            //TODO controle van server dat verandering gelukt is => zoja this.handleButtonChange();
        } else {
            this.handleButtonChange();
        }
            
    }

    render() {
        return(
            <Container>
                <Grid container direction="column">
                    <Grid item>
                        { ! this.state.changing && <p>Controle delay vrijwilliger locatie: {this.props.positionDelay}</p>}
                        {this.state.changing && 
                            <Grid container>
                                <Grid item>
                                    <p>Controle delay vrijwilliger locatie: </p>
                                </Grid>
                                <Grid item>
                                    <input type="number" id="input" placeholder={this.props.positionDelay.toString()}/>
                                </Grid>
                            </Grid>
                        }
                        
                    </Grid>
                    <Grid item>
                        { ! this.state.changing && <Button variant="outlined" onClick={this.handleButtonChange}>Verander</Button>}
                        { this.state.changing && 
                            <Grid container>
                                <Grid item>
                                    <Button variant="outlined" onClick={this.handleButtonSave}>Save</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" onClick={this.handleButtonChange}>Discard</Button>
                                </Grid>
                            </Grid>
                            }
                        
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

interface LinkStateProps {
    positionDelay: Number
}

const MapStateToProps = (state : AppState): LinkStateProps => {
    return {
        positionDelay: state.Globalreducer.positionDelay
    }
}

interface LinkDispatchToProps {
    changeDelay: (newDelay: Number) => void
}
const MapDispatchToProps = (dispatch: Dispatch<Actions>) : LinkDispatchToProps => {
    return {
        changeDelay: (newDelay: Number) => {dispatch(ActionChangeDelay(newDelay))}
    }
}

// export default Overview
export default connect(
    MapStateToProps, MapDispatchToProps
)(Settings);