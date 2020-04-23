
import React from 'react';
import './ProblemMarker.css';
import WarningSign from "../../../images/warning_sign"

const ProblemMarker = (props: any) => {

    function showInfo(){
        console.log(props)
    }

    const { color, name, id } = props;
    return (
      <a href={'/PostView/'+props.post_id+"/"+props.sector_id}>
      <div className="marker" onClick={() => showInfo()}
        style={{ backgroundColor: color, cursor: 'pointer'}}
        title={name}
      ><WarningSign /></div></a>
    );
  };

  export default ProblemMarker;