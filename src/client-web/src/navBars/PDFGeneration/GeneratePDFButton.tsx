import React, {Component} from 'react';
import {Button} from '@material-ui/core';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {generatepdf} from './PDFActions';


const ButtonStyle = {
    background: 'rgb(3,57,108)',
    color: 'white',
}

interface IProps {
    
}

type Props = IProps & LinkDispatchToProps;

/**
 * @author Wouter Grootjans
 */
class GeneratePdfButton extends Component<Props> {

    /**
     * generates the pdf
     */
    onClick = () => {
        this.props.generatepdf();
    }

    /**
     * renders the component
     */
    render = () => {
        return(
            <Button onClick={this.onClick} style={ButtonStyle}>Rapportering</Button>
        )
    }
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
    null, MapDispatchToProps
)(GeneratePdfButton);