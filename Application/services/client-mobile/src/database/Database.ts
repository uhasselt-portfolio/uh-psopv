import axios from 'axios'
import {BackgroundGeolocationResponse} from "@ionic-native/background-geolocation";
import Auth from "../utils/Auth";


class ServerRequest {

    static getRestApiEndpoint(): string | undefined {
        // @ts-ignore
        if (process.env.NODE_ENV == 'development')
            return "http://localhost/api";
        return "https://psopv.herokuapp.com/api";
    }

    public static get(endpoint: string, authorized: boolean = true) : Promise<any> | null {
        const url = this.getRestApiEndpoint() + endpoint;

        if(authorized && !Auth.isAuthenticated()) return null;


        return axios.get(url, {headers: {'Authorization': Auth.getToken()}});
    }

    public static post(endpoint: string, data: any, authorized: boolean = true) : Promise<any> | null {
        const url = this.getRestApiEndpoint() + endpoint;

        if(authorized && !Auth.isAuthenticated()) return null;

        return axios.post(url, data, {headers: {'Authorization': Auth.getToken()}});
    }

    public static delete(endpoint: string, id: number) : Promise<any> | null {
        const url = this.getRestApiEndpoint() + endpoint + "/" + id;

        if(!Auth.isAuthenticated()) return null;

        return axios.delete(url, {headers: {'Authorization': Auth.getToken()}});
    }

    public static patch(endpoint: string, id: number, data: any) : Promise<any> | null {
        const url = this.getRestApiEndpoint() + endpoint + "/" + id;

        if(!Auth.isAuthenticated()) return null;

        return axios.patch(url, data, {headers: {'Authorization': Auth.getToken()}});
    }

}

export default class Database {

    async loginUser(email: string | undefined, password: string | undefined) {
        return ServerRequest.post('/user/authenticate', {
            email: email,
            password: password
        }, false);
    }

    async fetchPlannings() {
        return ServerRequest.get('/planning/fetch/all');
    }

    async fetchMessages() {
        return ServerRequest.get('/message/fetch/all');
    }

    async fetchMessagesFrom(id: number) {
        return ServerRequest.get('/message/fetch/send-to/' + id);
    }

    async fetchUsers() {
        return ServerRequest.get('/user/fetch/all');
    }

    async fetchUserById(user_id: number) {
        return ServerRequest.get('/user/fetch/' + user_id);
    }

    async deleteProblem(problem_id: number){
        return ServerRequest.delete('/problem/delete', problem_id);
    }

    async fetchUserByPhoneNumber(phoneNumber: string) {
        return ServerRequest.get('/user/fetch/phone/' + phoneNumber, false);
    }

    async fetchPosts() {
        return ServerRequest.get('/post/fetch/all');
    }

    async fetchPlanningsWithPostId(id: number) {
        return ServerRequest.get('/planning/fetch/post/' + id);
    }

    async fetchPlanningsWithUserId(id: number) {
        return ServerRequest.get('/planning/fetch/user/' + id);
    }

    async fetchActivePlanning(userID: number) {
        return ServerRequest.get('/planning/fetch/user/active/' + userID);
    }

    async toggleUserCheckInStatus(userID: number) {
        return ServerRequest.patch('/planning/toggle-checkin', userID, {});
    }

    async fetchUsersFromShiftPost(post_id: number, shift_id: number) {
        return ServerRequest.get('/planning/fetch/users/' + post_id + '/' + shift_id);
    }

    async addMessage(title: string | undefined, message: string | undefined, created_by_id: number, send_to_id: number, priority: number) {
        return ServerRequest.post('/message/add', {
            title: title,
            message: message,
            created_by_id: created_by_id,
            send_to_id: send_to_id,
            priority: priority,
        });
    }

    async toggleMessageSeenStatus(messageID: number) {
        return ServerRequest.patch('/message/toggle-seen', messageID, {});
    }

    async fetchAllItems() {
        return ServerRequest.get('/item/fetch/all');
    }

    async fetchAllProblems() {
        return ServerRequest.get('/problem/fetch/all');
    }

    async fetchItemsFromPlanning(planning_id: number) {
        return ServerRequest.get('/item/fetch/planning/' + planning_id);
    }

    async fetchProblemsFromPlanning(planning_id: number) {
        return ServerRequest.get('/problem/fetch/planning/' + planning_id);
    }

    async fetchAllProblemTypes() {
        return ServerRequest.get('/problem_type/fetch/all');
    }

    async addProblem(problem: any){
        return ServerRequest.post('/problem/add', problem);
    }


    async fetchSectorOfUser(userID: number) {
        return ServerRequest.get('/sector/fetch/user/' + userID);
    }

    async fetchSectors(){
        return ServerRequest.get('/sector/fetch/all');
    }

    async fetchUnsolvedProblems() {
        return ServerRequest.get('/problem/fetch/all/unsolved');
    }

    async getProblemType(id: number){
        return ServerRequest.get('/problem_type/fetch/' + id);
    }

    async toggleItemLostStatus(itemID: number) {
        return ServerRequest.patch('/item/toggle-lost', itemID, {});
    }

    async toggleProblemSolvedStatus(problemID: number) {
        return ServerRequest.patch('/problem/toggle-solve', problemID, {});
    }

    async updateUserLocation(userLocation : BackgroundGeolocationResponse, userID : number) {
        return ServerRequest.patch('/user/modify', userID, {
            user: {
                current_latitude: userLocation.latitude,
                current_longitude: userLocation.longitude
            }
        })
    }

    async reportUser(userID: number) {
        return ServerRequest.post('/problem/add/report-user/' + userID, {})
    }
}

