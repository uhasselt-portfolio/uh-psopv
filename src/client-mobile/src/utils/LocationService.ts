import {
    BackgroundGeolocation,
    BackgroundGeolocationConfig, BackgroundGeolocationEvents,
    BackgroundGeolocationResponse
} from "@ionic-native/background-geolocation";
import {DateTime, Zone} from "luxon";

let HIGH = 10;
const config: BackgroundGeolocationConfig = {
    desiredAccuracy: HIGH,
    stationaryRadius: 5,
    interval: 2.000,
    distanceFilter: 5,
    notificationTitle: 'Pukkelpop App',
    notificationText: 'Locatie tracking',
    debug: false, //  enable this hear sounds for background-geolocation life-cycle.
    stopOnTerminate: false, // enable this to clear background location settings when the app terminates
};


class LocationService {

    private action: (userLocation: BackgroundGeolocationResponse) => void;
    private endTracking: Date;

    constructor(action: (userLocation: BackgroundGeolocationResponse) => void, trackingEnd: Date) {
        this.action = action;
        this.endTracking = trackingEnd;
    }

    async start() : Promise<any> {

        console.log("start location service")

        // Set end for tracking time
        localStorage.setItem('time', new Date(this.endTracking).toUTCString());
        // Set configuration

        try {
            BackgroundGeolocation
                .configure(config)
                .then(() => {
                }).catch((error) => {
                console.log(error)
            });

            // Listener, every time a player moves
            BackgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((userLocation: BackgroundGeolocationResponse) => {
                const trackingEnd: string | null = localStorage.getItem('time');

                if (trackingEnd != null) {

                    if (Date.parse(trackingEnd) > Date.now()) {
                        this.action(userLocation);
                    } else {
                        console.log("Shift stopped tracking")
                        BackgroundGeolocation.stop();
                    }
                }

                BackgroundGeolocation.finish();
            });

            return Promise.resolve()

        } catch (error) {
            return new Promise((res, rej) => { rej() })
        }
    }
}

export default LocationService;