
import React from 'react';
import './NormalMarker.css';
import { IonIcon } from '@ionic/react';
import L, { Point } from 'leaflet';
import {marker} from 'leaflet';
import {MapLayer} from 'react-leaflet';


const myCustomColour = '#583470'
const post_id = '1'
const markerHtmlStyles = `background-color: ${myCustomColour};`
    
const postIcon = (props: any)  => L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="${markerHtmlStyles}" class='marker-pin'></div><i class='material-icons'>${props}</i>`,
    iconSize: [30, 42],
    iconAnchor: [15, 42]
});

export default postIcon;



// const NormalMarker = (props: any) => {
//     const { color, name, id } = props;
//     const myCustomColour = '#583470'
//     const post_id = '1'
//     const markerHtmlStyles = `background-color: ${myCustomColour};`
//     const lat = 50
//     const lng = 28

//     const postIcon = L.divIcon({
//       className: 'custom-div-icon',
//       html: `<div style="${markerHtmlStyles}" class='marker-pin'></div><i class='material-icons'>${post_id}</i>`,
//       iconSize: [30, 42],
//       iconAnchor: [15, 42]
//     });

//     function onPostClicked(){
//         console.log(test)
//     }

//     return (
//       <a href={'/PostView/'+props.post_id+"/"+props.sector_id}>
//         {L.marker([lat,lng], {icon: postIcon})}
//       </a>
//     );
//   };

//   export default NormalMarker;




