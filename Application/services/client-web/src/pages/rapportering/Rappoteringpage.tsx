import React, {Component} from 'react';
import {Button, Grid} from '@material-ui/core';
import {connect} from 'react-redux';
import { AppState } from '../../Redux/store';
import {bindActionCreators} from 'redux';
import {generatepdf} from './RapporteringAction';
import jsPDF from 'jspdf';
import ProblemDataInterface from '../../interfaces/ProblemDataInterface';

const style= {
    margin: '10px',
    height: '100%',
}
const ButtonStyle = {
    background: 'rgb(21,95,160)',
    color: 'white',
}

type Props = LinkStateProps & LinkDispatchToProps;

class Rapportering extends Component<Props> {

    generatepdf = () => {
        console.log("generatepdf");
        this.props.generatepdf();
    }

    render() {

        if (this.props.pdfGenerated) {
            var doc = new jsPDF();
            let title: String = 'problemen ' + (new Date()).getFullYear();
            doc.text(title, 80,10);
            doc.setFontSize(11);
            let height: number = 20;
            for (let i = 0; i < this.props.problems.length; ++i) {
                let problem: ProblemDataInterface = this.props.problems[i];
                doc.text(problem.problemType,10,height);
                doc.text(problem.discription,10,height + 5);
                doc.text("shift: " + problem.shiftName,10,height + 10);
                doc.text(problem.timeStamp,50,height + 10);
                doc.text("post: " + problem.post,10,height + 15);
                doc.text("vrijwilliger: " + problem.user,10,height + 20);
                if (problem.solved) {
                    doc.setTextColor(0,128,0);
                    doc.text("het probleem is opgelost",15,height + 25);
                } else {
                    doc.setTextColor(255,0,0);
                    doc.text("het probleem is niet opgelost",15,height + 25);
                }
                doc.setTextColor(0,0,0);
                doc.text("________________________________________________________________",10,height + 30);
                height += 35;
                if ((i % 7) == 0 && i > 0) {
                    doc.addPage();
                    height = 20;
                }
                    
            }
            window.open(doc.output('bloburl'), '_blank');
        }

        return(
            <div style={style}>
                <Grid container direction="column" justify="center">
                    <Grid item style={style}>
                        <Button onClick={this.generatepdf} variant="outlined" style={ButtonStyle}>Genereer pdf</Button>
                    </Grid>
                    <Grid item>
                        {this.props.pdfGenerated && <embed src= "test.pdf" width= "100%" height= "750px"></embed>}
                        {! this.props.pdfGenerated && <h5>Nog geen verslag gegenereerd</h5>}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

interface LinkStateProps {
    pdfGenerated: boolean,
    problems: ProblemDataInterface[]
}
const MapStateToProps = (state : AppState): LinkStateProps => {
    return {
        pdfGenerated: true,
        problems: state.RapporeringReducer.allProblems
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