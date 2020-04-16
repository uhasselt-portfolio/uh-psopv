import axios from 'axios';
import Redux from 'redux';
import UserDataInterface from '../interfaces/UserDataInterface';


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

        const response = await axios.patch('http://localhost/api/problem//modify/:id'); //TODO correct addres

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

        let users: UserDataInterface[] = [];
        for (let i = 0; i < response.data.data.users.length; ++i) {
            users.push({
                id: response.data.data.users[i].id,
                name: response.data.data.users[i].first_name,
                lastname: response.data.data.users[i].last_name,
                has_internet: response.data.data.users[i].is_connected,
                gsmNumber: response.data.data.users[i].phone_number,
                email: response.data.data.users[i].email,
                permission: response.data.data.users[i].permission_type_id,
                association: response.data.data.users[i].association.name,
                latitude: response.data.data.users[i].current_latitude,
                longitude: response.data.data.users[i].current_longitude
            })
        }

        dispatch({
            type: ComponentActions.USER_FETCH_SUCCES,
            payload: users
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

        const response = await axios.patch('http://localhost/api/' + userid); //TODO correct addres

        console.log(response);

        dispatch({
            type: ComponentActions.USER_POST_CONNECTION_CHANGED_SUCCES,
            payload: response.data.data.user
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