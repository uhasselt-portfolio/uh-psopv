import React, {Component} from 'react';
import {Button, Grid} from '@material-ui/core';
import {connect} from 'react-redux';
import { AppState } from '../../Redux/store';
import {bindActionCreators} from 'redux';
import {generatepdf} from './RapporteringAction';

const style= {
    margin: '10px'
}

type Props = LinkStateProps & LinkDispatchToProps;

class Rapportering extends Component<Props> {

    generatepdf = () => {
        console.log("generatepdf");
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
        pdfGenerated: state.RapporeringReducer.pdfGenerated
    };
}

interface LinkDispatchToProps {
    generatepdf: () => any
}
const MapDispatchToProps = (dispatch: any) : LinkDispatchToProps => {
    return bindActionCreators({
        generatepdf
    },dispatch);
}

// export default Overview
export default connect(
    MapStateToProps, MapDispatchToProps
)(Rapportering);