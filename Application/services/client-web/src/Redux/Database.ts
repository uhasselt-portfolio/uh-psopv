import axios from 'axios'
import ProblemDataInterface from '../interfaces/ProblemDataInterface';
import ItemDataInterface from '../interfaces/ItemDataInterface';
import UserDataInterface from '../interfaces/UserDataInterface';
import PostDataInterface from '../interfaces/PostDataInterface';
import ShiftDataInterface from '../interfaces/ShiftDataInterface';
import MessageDataInterface from '../interfaces/MessageDataInterface';
import Auth from "../utils/Auth";

class ServerRequest {

    static getRestApiEndpoint(): string | undefined {
        console.log("PROCESS", process.env);
        // @ts-ignore
        if (process.env.NODE_ENV === "development")
            return "https://psopv.herokuapp.com/api";
        return "https://psopv.herokuapp.com/api";
    }

    public static get(endpoint: string, authorized: boolean = true): Promise<any> | null {
        const url = this.getRestApiEndpoint() + endpoint;


        if (authorized && !Auth.isAuthenticated()) return null;



        return axios.get(url, {headers: {'Authorization': Auth.getToken()}});
    }

    public static post(endpoint: string, data: any, authorized: boolean = true): Promise<any> | null {
        const url = this.getRestApiEndpoint() + endpoint;

        if (authorized && !Auth.isAuthenticated()) return null;

        return axios.post(url, data, {headers: {'Authorization': Auth.getToken()}});
    }

    public static delete(endpoint: string, id: number): Promise<any> | null {
        const url = this.getRestApiEndpoint() + endpoint + "/" + id;

        if (!Auth.isAuthenticated()) return null;

        return axios.delete(url, {headers: {'Authorization': Auth.getToken()}});
    }

    public static patch(endpoint: string, id: number, data: any): Promise<any> | null {
        const url = this.getRestApiEndpoint() + endpoint + "/" + id;

        if (!Auth.isAuthenticated()) return null;

        return axios.patch(url, data, {headers: {'Authorization': Auth.getToken()}});
    }

}

export default class Database {

    async authenticate() {
        const response = await ServerRequest.post('/user/authenticate', {
            email: 'michiel.swaanen@student.uhasselt.be',
            password: '12345'
        })

        const token = response.data.data.jwt;
        localStorage.setItem('token', token);
    }

    async fetchProblems() {

        const response = await ServerRequest.get('/problem/fetch/all/unsolved', true)
        let problems: ProblemDataInterface[] = [];

        for (let i = 0; i < response.data.data.problems.length; ++i) {
            problems.push({
                id: response.data.data.problems[i].id,
                problemType: response.data.data.problems[i].problem_type.title,
                priority: response.data.data.problems[i].problem_type.priority,
                discription: response.data.data.problems[i].problem_type.description,
                timeStamp: response.data.data.problems[i].created_at,
                shiftName: response.data.data.problems[i].planning.shift.name,
                post: response.data.data.problems[i].planning.post.title,
                postId: response.data.data.problems[i].planning.post_id,
                user: response.data.data.problems[i].planning.user.first_name + " " + response.data.data.problems[i].planning.user.last_name,
                sender: response.data.data.problems[i].created_by.first_name + " " + response.data.data.problems[i].created_by.last_name,
                latitude: response.data.data.problems[i].planning.post.latitude,
                longitude: response.data.data.problems[i].planning.post.longitude,
                solved: response.data.data.problems[i].solved
            });
        }

        return problems;
    }

    async fetchAllProblems() {
        const response = await ServerRequest.get('/problem/fetch/all');
        let problems: ProblemDataInterface[] = [];

        for (let i = 0; i < response.data.data.problems.length; ++i) {
            problems.push({
                id: response.data.data.problems[i].id,
                problemType: response.data.data.problems[i].problem_type.title,
                priority: response.data.data.problems[i].problem_type.priority,
                discription: response.data.data.problems[i].problem_type.description,
                timeStamp: response.data.data.problems[i].created_at,
                shiftName: response.data.data.problems[i].planning.shift.name,
                post: response.data.data.problems[i].planning.post.title,
                postId: response.data.data.problems[i].planning.post_id,
                user: response.data.data.problems[i].planning.user.first_name + " " + response.data.data.problems[i].planning.user.last_name,
                sender: response.data.data.problems[i].created_by.first_name + " " + response.data.data.problems[i].created_by.last_name,
                latitude: response.data.data.problems[i].planning.post.latitude,
                longitude: response.data.data.problems[i].planning.post.longitude,
                solved: response.data.data.problems[i].solved
            });
        }

        return problems;
    }

    async fetchProblemsSubset(Amount: number) {
        const response = await ServerRequest.get('/problem/fetch/all/unsolved');

        let problems: ProblemDataInterface[] = [];

        for (let i = 0; i < response.data.data.problems.length; ++i) {
            if (i >= Amount)
                break;
            problems.push({
                id: response.data.data.problems[i].id,
                problemType: response.data.data.problems[i].problem_type.title,
                priority: response.data.data.problems[i].problem_type.priority,
                discription: response.data.data.problems[i].problem_type.description,
                timeStamp: response.data.data.problems[i].created_at,
                shiftName: response.data.data.problems[i].planning.shift.name,
                post: response.data.data.problems[i].planning.post.title,
                postId: response.data.data.problems[i].planning.post_id,
                user: response.data.data.problems[i].planning.user.first_name + " " + response.data.data.problems[i].planning.user.last_name,
                sender: response.data.data.problems[i].created_by.first_name + " " + response.data.data.problems[i].created_by.last_name,
                latitude: response.data.data.problems[i].planning.post.latitude,
                longitude: response.data.data.problems[i].planning.post.longitude,
                solved: response.data.data.problems[i].solved
            });
        }

        return problems;
    }

    async fetchPosts() {

        const responsePosts = await ServerRequest.get('/post/fetch/all');

        let posts: PostDataInterface[] = [];
        for (let i = 0; i < responsePosts.data.data.posts.length; ++i) {
            const shiftsOfPost = await ServerRequest.get('/planning/fetch/post/' + responsePosts.data.data.posts[i].id);
            let shifts: Number[] = [];
            let workingUsers: Number[][] = [];


            for (let j = 0; j < shiftsOfPost.data.data.plannings.length; ++j) {
                if (!shifts.includes(shiftsOfPost.data.data.plannings[j].shift_id))
                    shifts.push(shiftsOfPost.data.data.plannings[j].shift_id)
            }

            for (let j = 0; j < shifts.length; ++j) {
                const tempUsers = await ServerRequest.get('/planning/fetch/users/' + responsePosts.data.data.posts[i].id + '/' + shifts[j]);
                let tempUsersID: Number[] = []
                for (let k = 0; k < tempUsers.data.data.plannings.length; ++k) {
                    tempUsersID.push(tempUsers.data.data.plannings[k].user_id)
                }
                workingUsers.push(tempUsersID);
            }

            posts.push({
                id: responsePosts.data.data.posts[i].id,
                title: responsePosts.data.data.posts[i].title,
                addres: responsePosts.data.data.posts[i].address,
                sector: responsePosts.data.data.posts[i].sector_id,
                general: responsePosts.data.data.posts[i].general_post.name,
                latitude: responsePosts.data.data.posts[i].latitude,
                longitude: responsePosts.data.data.posts[i].longitude,
                shifts: shifts,
                users: workingUsers,
                activeProblem: responsePosts.data.data.posts[i].activeProblem
            })
        }

        return posts
    }

    async fetchMessages() {
        let adminId: string = Auth.getAuthenticatedUser().id; // TODO Check if works, normally it was hardcoded
        const response = await ServerRequest.get('/message/fetch/send-to/' + adminId);

        let messages: MessageDataInterface[] = [];
        for (let i = 0; i < response.data.data.messages.length; ++i) {
            messages.push({
                id: response.data.data.messages[i].id,
                title: response.data.data.messages[i].title,
                sender: response.data.data.messages[i].created_by.first_name + " " + response.data.data.messages[i].created_by.last_name,
                content: response.data.data.messages[i].message,
                read: response.data.data.messages[i].seen
            });
        }

        return messages;
    }

    async fetchUsers() {
        const responeUsers = await ServerRequest.get('/user/fetch/all');

        let users: UserDataInterface[] = [];
        for (let i = 0; i < responeUsers.data.data.users.length; ++i) {
            users.push({
                id: responeUsers.data.data.users[i].id,
                name: responeUsers.data.data.users[i].first_name,
                lastname: responeUsers.data.data.users[i].last_name,
                has_internet: responeUsers.data.data.users[i].is_connected,
                gsmNumber: responeUsers.data.data.users[i].phone_number,
                email: responeUsers.data.data.users[i].email,
                permission: responeUsers.data.data.users[i].permission_type_id,
                association: responeUsers.data.data.users[i].association.name,
                latitude: responeUsers.data.data.users[i].current_latitude,
                longitude: responeUsers.data.data.users[i].current_longitude
            })
        }

        return users;
    }

    async fetchPlanning() {
        const responePlanning = await ServerRequest.get('/planning/fetch/all');

        let shifts: ShiftDataInterface[] = [];
        for (let i = 0; i < responePlanning.data.data.plannings.length; ++i) {
            shifts.push({
                id: responePlanning.data.data.plannings[i].id,
                shiftName: responePlanning.data.data.plannings[i].shift.name,
                shiftId: responePlanning.data.data.plannings[i].shift_id,
                beginDate: responePlanning.data.data.plannings[i].shift.begin,
                endDate: responePlanning.data.data.plannings[i].shift.end,
                post_id: responePlanning.data.data.plannings[i].post.id,
                post: responePlanning.data.data.plannings[i].post.title,
                User_id: responePlanning.data.data.plannings[i].user.id,
                user: responePlanning.data.data.plannings[i].user.first_name + " " + responePlanning.data.data.plannings[i].user.last_name,
                sector: responePlanning.data.data.plannings[i].post.sectro_id
            })
        }

        return shifts;
    }

    async fetchItems() {
        const responseItems = await ServerRequest.get('/item/fetch/all');

        let items: ItemDataInterface[] = [];
        for (let i = 0; i < responseItems.data.data.items.length; ++i) {
            items.push({
                id: responseItems.data.data.items[i].id,
                shiftId: responseItems.data.data.items[i].planning_id,
                itemType: responseItems.data.data.items[i].item_type.name
            })
        }

        return items;
    }

    async fetchAll() {
        let messages: MessageDataInterface[] = await this.fetchMessages();
        let users: UserDataInterface[] = await this.fetchUsers();
        let planning: ShiftDataInterface[] = await this.fetchPlanning();
        let items: ItemDataInterface[] = await this.fetchItems();
        let posts = await this.fetchPosts();
        let problems: ProblemDataInterface[] = await this.fetchProblems();

        return {
            messages,
            users,
            planning,
            items,
            posts,
            problems
        }
    }

    async patchProblemSolved(problemId: number) {
        return ServerRequest.patch('/problem/toggle-solve', problemId, {})
    }

    async patchUserConnection(userId: number) {
        return ServerRequest.patch('/user/toggle-connection', userId, {})
    }

    async postNewMessage(receiverId: Number, title: string, content: string, adminId: Number) {
        return ServerRequest.post('/message/add', {
            title: title,
            message: content,
            created_by_id: 3,   //TODO admin id
            send_to_id: receiverId,
            priority: 1,
        })

    }

    async patchMessageRead(messageId: number) {
        return ServerRequest.patch('/message/toggle-seen', messageId, {})
    }

}

