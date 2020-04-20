import React, {Component} from 'react';
import Button from '@material-ui/core/Button';

const ButtonStyle = {
    background: 'rgb(21,95,160)',
    color: 'white',
    margin: '5px'
}

class Data extends Component {
    deleteAllData = () => {
        console.log("delete data");
    }

    updateData = () => {
        console.log("update data");
    }

    insertData = () => {
        console.log("insert data");
    }

    render() {
        return(
                <div>
                    <div className="container">
                        <h4 className="center">Data</h4>
                        {/* <button className="btn" onClick={this.deleteAllData}>verwijder huidige gegevens</button> */}
                        <div className="row center">
                            <div className="col s3 center">
                                <Button onClick={this.insertData} variant="outlined" style={ButtonStyle}>Creër gegevens</Button>
                                {/* <button className="btn center" onClick={this.insertData}>Creër gegevens</button> */}
                            </div>
                        </div>
                        <div className="row center">
                            <div className="col s3 center">
                                <Button onClick={this.updateData} variant="outlined" style={ButtonStyle}>Voeg nieuwe gegevens toe</Button>
                                {/* <button className="btn center" onClick={this.updateData}>Voeg nieuwe gegevens toe</button> */}
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Data