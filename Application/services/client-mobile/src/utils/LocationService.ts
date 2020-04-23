import {
    BackgroundGeolocation,
    BackgroundGeolocationConfig, BackgroundGeolocationEvents,
    BackgroundGeolocationResponse
} from "@ionic-native/background-geolocation";

let HIGH = 10;
const config : BackgroundGeolocationConfig = {
    desiredAccuracy: HIGH,
    stationaryRadius: 5,
    interval: 2.000,
    distanceFilter: 5,
    notificationTitle: 'Pukkelpop App',
    notificationText: 'Locatie tracking',
    debug: true, //  enable this hear sounds for background-geolocation life-cycle.
    stopOnTerminate: false, // enable this to clear background location settings when the app terminates
};


class LocationService {

    private action : (userLocation: BackgroundGeolocationResponse) => void;
    private endTracking : Date;

    constructor(action: () => void, trackingEnd: Date) {
        this.action = action;
        this.endTracking = trackingEnd;
    }

    async start() {
        // Set end for tracking time
        localStorage.setItem('time', new Date(this.endTracking).toUTCString());

        // Set configuration
        await BackgroundGeolocation.configure(config);

        // Listener, every time a player moves
        BackgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((userLocation: BackgroundGeolocationResponse) => {
            const trackingEnd : string | null = localStorage.getItem('time');

            if(trackingEnd != null) {
                if(Number.parseInt(trackingEnd) > Date.now()) {
                    console.log("BACKGROUND SERVICE UPDATE GEOLCOATION...")
                    this.action(userLocation);
                } else {
                    console.log("STOPPING BG SERVICE...")
                    BackgroundGeolocation.stop();
                }
            }

            BackgroundGeolocation.finish();
        });

        await BackgroundGeolocation.start();
    }
}

export default LocationService;