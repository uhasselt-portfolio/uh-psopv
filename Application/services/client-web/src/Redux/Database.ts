import axios from 'axios'
import ProblemDataInterface from '../interfaces/ProblemDataInterface';
import ItemDataInterface from '../interfaces/ItemDataInterface';
import UserDataInterface from '../interfaces/UserDataInterface';
import PostDataInterface from '../interfaces/PostDataInterface';
import ShiftDataInterface from '../interfaces/ShiftDataInterface';
import MessageDataInterface from '../interfaces/MessageDataInterface';

export default class Database {

    ServerUrl : string = "https://psopv.herokuapp.com";

    getRestApiEndpoint() : string | undefined {
        // @ts-ignore
        if(process.env.NODE_ENV === 'debug')
            return "http://localhost";
        return "https://psopv.herokuapp.com";
    }

    async fetchProblems() {
        const response = await axios.get( this.ServerUrl + '/api/problem/fetch/all/unsolved');
        
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
        const response = await axios.get(this.ServerUrl + '/api/problem/fetch/all');
        
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
        const response = await axios.get( this.ServerUrl + '/api/problem/fetch/all/unsolved');
        
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
        const responsePosts = await axios.get(this.ServerUrl + '/api/post/fetch/all');

        let posts: PostDataInterface[] = [];
        for (let i = 0; i < responsePosts.data.data.posts.length; ++i) {
            const shiftsOfPost = await axios.get(this.ServerUrl + '/api/planning/fetch/post/' + responsePosts.data.data.posts[i].id);
            let shifts: Number[] = [];
            let workingUsers: Number[][] = [];


            for (let j = 0; j < shiftsOfPost.data.data.plannings.length; ++j) {
                if  ( ! shifts.includes(shiftsOfPost.data.data.plannings[j].shift_id))
                    shifts.push(shiftsOfPost.data.data.plannings[j].shift_id)
            }

            for (let j = 0; j < shifts.length; ++j) {
                const tempusers = await axios.get(this.ServerUrl + '/api/planning/fetch/users/' + responsePosts.data.data.posts[i].id
                 + '/' + shifts[j]);
                 let tempusersid: Number[] = []
                for (let k = 0; k < tempusers.data.data.plannings.length; ++k) {
                    tempusersid.push( tempusers.data.data.plannings[k].user_id)
                }
                workingUsers.push(tempusersid);
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

    async fetchmessages() {
        let adminId : string = '3';
        const response = await axios.get(this.ServerUrl + '/api/message/fetch/send-to/' + adminId);

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
        const responeUsers = await axios.get(this.ServerUrl + '/api/user/fetch/all');

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
        const responePlanning = await axios.get(this.ServerUrl + '/api/planning/fetch/all');

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
        const responseItems = await axios.get(this.ServerUrl + '/api/item/fetch/all');

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

    async patchProblemSolved(problemId: Number) {
        const response = await axios.patch(this.ServerUrl + '/api/problem/toggle-solve/' + problemId);

        return response;
    }

    async patchUserConnection(userId: Number) {
        const response = await axios.patch(this.ServerUrl + '/api/user/toggle-connection/' + userId);

        return response; 
    }

    async postNewMessage(receiverId: Number, title: string, content: string, adminId: Number) {

        const response = await axios.post(this.ServerUrl + '/api/message/add', {
            title: title,
            message: content,
            created_by_id: 3,   //TODO admin id
            send_to_id: receiverId,
            priority: 1,
            });
        return response;
    }

    async patchMessageRead(messageId: Number) {
        const respone = await axios.patch(this.ServerUrl + '/api/message/toggle-seen/' + messageId);
        return respone;
    }

    async postFile(file : File, isupdateMode: boolean) {    //TODO
        if (isupdateMode) {

        } else {
            
        }
    }
}

