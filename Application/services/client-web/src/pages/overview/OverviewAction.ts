import axios from 'axios';
import Redux from 'redux';

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

        dispatch({
            type: OverviewActions.OVERVIEW_PROBLEM_FETCH_SUCCES,
            payload: response.data.data.problems
        })

    } catch(error) {
        console.log("errorrr");
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log("first",error.response.data);
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

        dispatch({
            type: OverviewActions.OVERVIEW_MESSAGE_FETCH_SUCCES,
            payload: response.data.data.messages
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

        dispatch({
            type: OverviewActions.OVERVIEW_FETCH_SUCCES,
            payload: {
                problems: responseProblems.data.data.problems,
                users: responeUsers.data.data.users,
                posts: responsePosts.data.data.posts
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

export const postNewMessage = (receiver: string, User: string, title: string, content: string) => async (dispatch: Redux.Dispatch) => {
    console.log("post new message");
    try {
        dispatch({
            type: OverviewActions.OVERVIEW_FETCH_START
        });

        const respone = await axios.post('http://localhost/api/message/add') //TODO correct  + par

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

        const respone = await axios.post('http://localhost/api') //TODO correct address + par

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