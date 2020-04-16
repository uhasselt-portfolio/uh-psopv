import axios from 'axios';
import Redux from 'redux';
import ProblemDataInterface from '../../interfaces/ProblemDataInterface';
import MessageDataInterface from '../../interfaces/MessageDataInterface';
import UserDataInterface from '../../interfaces/UserDataInterface';
import PostDataInterface from '../../interfaces/PostDataInterface';

export enum OverviewActions {
    OVERVIEW_FETCH_START = 'OVERVIEW_FETCH_STRART',
    OVERVIEW_FETCH_FAIL = 'OVERVIEW_FETCH_FAIL',
    OVERVIEW_PROBLEM_FETCH_SUCCES = 'OVERVIEW_PROBLEM_FETCH_SUCCES',
    OVERVIEW_MESSAGE_FETCH_SUCCES = 'OVERVIEW_MESSAGE_FETCH_SUCCES',
    OVERVIEW_FETCH_SUCCES = 'OVERVIEW_FETCH_SUCCES',
    OVERVIEW_POST_NEW_MESSAGE_SUCCES = 'OVERVIEW_POST_NEW_MESSAGE',
    OVERVIEW_POST_MESSAGE_READ_SUCCES = 'OVERVIEW_MESSAGE_READ_SUCCES'
};

export const fetchProblems = () => async (dispatch : Redux.Dispatch) => {
    console.log("overview problem fetc");
    try {
        dispatch({
            type: OverviewActions.OVERVIEW_FETCH_START
        });

        const response = await axios.get('http://localhost/api/problem/fetch/all');
        
        let problems: ProblemDataInterface[] = [];

        for (let i = 0; i < response.data.data.problems.length; ++i) {
            problems.push({
                id: response.data.data.problems[i].id,
                problemType: response.data.data.problems[i].problem_type.title,
                priority: response.data.data.problems[i].problem_type.priority,
                discription: response.data.data.problems[i].problem_type.discription,
                timeStamp: response.data.data.problems[i].created_at,
                shiftName: response.data.data.problems[i].planning.shift.name,
                post: response.data.data.problems[i].planning.post.title,
                user: response.data.data.problems[i].planning.user.first_name + " " + response.data.data.problems[i].planning.user.last_name,
                sender: response.data.data.problems[i].created_by.first_name + " " + response.data.data.problems[i].created_by.last_name,
                latitude: response.data.data.problems[i].planning.post.latitude,
                longitude: response.data.data.problems[i].planning.post.longitude,   //TODO
                solved: response.data.data.problems[i].solved
            })
        }

        dispatch({
            type: OverviewActions.OVERVIEW_PROBLEM_FETCH_SUCCES,
            payload: problems
        })

    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: OverviewActions.OVERVIEW_FETCH_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    }
}

export const fetchMessages = () => async (dispatch : Redux.Dispatch) => {
    console.log("overview messagesfetc");
    try {
        dispatch({
            type: OverviewActions.OVERVIEW_FETCH_START
        });

        const response = await axios.get('http://localhost/api/message/fetch/all');

        let messages : MessageDataInterface[] = [];
        for (let i = 0; i < response.data.data.messages.length; ++i) {
            messages.push({
              id: response.data.data.messages[i].id,
              title: response.data.data.messages[i].title,
              sender: response.data.data.messages[i].created_by.first_name + " " + response.data.data.messages[i].created_by.last_name,
              content: response.data.data.messages[i].message,
              read: response.data.data.messages[i].seen
            })
        }


        dispatch({
            type: OverviewActions.OVERVIEW_MESSAGE_FETCH_SUCCES,
            payload: messages
        })

    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: OverviewActions.OVERVIEW_FETCH_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    }
}

export const fetch = () => async (dispatch: Redux.Dispatch) => {
    console.log("overview fetch");
    try {
        dispatch({
            type: OverviewActions.OVERVIEW_FETCH_START
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
                longitude: responseProblems.data.data.problems[i].planning.post.longitude,   //TODO
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
            type: OverviewActions.OVERVIEW_FETCH_SUCCES,
            payload: {
                problems: problems,
                users: users,
                posts: posts
            }
        })

    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: OverviewActions.OVERVIEW_FETCH_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    }
}

export const postNewMessage = (receiver: string, User: string, title: string, content: string, adminId: Number) => async (dispatch: Redux.Dispatch) => {
    console.log("post new message");
    try {
        dispatch({
            type: OverviewActions.OVERVIEW_FETCH_START
        });

        const respone = await axios.post('http://localhost/api/message/add', {  //TODO vershil tussen bericht naar groep en bericht naar invidu
                                                                                //TODO hoe krijg ik id van een invidu met enkel de naam
            title: title,
            message: content,
            created_by_id: adminId,
            priority: 0,
        });

        console.log(respone);


        dispatch({
            type: OverviewActions.OVERVIEW_POST_NEW_MESSAGE_SUCCES,
        })

    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: OverviewActions.OVERVIEW_FETCH_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    }
}

export const postMessageRead = (messageId: Number) => async (dispatch: Redux.Dispatch) => {
    console.log("message read");
    try {
        dispatch({
            type: OverviewActions.OVERVIEW_FETCH_START
        });

        const respone = await axios.patch('http://localhost/api/message/toggle-seen/' + messageId) //TODO correct address + par

        console.log(respone);


        dispatch({
            type: OverviewActions.OVERVIEW_POST_MESSAGE_READ_SUCCES,
            payload: messageId
        })

    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: OverviewActions.OVERVIEW_FETCH_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    }
}