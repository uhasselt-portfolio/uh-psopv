import {
    BackgroundGeolocation,
    BackgroundGeolocationConfig, BackgroundGeolocationEvents,
    BackgroundGeolocationResponse
} from "@ionic-native/background-geolocation";
import {DateTime, Zone} from "luxon";

const local = DateTime.local();
const time = local.setZone('Europe/Brussels', {keepLocalTime: true})

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

    constructor(action: (userLocation: BackgroundGeolocationResponse) => void, trackingEnd: Date) {
        this.action = action;
        this.endTracking = trackingEnd;
    }

    currentDate() {
        console.log("---------------------------------------------------")

        const currentDateWrongTimezone = new Date(Date.now()).toISOString()
        const dateTime = DateTime.fromISO(currentDateWrongTimezone, {zone: 'Europe/Brussels'});
        console.log(dateTime.toISO());
        console.log(dateTime.toUTC().toISO());

        console.log("---------------------------------------------------")
    }

    async start() {
        this.currentDate();
        // Set end for tracking time
        console.log('going for local storage')
        localStorage.setItem('time', new Date(this.endTracking).toUTCString());
        console.log('passed local storage');
        // Set configuration
        console.log('going for configuere');

        try {
            BackgroundGeolocation.configure(config).then(() => {
                console.log("CONFIG HIT")
            }).catch((error) => {
                console.log("CONFIG ERROR")
                console.log(error)
            });
            console.log('passed configuere');

            // Listener, every time a player moves
            BackgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((userLocation: BackgroundGeolocationResponse) => {
                const trackingEnd : string | null = localStorage.getItem('time');
                console.log("TRACKING ============================= NULL")
                if(trackingEnd != null) {
                    console.log("---------------------------------------------------")

                    console.log("Number.parseInt(trackingEnd) >> ", Number.parseInt(trackingEnd) )
                    console.log("new Date(trackingEnd).toUTCString() >> ", new Date(trackingEnd).toUTCString())
                    console.log("Date.parse(trackingEnd) >> ", Date.parse(trackingEnd))

                    console.log("Date.now() >> ", Date.now())
                    console.log("new Date(Date.now()).toUTCString() >> ", new Date(Date.now()).toUTCString())
                    console.log("Date.parse(new Date(Date.now()).toUTCString() >> ", Date.parse(new Date(Date.now()).toUTCString()))

                    console.log("---------------------------------------------------")

                    Date.parse(trackingEnd)
                    if(Date.parse(trackingEnd) > Date.now()) {
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

        } catch(error) {
            console.log(error)
        }
    }
}

export default LocationService;