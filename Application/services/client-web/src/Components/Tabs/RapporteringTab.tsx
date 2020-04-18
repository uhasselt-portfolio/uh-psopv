import React, {Component} from 'react';
import {Button, Grid} from '@material-ui/core';
import {AppState} from '../../Redux/Reducers';
import {connect} from 'react-redux';
import {ActionGeneratePdf} from '../../Redux/Actions';
import {Actions} from '../../Redux/Reducers';
import {Dispatch} from 'redux';

const style= {
    margin: '10px'
}

type Props = LinkStateProps & LinkDispatchProps;

class Rapportering extends Component<Props> {

    generatepdf = () => {
        console.log("generatepdf");
        // axios.get("server/genpdf")
        //     .then(res => {
        //         window.open('../temp.pdf');
        //     })
        this.props.generatepdf();
    }

    render() {
        return(
            <Grid container direction="column" justify="center" style={style}>
                <Grid item style={style}>
                    <Button onClick={this.generatepdf} variant="outlined">Genereer pdf</Button>
                </Grid>
                <Grid item>
                    {this.props.pdfGenerated && <embed src= "test.pdf" width= "100%" height= "750px"></embed>}
                    {! this.props.pdfGenerated && <h5>Nog geen verslag gegenereerd</h5>}
                </Grid>
            </Grid>
        );
    }
}

interface LinkStateProps {
    pdfGenerated: boolean
}

const MapStateToProps = (state : AppState): LinkStateProps => {
    return {
        pdfGenerated: state.Globalreducer.pdfGenerated
    };
}

interface LinkDispatchProps {
    generatepdf: () => void
}

const MapDispatchToProps = (
    dispatch: Dispatch<Actions>,
    // ownProps: OwnProps
): LinkDispatchProps => {
    return {
        generatepdf: () => {dispatch(ActionGeneratePdf())}
    };
}

// export default Overview
export default connect(
    MapStateToProps, MapDispatchToProps
)(Rapportering);