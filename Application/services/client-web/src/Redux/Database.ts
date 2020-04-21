import axios from 'axios'
import ProblemDataInterface from '../interfaces/ProblemDataInterface';
import ItemDataInterface from '../interfaces/ItemDataInterface';
import UserDataInterface from '../interfaces/UserDataInterface';
import PostDataInterface from '../interfaces/PostDataInterface';
import ShiftDataInterface from '../interfaces/ShiftDataInterface';
import MessageDataInterface from '../interfaces/MessageDataInterface';

export default class Database {

    getRestApiEndpoint() : string | undefined {
        // @ts-ignore
        if(process.env.NODE_ENV === 'debug')
            return "http://localhost";
        return "https://psopv.herokuapp.com";
    }

    async test() {
        const response = await axios.get('https://psopv.herokuapp.com/api/planning/fetch/all');
        console.log("database",response);

        const response2 = await axios.post('https://psopv.herokuapp.com/api/planning/add', {
            user_id : 1,
            shift_id : 6,
            post_id: 1
        })

        console.log(response2);

    }

    async fetchProblems() {
        const response = await axios.get('https://psopv.herokuapp.com/api/problem/fetch/all/unsolved');
        
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

    async fetchPosts() {
        const responsePosts = await axios.get('https://psopv.herokuapp.com/api/post/fetch/all');

        let posts: PostDataInterface[] = [];
        for (let i = 0; i < responsePosts.data.data.posts.length; ++i) {
            let shifts: Number[] = [];
            let workingUsers: Number[][] = [];
            for (let j = 0; j < 4; ++j) {
                shifts.push(j + 1);
                workingUsers.push([1,2]);
            } //TODO
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
        
        return posts;
    }

    async fetchmessages() {
        const response = await axios.get('https://psopv.herokuapp.com/api/message/fetch/all');

        let messages : MessageDataInterface[] = [];
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

    async fetchusers() {
        const responeUsers = await axios.get('https://psopv.herokuapp.com/api/user/fetch/all');

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

        console.log("data",responeUsers);

        return users;
    }

    async fetchPlanning() {
        const responePlanning = await axios.get('https://psopv.herokuapp.com/api/planning/fetch/all');
        console.log("planning",responePlanning);

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
        const responseItems = await axios.get('https://psopv.herokuapp.com/api/item/fetch/all');

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
        let messages : MessageDataInterface[] = await this.fetchmessages();
        let users : UserDataInterface[] = await this.fetchusers();
        let planning : ShiftDataInterface[] = await this.fetchPlanning();
        let items : ItemDataInterface[] = await this.fetchItems();
        let posts : PostDataInterface[] = await this.fetchPosts();
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

    async patchProblemSolved(problemId: Number) {
        const response = await axios.patch('https://psopv.herokuapp.com/api/problem/toggle-solve/' + problemId);

        return response;
    }

    async patchUserConnection(userId: Number) {//TODO correct addres
        const response = await axios.patch('https://psopv.herokuapp.com/api/user/toggle-connection/' + userId);

        return response; 
    }

    async postNewMessage(receiverId: Number, title: string, content: string, adminId: Number) {

        const response = await axios.post('https://psopv.herokuapp.com/api/message/add', {
            title: title,
            message: content,
            created_by_id: 3,   //TODO admin id
            send_to_id: receiverId,
            priority: 1,
            });
        return response;
    }
}

