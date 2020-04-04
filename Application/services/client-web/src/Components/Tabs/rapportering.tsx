import React, {Component} from 'react';
import {Button} from '@material-ui/core';


class Rapportering extends Component {
    generatepdf = () => {
        console.log("generatepdf");
        // axios.get("server/genpdf")
        //     .then(res => {
        //         window.open('../temp.pdf');
        //     })
    }

    render() {
        return(
            <div>
                <h4>Rapportering</h4>
                <Button onClick={this.generatepdf} variant="outlined">Genereer pdf</Button>
                {/* <button className="btn" onClick={this.generatepdf}>Genereer pdf</button> */}
            </div>
        );
    }
}

export default Rapportering;