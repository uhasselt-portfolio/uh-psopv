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


class BackgroundService {

    private action : (userLocation: BackgroundGeolocationResponse) => {};

    constructor(action: () => {}) {
        this.action = action;
    }

    async start() {
        console.log("STARTED!");

        await BackgroundGeolocation.configure(config);

        BackgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((userLocation: BackgroundGeolocationResponse) => {
            this.action(userLocation);
            BackgroundGeolocation.finish();
        });

        await BackgroundGeolocation.start();
    }
}

export default BackgroundService;