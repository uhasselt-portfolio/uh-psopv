import React, {Component} from 'react';
import DataNavBar from '../NavBars/dataNavBar';
import Button from '@material-ui/core/Button';


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
                    <DataNavBar />
                    <div className="container">
                        <h4 className="center">Data</h4>
                        {/* <button className="btn" onClick={this.deleteAllData}>verwijder huidige gegevens</button> */}
                        <div className="row center">
                            <div className="col s3 center">
                                <Button onClick={this.insertData} variant="outlined">Creër gegevens</Button>
                                {/* <button className="btn center" onClick={this.insertData}>Creër gegevens</button> */}
                            </div>
                        </div>
                        <div className="row center">
                            <div className="col s3 center">
                                <Button onClick={this.updateData} variant="outlined">Voeg nieuwe gegevens toe</Button>
                                {/* <button className="btn center" onClick={this.updateData}>Voeg nieuwe gegevens toe</button> */}
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Data