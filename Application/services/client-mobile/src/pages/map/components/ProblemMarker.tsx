
import React from 'react';
import './ProblemMarker.css';

const ProblemMarker = (props: any) => {
    const { color, name, id } = props;
    return (
      <div className="marker"
        style={{ backgroundColor: color, cursor: 'pointer'}}
        title={name}
      >!</div>
    );
  };

  export default ProblemMarker;