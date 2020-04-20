import axios from 'axios'
import {BackgroundGeolocationResponse} from "@ionic-native/background-geolocation";

export default class Database {

    getRestApiEndpoint(): string | undefined {
        // @ts-ignore
        if (process.env.NODE_ENV == 'debug')
            return "http://localhost";
        return "https://psopv.herokuapp.com";
    }

    async loginUser(email: string | undefined, password: string | undefined) {
        const url = this.getRestApiEndpoint() + '/api/user/authenticate';

        return await axios.post(url, {
            email: email,
            password: password
        })
    }

    async fetchPlannings(userID : number) {
        const url = this.getRestApiEndpoint() + '/api/planning/fetch/user/' + userID;

        console.log("URL ", url);

        return await axios.get(url)
    }

    async fetchMessages() {
        const url = this.getRestApiEndpoint() + '/api/message/fetch/all';

        return await axios.get(url)
    }

    async fetchUsers() {
        const url = this.getRestApiEndpoint() + '/api/user/fetch/all';

        return await axios.get(url)
    }

    async fetchPosts() {
        const url = this.getRestApiEndpoint() + '/api/post/fetch/all';

        return await axios.get(url)
    }

    async fetchPlanningsWithPostId(id: number) {
        const url = this.getRestApiEndpoint() + '/api/planning/fetch/post/' + id;

        return await axios.get(url)
    }

    async fetchUsersFromShift(id: number) {
        const url = this.getRestApiEndpoint() + '/api/planning/fetch/user-in-shift/' + id;

        return await axios.get(url)
    }

    async updateUserLocation(userLocation : BackgroundGeolocationResponse, userID : number) {
        const url = this.getRestApiEndpoint() + '/api/user/modify/' + userID;

        console.log("URL ", url);

        return await axios.patch(url, {
            user: {
                current_latitude: userLocation.latitude,
                current_longitude: userLocation.longitude
            }
        })
    }
}

