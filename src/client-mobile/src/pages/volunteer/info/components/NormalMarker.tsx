
import React from 'react';
import './NormalMarker.css';
import { IonIcon } from '@ionic/react';

const NormalMarker = (props: any) => {
    const { color, name, id } = props;
    return (
      <div className="normal_marker"
        style={{ backgroundColor: color, cursor: 'pointer'}}
        title={name}
      ></div>
    );
  };

  export default NormalMarker;