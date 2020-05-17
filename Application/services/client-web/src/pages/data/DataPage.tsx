import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import { Grid, Input } from '@material-ui/core';
import { AppState } from '../../Redux/store';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {uploadFile} from './DataActions';

const ButtonStyle = {
    background: 'rgb(21,95,160)',
    color: 'white',
    margin: '5px'
}
const uploadStyle = {
    margin: '5px'
}
const itemStyle = {
    marginLeft: '20px'
}
const fullWidthStyle = {
    width: '100%',
    margin: '5px'
}

interface IState  {
    isCreating : boolean,
    functiesFile : File | null,
    shiftenFile : File | null,
    hoofdfunctiesFile : File | null,
    maxBezettingenFile : File | null,
    bezettingenFile : File | null,
    appellijstFile : File | null,
    noFile: boolean
}

type Props = LinkStateProps & LinkDispatchToProps;

class Data extends Component<Props> {
    state : IState = {
        isCreating: true,
        functiesFile : null,
        shiftenFile : null,
        hoofdfunctiesFile : null,
        maxBezettingenFile : null,
        bezettingenFile : null,
        appellijstFile : null,
        noFile : false
    };

    /**
     * gets called when a file is selected to save it in the state
     */
    updateFile = (file : any, fileName : string) => {
        switch(fileName) {
            case "functies" : {
                this.setState({
                    ...this.state,
                    functiesFile: file.target.files[0],
                    noFile : false
                });
                break;
            }
            case "shiften" : {
                this.setState({
                    ...this.state,
                    shiftenFile: file.target.files[0],
                    noFile : false
                });
                break;
            }
            case "hoofdfuncties" : {
                this.setState({
                    ...this.state,
                    hoofdfunctiesFile: file.target.files[0],
                    noFile : false
                });
                break;
            }
            case "maxBezettingen" : {
                this.setState({
                    ...this.state,
                    maxBezettingenFile: file.target.files[0],
                    noFile : false
                });
                break;
            }
            case "bezettingen" : {
                this.setState({
                    ...this.state,
                    bezettingenFile: file.target.files[0],
                    noFile : false
                });
                break;
            }
            case "appellijst" : {
                this.setState({
                    ...this.state,
                    appellijstFile: file.target.files[0],
                    noFile : false
                });
                break;
            }
        }
    }

    /**
     * sends the file to the server
     */
    uploadFile = (fileName : string) => {
        let isUpdateMode : boolean = ! this.state.isCreating;
        switch(fileName) {
            case "functies" : {
                if (this.state.functiesFile !== null) {
                    this.setState({
                        ...this.state,
                        noFile : false
                    });
                    this.props.uploadFile(this.state.functiesFile,isUpdateMode);
                } else {
                    this.setState({
                        ...this.state,
                        noFile : true
                    });
                }
                break;
            }
            case "shiften" : {
                if (this.state.shiftenFile !== null) {
                    this.setState({
                        ...this.state,
                        noFile : false
                    });
                    this.props.uploadFile(this.state.shiftenFile,isUpdateMode);
                } else {
                    this.setState({
                        ...this.state,
                        noFile : true
                    });
                }
                break;
            }
            case "hoofdfuncties" : {
                if (this.state.hoofdfunctiesFile !== null) {
                    this.setState({
                        ...this.state,
                        noFile : false
                    });
                    this.props.uploadFile(this.state.hoofdfunctiesFile,isUpdateMode);
                } else {
                    this.setState({
                        ...this.state,
                        noFile : true
                    });
                }
                break;
            }
            case "maxBezettingen" : {
                if (this.state.maxBezettingenFile !== null) {
                    this.setState({
                        ...this.state,
                        noFile : false
                    });
                    this.props.uploadFile(this.state.maxBezettingenFile,isUpdateMode);
                } else {
                    this.setState({
                        ...this.state,
                        noFile : true
                    });
                }
                break;
            }
            case "bezettingen" : {
                if (this.state.bezettingenFile !== null) {
                    this.setState({
                        ...this.state,
                        noFile : false
                    });
                    this.props.uploadFile(this.state.bezettingenFile,isUpdateMode);
                } else {
                    this.setState({
                        ...this.state,
                        noFile : true
                    });
                }
                break;
            }
            case "appellijst" : {
                if (this.state.appellijstFile !== null) {
                    this.setState({
                        ...this.state,
                        noFile : false
                    });
                    this.props.uploadFile(this.state.appellijstFile,isUpdateMode);
                } else {
                    this.setState({
                        ...this.state,
                        noFile : true
                    });
                }
                break;
            }
        }
    }

    /**
     * switches the state between updating and creating new data
     */
    switch = () => {
        this.setState({
            ...this.state,
            isCreating : ! this.state.isCreating
        });
    }

    render() {
        return(
            <Grid container direction="row">
                <Grid container direction="row" alignItems="center" style={uploadStyle}>
                    <Grid item> 
                            <h4>mode: </h4>
                    </Grid>
                    <Grid item style={itemStyle}>
                        <Button variant="outlined" style={ButtonStyle} onClick={() => {this.switch()}}>{this.state.isCreating ? "create" : "update" }</Button>
                    </Grid>
                </Grid>
                <Grid container direction="row" alignItems="center" style={uploadStyle}>
                    <Grid item>
                        <h4>functies</h4>
                    </Grid>
                    <Grid item style={itemStyle}>
                        <Input type="file" onChange={(e) => {this.updateFile(e,"functies")}}/>
                    </Grid>
                    <Grid item style={itemStyle}>
                        <Button variant="outlined" style={ButtonStyle} onClick={() => {this.uploadFile("functies")}}>Upload</Button>
                    </Grid>
                </Grid>
                <Grid container direction="row" alignItems="center" style={uploadStyle}>
                    <Grid item>
                        <h4>shiften</h4>
                    </Grid>
                    <Grid item style={itemStyle}>
                        <Input type="file" onChange={(e) => {this.updateFile(e,"shiften")}}/>
                    </Grid>
                    <Grid item style={itemStyle}>
                        <Button variant="outlined" style={ButtonStyle} onClick={() => {this.uploadFile("shiften")}}>Upload</Button>
                    </Grid>
                </Grid>
                <Grid container direction="row" alignItems="center" style={uploadStyle}>
                    <Grid item>
                        <h4>hoofdfuncties shiften</h4>
                    </Grid>
                    <Grid item style={itemStyle}>
                        <Input type="file" onChange={(e) => {this.updateFile(e,"hoofdfuncties")}}/>
                    </Grid>
                    <Grid item style={itemStyle}>
                        <Button variant="outlined" style={ButtonStyle} onClick={() => {this.uploadFile("hoofdfuncties")}}>Upload</Button>
                    </Grid>
                </Grid>
                <Grid container direction="row" alignItems="center" style={uploadStyle}>
                    <Grid item>
                        <h4>max bezettingen</h4>
                    </Grid>
                    <Grid item style={itemStyle}>
                        <Input type="file" onChange={(e) => {this.updateFile(e,"maxBezettingen")}}/>
                    </Grid>
                    <Grid item style={itemStyle}>
                        <Button variant="outlined" style={ButtonStyle} onClick={() => {this.uploadFile("maxBezettingen")}}>Upload</Button>
                    </Grid>
                </Grid>
                <Grid container direction="row" alignItems="center" style={uploadStyle}>
                    <Grid item>
                        <h4>overzicht bezettingen</h4>
                    </Grid>
                    <Grid item style={itemStyle}>
                        <Input type="file" onChange={(e) => {this.updateFile(e,"bezettingen")}}/>
                    </Grid>
                    <Grid item style={itemStyle}>
                        <Button variant="outlined" style={ButtonStyle} onClick={() => {this.uploadFile("bezettingen")}}>Upload</Button>
                    </Grid>
                </Grid>
                <Grid container direction="row" alignItems="center" style={uploadStyle}>
                    <Grid item>
                        <h4>appellijst shift sector</h4>
                    </Grid>
                    <Grid item style={itemStyle}>
                        <Input type="file" onChange={(e) => {this.updateFile(e,"appellijst")}}/>
                    </Grid>
                    <Grid item style={itemStyle}>
                        <Button variant="outlined" style={ButtonStyle} onClick={() => {this.uploadFile("appellijst")}}>Upload</Button>
                    </Grid>
                </Grid>

                {this.state.noFile && 
                    <Grid item style={fullWidthStyle}>
                        <div> U moet een file selecteren</div>
                    </Grid>
                }

                {this.props.isFileUploaded && ! this.props.loading && this.props.errorMessage.localeCompare("") === 0 && 
                    <Grid item style={fullWidthStyle}>
                        <div>de file is succesvol upgeload.</div>
                    </Grid>
                }
                { ! this.props.isFileUploaded && this.props.loading && this.props.errorMessage.localeCompare("") === 0 && 
                    <Grid item style={fullWidthStyle}>
                        <div>de file is aan het uploaden</div>
                    </Grid>
                }
                { ! this.props.isFileUploaded && ! this.props.loading && this.props.errorMessage.localeCompare("") !== 0 && 
                    <Grid item style={fullWidthStyle}>
                        <div>Er liep iets fout tijdens het uploaden</div>
                    </Grid>
                }
                

                <Grid item style={fullWidthStyle}>
                    <div>uitleg over uploaden van files. in welke volgorde</div>
                </Grid>
            </Grid>
        );
    }
}

interface LinkStateProps {
    loading: boolean,
    isFileUploaded: boolean,
    errorMessage: string
}
const MapStateToProps = (state : AppState): LinkStateProps => {
    return {
        loading: state.DataReducer.loading,
        isFileUploaded: state.DataReducer.isFileUploaded,
        errorMessage: state.DataReducer.errorMessage
    }
}

interface LinkDispatchToProps {
    uploadFile: any
}
const MapDispatchToProp = (dispatch: any) : LinkDispatchToProps => {
    return bindActionCreators({
        uploadFile
    }, dispatch);
}

export default connect(
    MapStateToProps, MapDispatchToProp
)(Data);