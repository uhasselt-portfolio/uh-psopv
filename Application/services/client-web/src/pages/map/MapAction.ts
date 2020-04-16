import axios from 'axios';
import Redux from 'redux';
import ProblemDataInterface from '../../interfaces/ProblemDataInterface';
import UserDataInterface from '../../interfaces/UserDataInterface';
import PostDataInterface from '../../interfaces/PostDataInterface';


export enum MapActions {
    MAP_FETCH_START = 'MAP_FETCH_STRART',
    MAP_FETCH_SUCCES = 'MAP_FETCH_SUCCES',
    MAP_FETCH_FAIL = 'MAP_FETCH_FAIL'
};

export const fetchMap = () => async (dispatch : Redux.Dispatch) => {
    console.log("in map fetch");
    try {
        dispatch({
            type: MapActions.MAP_FETCH_START
        });

        const responseProblems = await axios.get('http://localhost/api/problem/fetch/all');
        const responeUsers = await axios.get('http://localhost/api/user/fetch/all');
        const responsePosts = await axios.get('http://localhost/api/post/fetch/all');

        let problems: ProblemDataInterface[] = [];
        for (let i = 0; i < responseProblems.data.data.problems.length; ++i) {
            problems.push({
                id: responseProblems.data.data.problems[i].id,
                problemType: responseProblems.data.data.problems[i].problem_type.title,
                priority: responseProblems.data.data.problems[i].problem_type.priority,
                discription: responseProblems.data.data.problems[i].problem_type.discription,
                timeStamp: responseProblems.data.data.problems[i].created_at,
                shiftName: responseProblems.data.data.problems[i].planning.shift.name,
                post: responseProblems.data.data.problems[i].planning.post.title,
                user: responseProblems.data.data.problems[i].planning.user.first_name + " " + responseProblems.data.data.problems[i].planning.user.last_name,
                sender: responseProblems.data.data.problems[i].created_by.first_name + " " + responseProblems.data.data.problems[i].created_by.last_name,
                latitude: responseProblems.data.data.problems[i].planning.post.latitude,
                longitude: responseProblems.data.data.problems[i].planning.post.longitude,
                solved: responseProblems.data.data.problems[i].solved
            })
        }

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

        let posts: PostDataInterface[] = [];
        for (let i = 0; i < responsePosts.data.data.posts.length; ++i) {
            posts.push({
                id: responsePosts.data.data.posts[i].id,
                title: responsePosts.data.data.posts[i].title,
                addres: responsePosts.data.data.posts[i].address,
                sector: responsePosts.data.data.posts[i].sector_id,
                general: responsePosts.data.data.posts[i].general_post.name,
                latitude: responsePosts.data.data.posts[i].latitude,
                longitude: responsePosts.data.data.posts[i].longitude
            })
        }


        dispatch({
            type: MapActions.MAP_FETCH_SUCCES,
            payload: {
                problems: problems,
                users: users,
                posts: posts
            }
        });
    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: MapActions.MAP_FETCH_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    }
}