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
const styleLeft = {
    width: '60%'
}
const styleRight = {
    width: '40%',
    marginTop: '10px'
}
const explanationStyle = {
    margin: '5px'
}


interface IState  {
    isCreating : boolean,
    functiesFile : File | null,
    shiftenFile : File | null,
    appellijstFile : File | null,
    gebruikersFile : File | null,
    itemFile : File | null,
    noFile: boolean
}

type Props = LinkStateProps & LinkDispatchToProps;

class Data extends Component<Props> {
    state : IState = {
        isCreating: true,
        functiesFile : null,
        shiftenFile : null,
        appellijstFile : null,
        gebruikersFile : null,
        itemFile : null,
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
            case "appellijst" : {
                this.setState({
                    ...this.state,
                    appellijstFile: file.target.files[0],
                    noFile : false
                });
                break;
            }
            case "gebruikers" : {
                this.setState({
                    ...this.state,
                    gebruikersFile: file.target.files[0],
                    noFile : false
                });
                break;
            }
            case "items" : {
                this.setState({
                    ...this.state,
                    itemFile: file.target.files[0],
                    noFile : false
                });
                break;
            }
        }
    }

    /**
     * sends the file to the server
     */
    uploadFile = () => {
        let isUpdateMode : boolean = ! this.state.isCreating;

        if (this.state.functiesFile === null || 
            this.state.appellijstFile === null ||
            this.state.shiftenFile === null ||
            this.state.gebruikersFile === null ||
            this.state.itemFile === null) {
            this.setState({
                ...this.state,
                noFile : true
            });
            return;
        } 

        this.props.uploadFile(this.state.functiesFile, this.state.appellijstFile,
                this.state.shiftenFile, this.state.gebruikersFile, this.state.itemFile,isUpdateMode);

        // switch(fileName) {
        //     case "functies" : {

        //             this.props.uploadFile(this.state.functiesFile,isUpdateMode);
        //         } else {
        //             this.setState({
        //                 ...this.state,
        //                 noFile : true
        //             });
        //         }
        //         break;
        //     }
        //     case "shiften" : {
        //         if (this.state.shiftenFile !== null) {
        //             this.setState({
        //                 ...this.state,
        //                 noFile : false
        //             });
        //             this.props.uploadFile(this.state.shiftenFile,isUpdateMode);
        //         } else {
        //             this.setState({
        //                 ...this.state,
        //                 noFile : true
        //             });
        //         }
        //         break;
        //     }
        //     case "hoofdfuncties" : {
        //         if (this.state.hoofdfunctiesFile !== null) {
        //             this.setState({
        //                 ...this.state,
        //                 noFile : false
        //             });
        //             this.props.uploadFile(this.state.hoofdfunctiesFile,isUpdateMode);
        //         } else {
        //             this.setState({
        //                 ...this.state,
        //                 noFile : true
        //             });
        //         }
        //         break;
        //     }
        //     case "maxBezettingen" : {
        //         if (this.state.maxBezettingenFile !== null) {
        //             this.setState({
        //                 ...this.state,
        //                 noFile : false
        //             });
        //             this.props.uploadFile(this.state.maxBezettingenFile,isUpdateMode);
        //         } else {
        //             this.setState({
        //                 ...this.state,
        //                 noFile : true
        //             });
        //         }
        //         break;
        //     }
        //     case "bezettingen" : {
        //         if (this.state.bezettingenFile !== null) {
        //             this.setState({
        //                 ...this.state,
        //                 noFile : false
        //             });
        //             this.props.uploadFile(this.state.bezettingenFile,isUpdateMode);
        //         } else {
        //             this.setState({
        //                 ...this.state,
        //                 noFile : true
        //             });
        //         }
        //         break;
        //     }
        //     case "appellijst" : {
        //         if (this.state.appellijstFile !== null) {
        //             this.setState({
        //                 ...this.state,
        //                 noFile : false
        //             });
        //             this.props.uploadFile(this.state.appellijstFile,isUpdateMode);
        //         } else {
        //             this.setState({
        //                 ...this.state,
        //                 noFile : true
        //             });
        //         }
        //         break;
        //     }
        // }
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

    /**
     * renders the component
     */
    render() {
        return(
            <Grid container direction="row">
                <Grid container direction="row" alignItems="flex-start" style={styleLeft}>
                    <Grid container direction="row" alignItems="center" style={uploadStyle}>
                        <Grid item> 
                                <h4>mode: </h4>
                        </Grid>
                        <Grid item style={itemStyle}>
                            <Button variant="outlined" style={ButtonStyle} onClick={() => {this.switch()}}>{this.state.isCreating ? "create" : "update" }</Button>
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
                    <Grid container direction="row" alignItems="center" style={uploadStyle}>
                        <Grid item>
                            <h4>Functies</h4>
                        </Grid>
                        <Grid item style={itemStyle}>
                            <Input type="file" onChange={(e) => {this.updateFile(e,"functies")}}/>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" alignItems="center" style={uploadStyle}>
                        <Grid item>
                            <h4>Shiften</h4>
                        </Grid>
                        <Grid item style={itemStyle}>
                            <Input type="file" onChange={(e) => {this.updateFile(e,"shiften")}}/>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" alignItems="center" style={uploadStyle}>
                        <Grid item>
                            <h4>Appellijst</h4>
                        </Grid>
                        <Grid item style={itemStyle}>
                            <Input type="file" onChange={(e) => {this.updateFile(e,"appellijst")}}/>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" alignItems="center" style={uploadStyle}>
                        <Grid item>
                            <h4>Gebruikers</h4>
                        </Grid>
                        <Grid item style={itemStyle}>
                            <Input type="file" onChange={(e) => {this.updateFile(e,"gebruikers")}}/>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" alignItems="center" style={uploadStyle}>
                        <Grid item>
                            <h4>Items</h4>
                        </Grid>
                        <Grid item style={itemStyle}>
                            <Input type="file" onChange={(e) => {this.updateFile(e,"items")}}/>
                        </Grid>
                    </Grid>
                    <Grid item style={itemStyle}>
                        <Button variant="outlined" style={ButtonStyle} onClick={() => {this.uploadFile()}}>Upload</Button>
                </Grid>
                </Grid>

                <Grid item style={styleRight}>
                    <h3>Hoe bestanden uploaden</h3>
                    <div style={explanationStyle}>
                        Om bestanden up te loaden dient u op de knop 'Bestand kiezen' te klikken en het 
                         correcte bestand te selecteren. Hieronder volgt wat elk bestand moet bevatten.    
                    </div>
                    <h5 style={explanationStyle}>Mode:</h5>
                    <div style={explanationStyle}>
                        Wilt u bepaalde nieuwe gegevens invoegen of de oude gegevens overschrijven. Met create overschrijft u de al bestaande gegevens.
                        Met update behoudt u de oude gegevens en voegt u nieuwe toe. Let hier wel op dat de nieuwe gegevens correct zijn. Als u ergens
                        naar een gebruiker verwijst moet deze ook bestaan.
                    </div>
                    <h5 style={explanationStyle}>Functies:</h5>
                    <div style={explanationStyle}>
                        Dit bestand bevat de functies die op het festival voorkomen. Gelieve de volgende regels te volgen 
                        bij het maken van dit bestand. In rij 3 van het bestand staan de titels van de kolommen, gelieve de. Deze bevatten minstens
                        'HOOFDFUNCTIE', 'SUBFUNCTIE', 'SECTOR', 'LOCATIE', 'MINIMUMLEEFTIJD' en optioneel 'OPMERKING'
                    </div>
                    <h5 style={explanationStyle}>FunShiften:cties</h5>
                    <div style={explanationStyle}>
                        Dit bestand bevat de verschillende shiften die tijdens het festival voorkomen. Gelieve de volgende regels 
                        te volgen bij het maken van dit bestand. In rij 3 van het bestand staan de titels van de kolommen. Deze bevatten minstens
                        'SHIFT', 'STARTDTG' en 'EINDEDTG'
                    </div>
                    <h5 style={explanationStyle}>Appellijst: </h5>
                    <div style={explanationStyle}>
                        Dit bestand bevat de verdeling van shiften en posten aan gebruikers. Gelieve de volgende regels 
                        te volgen bij het maken van dit bestand. In kolom A worden de shiften neergeschreven. Hierachter bevatten de volgende 
                        regels de data van deze shift. Hier staat in kolom C de functie. In kolom E de gebruikers naam en telefoonnummber, dit
                        gescheiden door een spatie. De shift, functie en gebruikers naam en telefoonnummber moeten verwijzen naar andere voorkomens
                        in hun gespecifieerde files.
                    </div>
                    <h5 style={explanationStyle}>Gebruikers: </h5>
                    <div style={explanationStyle}>
                        Dit bestand bevat een opsomming van al de gebruikers, zowel vrijwilligers en verantwoordelijken. Gelieve 
                        de volgende regels te volgen bij het maken van dit bestand. De 2de rij bevat de titels van de kolommen. Deze bevatten
                        minstens 'voornaam', 'achternaam', 'telefoon nummber', 'vereneging', 'wachtwoord', 'email', 'vrijwilliger?'.
                    </div>
                    <h5 style={explanationStyle}>Items: </h5>
                    <div style={explanationStyle}>
                        Dit bestand bevat een opsomming van de verschillende voorwerpen gebruikt tijdens het festival. Gelieve 
                        de volgende regels te volgen bij het maken van dit bestand. de 2de rij bevat de titles van de kolommen. Deze zijn 
                        'itemType' en 'shift'. Waarbij itemType het soort van item is, bijvoorbeeld een fluohesje en shift is de shift Waarbij
                        het wordt gebruikt.
                    </div>
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