import React from 'react'
import {BackgroundGeolocation, BackgroundGeolocationEvents} from "@ionic-native/background-geolocation/ngx";

class InfoPage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {latitude: 0, longitude: 0};
    }

    componentDidMount() {
        let backgroundGeolocation = new BackgroundGeolocation();
        let HIGH = 10;
        const config = {
            desiredAccuracy: HIGH,
            stationaryRadius: 5,
            interval: 10.000,
            distanceFilter: 5,
            notificationTitle: 'Pukkelpop App',
            notificationText: 'Locatie tracking',
            debug: true, //  enable this hear sounds for background-geolocation life-cycle.
            stopOnTerminate: false, // enable this to clear background location settings when the app terminates
        };

        backgroundGeolocation.configure(config)
            .then(() => {

                backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location) => {
                    this.setState({
                        latitude: location.latitude,
                        longitude: location.longitude
                    });

                    backgroundGeolocation.finish(); // FOR IOS ONLY
                });
            });
        backgroundGeolocation.start();
    }

    componentWillUnmount() {
        console.log("LIFECYCLE KILLED");
    }

    render() {
        return (
            <div>
                <h1>Testing 2</h1>
                <p>Latitude: {this.state.latitude}</p>
                <p>Longitude: {this.state.longitude}</p>
            </div>
        )
    }
}

export default InfoPage;