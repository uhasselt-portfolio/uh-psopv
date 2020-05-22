
import React from 'react';
import './NormalMarker.css';
import WarningSign from "../../../images/warning_sign"
import { IonIcon } from '@ionic/react';
import L, { Point } from 'leaflet';
import {marker} from 'leaflet';
import {MapLayer} from 'react-leaflet';

    
const ProblemIcon = (props: any)  => L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${props.sector_color};" class='marker-pin'></div><i class='material-icons'>${props.post_id}</i><span class="warningsign" />`,
    iconSize: [30, 42],
    iconAnchor: [15, 42]
});


export default ProblemIcon;