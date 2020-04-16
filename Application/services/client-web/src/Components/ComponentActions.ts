import axios from 'axios';
import Redux from 'redux';


export enum ComponentActions {
    PROBLEM_SOLVED_POST_START = 'PROBLEM_SOLVED_POST_START',
    PROBLEM_SOLVED_POST_SUCCES = 'PROBLEM_SOLVED_POST_SUCCES',
    PROBLEM_SOLVED_POST_FAIL = 'PROBLEM_SOLVED_POST_FAIL',
    USER_FETCH_START = 'USER_FETCH_START',
    USER_FETCH_SUCCES = 'USER_FETCH_SUCCES',
    USER_FETCH_FAIL = 'USER_FETCH_FAIL',
    USER_POST_CONNECTION_CHANGED_START = 'USER_POST_CONNECTION_CHANGED_START',
    USER_POST_CONNECTION_CHANGED_SUCCES = 'USER_POST_CONNECTION_CHANGED_SUCCES',
    USER_POST_CONNECTION_CHANGED_FAIL = 'USER_POST_CONNECTION_CHANGED_FAIL'
};

export const problemSolved = (Problemid: Number) => async (dispatch : Redux.Dispatch) => {
    console.log("in problem solved post");
    try {
        dispatch({
            type: ComponentActions.PROBLEM_SOLVED_POST_START
        });

        const response = await axios.get('http://localhost/api/problem/'); //TODO correct addres

        console.log(response);

        dispatch({
            type: ComponentActions.PROBLEM_SOLVED_POST_SUCCES,
            payload: Problemid
        });
    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: ComponentActions.PROBLEM_SOLVED_POST_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    }
}

export const fetchuser = () => async (dispatch: Redux.Dispatch) => {
    console.log("in fetch user");
    try {
        dispatch({
            type: ComponentActions.USER_FETCH_START
        });

        const response = await axios.get('http://localhost/api/user/fetch/all'); //TODO correct addres

        console.log(response);

        dispatch({
            type: ComponentActions.USER_FETCH_SUCCES,
            payload: response.data.data.users
        });
    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: ComponentActions.USER_FETCH_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    }
}

export const changeConnection = (userid: Number, connection: boolean) => async (dispatch: Redux.Dispatch) => {
    console.log("in user connection changes post");
    try {
        dispatch({
            type: ComponentActions.USER_POST_CONNECTION_CHANGED_START
        });

        const response = await axios.get('http://localhost/api/user/post'); //TODO correct addres

        console.log(response);

        dispatch({
            type: ComponentActions.USER_POST_CONNECTION_CHANGED_SUCCES,
            payload: response.data.data.users
        });
    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: ComponentActions.USER_POST_CONNECTION_CHANGED_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    }
}