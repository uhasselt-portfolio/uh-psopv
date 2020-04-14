
import React from 'react';
import './ProblemMarker.css';
import WarningSign from "../../../images/warning_sign"

const ProblemMarker = (props: any) => {
    function showInfo(){
        console.log("test")
    }

    const { color, name, id } = props;
    return (
      <div className="marker" onClick={() => showInfo()}
        style={{ backgroundColor: color, cursor: 'pointer'}}
        title={name}
      ><WarningSign /></div>
    );
  };

  export default ProblemMarker;