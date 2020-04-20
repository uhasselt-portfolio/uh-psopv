import axios from "axios"
import Redux from 'redux';
import Database from '../../../database/Database'

export const USERS_FETCH_START = 'USERS_FETCH_START'
export const USERS_FETCH_SUCCESS = 'USERS_FETCH_SUCCESS'
export const USERS_FETCH_FAIL = 'USERS_FETCH_FAIL'

export const fetchUsers = () => async (dispatch: Redux.Dispatch) => {
    try{
        dispatch({type: USERS_FETCH_START})

        const response = await new Database().fetchUsers();

        dispatch({type: USERS_FETCH_SUCCESS, payload: response.data.data.users})
    } catch(error){
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: USERS_FETCH_FAIL, payload: error.response.data.user})
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }
    }
}
