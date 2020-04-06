import React, {Component} from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import PostDataInterface from '../Interfaces/PostDataInterface';
import ProblemDataInterface from '../Interfaces/ProblemDataInterface';

interface IState {
    posts: PostDataInterface[],
    problems: ProblemDataInterface[]
}


interface IPropsMyMapComponent {
    isMarkerShown: boolean
}

class PukkelpopMap extends Component {
    state: IState = {
        posts :  [
            { title: "post", addres: "addres", sector: 1, general: "generalpost", latitude: 50.962595, longitude: 5.358503 },
            { title: "Parking1", addres: "Visserstraat 27", sector: 1, general: "Parking Controle", latitude: 50.962068, longitude: 5.358836 },
            { title: "Parking2", addres: "Berglaan 5", sector: 1, general: "Parking Controle", latitude: 50.963642, longitude: 5.359328 },
            { title: "Parking3", addres: "Hemelstraat 164", sector: 1, general: "Parking Controle", latitude: 50.963257, longitude: 5.356721 },
            { title: "Parking4", addres: "Pukkelpoplaan 1", sector: 3, general: "Parking Controle", latitude: 50.963902, longitude: 5.355056 },
            { title: "Drank stand 1", addres: "Terein", sector: 2, general: "Dranken Stand", latitude: 50.964240, longitude: 5.360195 },
            { title: "Schoonmaak terein", addres: "Terein", sector: 2, general: "Schoonmaak", latitude: 50.961780, longitude: 5.361407 },
            { title: "Security", addres: "terein", sector: 2, general: "Security", latitude: 50.962595, longitude: 5.358503 },
            { title: "Straat-affzetting1", addres: "Rodeberg - Geraardslaan", sector: 4, general: "Straatafzetting", latitude: 50.962595, longitude: 5.358503 },
            { title: "Straat-affzetting2", addres: "Addelbaan - Rodeberg", sector: 4, general: "Straatafzetting", latitude: 50.962595, longitude: 5.358503 },
            { title: "Straat-affzetting3", addres: "Visserstraat - Geraardslaan", sector: 1, general: "Straatafzetting", latitude: 50.962595, longitude: 5.358503 }
        ],
        problems: [
            {ProblemType: "problemtype", Priority: 1, Discription: "discription", TimeStamp: "04/04/2020 15:22", ShiftName: "shiftname", 
                Post: "post", User: "gaat over User", Sender: "sender", latitude: 50.962595, longitude: 5.358503},
            {ProblemType: "Afwezigheid", Priority: 1, Discription: "Vrijwilliger is afwezig van zijn post", TimeStamp: "04/04/2020 15:22", ShiftName: "shiftname", 
                Post: "post", User: "gaat over User", Sender: "sender", latitude: 50.962595, longitude: 5.358503},
            {ProblemType: "problemtype", Priority: 1, Discription: "discription", TimeStamp: "04/04/2020 15:22", ShiftName: "shiftname", 
                Post: "post", User: "gaat over User", Sender: "sender", latitude: 50.962595, longitude: 5.358503},
            {ProblemType: "problemtype", Priority: 1, Discription: "discription", TimeStamp: "04/04/2020 15:22", ShiftName: "shiftname", 
                Post: "post", User: "gaat over User", Sender: "sender", latitude: 50.962595, longitude: 5.358503},
            {ProblemType: "problemtype", Priority: 1, Discription: "discription", TimeStamp: "04/04/2020 15:22", ShiftName: "shiftname", 
                Post: "post", User: "gaat over User", Sender: "sender", latitude: 50.962595, longitude: 5.358503}
        ]
    }

    render() {

        let ProblemMarkers: Array<JSX.Element> = this.state.problems.map(x => (
            <Marker  position={{lat: x.latitude, lng: x.longitude}} label={x.ProblemType} options={{icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'}}/>
        ));
        let PostMarkers: Array<JSX.Element> = this.state.posts.map(x => (
            <Marker position={{lat: x.latitude, lng: x.longitude}} label={x.title} options={{icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'}}/>
        ));

        const MyMapComponent = withScriptjs(withGoogleMap((props: IPropsMyMapComponent) =>
        <GoogleMap
            defaultZoom={15}
            defaultCenter={{ lat: 50.962595, lng: 5.358503 }}
        >
            {PostMarkers}
            {ProblemMarkers}
        </GoogleMap>
        ));

        return(
            <div>
                <MyMapComponent
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAT9J4RP-_5EPa6k4L9mY5SLld6rrJa-YM&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `700px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        )
    }
}

export default PukkelpopMap;