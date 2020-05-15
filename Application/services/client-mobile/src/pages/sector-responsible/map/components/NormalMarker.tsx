
import React from 'react';
import './NormalMarker.css';
import { IonIcon } from '@ionic/react';

const NormalMarker = (props: any) => {
    const { color, name, id } = props;
    return (
      <a href={'/PostView/'+props.post_id+"/"+props.sector_id}>
      <div className="normal_marker"
        style={{ backgroundColor: color, cursor: 'pointer'}}
        title={name}
      ></div></a>
    );
  };

  export default NormalMarker;