import React, {Component} from 'react';
import DataNavBar from '../NavBars/dataNavBar';
import Problem from '../problem';

class Problems extends Component {

    render() {
        return(
            <div>
                <DataNavBar/>
                <h4>Problems</h4>
                <div>
                    <Problem ProblemType="afwezigheid" Priority={1} Discription="vrijwiliger is afwezig van zijn post" />
                    <Problem ProblemType="afwezigheid" Priority={1} Discription="vrijwiliger is afwezig van zijn post" ShiftName="POE_WOE" TimeStamp="14/06/2020 18:05:20" Post="parking1" User="John Vandenberg" Sender="Marc Tongelen" />
                    <Problem ProblemType="afwezigheid" Priority={1} Discription="vrijwiliger is afwezig van zijn post" />
                    <Problem ProblemType="afwezigheid" Priority={1} Discription="vrijwiliger is afwezig van zijn post" />
                    <Problem ProblemType="afwezigheid" Priority={1} Discription="vrijwiliger is afwezig van zijn post" />
                    <Problem ProblemType="afwezigheid" Priority={1} Discription="vrijwiliger is afwezig van zijn post" />
                </div>

            </div>
        );
    } 
}

export default Problems;