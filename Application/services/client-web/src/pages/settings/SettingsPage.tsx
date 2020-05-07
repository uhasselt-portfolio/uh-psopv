import React, {Component} from 'react';
import {Grid, Button, Container} from '@material-ui/core';
import { AppState } from '../../Redux/store';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchSettings, postSettings} from './SettingsAction';

interface IState {
    changing: boolean
}

type Props = LinkStateProps & LinkDispatchToProps;

class Settings extends Component<Props> {
    state : IState = {
        changing: false
    }

    componentWillMount = () => {
        this.props.fetchSettings();
    }

    handleButtonChange = () => {
        this.setState({
            changing : ! this.state.changing
        })
    }

    handleButtonSave = () => {
        var value = ((document.getElementById("input")) as HTMLInputElement).value;
        if( (value !== "") && (value !== this.props.positionDelay.toString())) {
            this.props.postSettings(parseInt(value.valueOf()));
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
                        {this.props.errormessage !== '' && <p>Er trad een error op</p>}
                        { this.props.loading && <p>Settings aan het laden</p>}
                        { ! this.state.changing && this.props.errormessage === '' && ! this.props.loading &&
                            <p>Controle delay vrijwilliger locatie: {this.props.positionDelay}</p>}
                        {this.state.changing && this.props.errormessage === '' && ! this.props.loading &&
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
                        { ! this.state.changing && this.props.errormessage === '' && ! this.props.loading &&
                        <Button variant="outlined" onClick={this.handleButtonChange}>Verander</Button>}
                        { this.state.changing && this.props.errormessage === '' && ! this.props.loading &&
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
    positionDelay: Number,
    loading: boolean,
    errormessage: string
}
const MapStateToProps = (state : AppState): LinkStateProps => {
    return {
        positionDelay: state.SettingsReducer.positionDelay,
        loading: state.SettingsReducer.loading,
        errormessage: state.SettingsReducer.errorMessage
    }
}

interface LinkDispatchToProps {
    postSettings: (newDelay: Number) => any,
    fetchSettings: () => any
}
const MapDispatchToProps = (dispatch: any) : LinkDispatchToProps => {
    return bindActionCreators({
        postSettings, fetchSettings
    },dispatch);
}

// export default Overview
export default connect(
    MapStateToProps, MapDispatchToProps
)(Settings);