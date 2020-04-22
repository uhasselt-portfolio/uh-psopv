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

    async fetchMessagesFrom(id: number) {
        const url = this.getRestApiEndpoint() + '/api/message/fetch/send-to/' + id;

        return await axios.get(url)
    }

    async fetchUsers() {
        const url = this.getRestApiEndpoint() + '/api/user/fetch/all';

        return await axios.get(url)
    }

    async fetchUserById(user_id: number) {
        const url = this.getRestApiEndpoint() + '/api/user/fetch/' + user_id;

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

    async fetchPlanningsWithUserId(id: number) {
        const url = this.getRestApiEndpoint() + '/api/planning/fetch/user/' + id;

        return await axios.get(url)
    }

    async fetchUsersFromShiftPost(post_id: number, shift_id: number) {
        const url = this.getRestApiEndpoint() + '/api/planning/fetch/users/' + post_id + "/" + shift_id;

        return await axios.get(url)
    }

    async addMessage(title: string | undefined, message: string | undefined, created_by_id: number, send_to_id: number, priority: number) {
        const url = this.getRestApiEndpoint() + '/api/message/add'

        return await axios.post(url, {
            title: title,
            message: message,
            created_by_id: created_by_id,
            send_to_id: send_to_id,
            priority: priority,
        })
    }

    async MessageToggle(msg_id: number) {
        const url = this.getRestApiEndpoint() + '/api/message/toggle-seen/' + msg_id;

        return await axios.patch(url)
    }

    async fetchItemsFromPlanning(planning_id: number) {
        const url = this.getRestApiEndpoint() + '/api/item/fetch/planning/' + planning_id;

        return await axios.get(url)
    }

    async fetchProblemsFromPlanning(planning_id: number) {
        const url = this.getRestApiEndpoint() + '/api/problem/fetch/planning/' + planning_id;

        return await axios.get(url)
    }

    async fetchUnsolvedProblems() {
        const url = this.getRestApiEndpoint() + '/api/problem/fetch/all/unsolved';

        return await axios.get(url)
    }



    async ItemToggle(item_id: number) {
        const url = this.getRestApiEndpoint() + '/api/item/toggle-lost/' + item_id;

        return await axios.patch(url)
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

