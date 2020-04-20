import axios from "axios"
import Redux from 'redux';
import Database from '../../../database/Database'

export const USERS_FROM_SHIFT_FETCH_START = 'USERS_FROM_SHIFT_FETCH_START'
export const USERS_FROM_SHIFT_FETCH_SUCCESS = 'USERS_FROM_SHIFT_FETCH_SUCCESS'
export const USERS_FROM_SHIFT_FETCH_FAIL = 'USERS_FROM_SHIFT_FETCH_FAIL'


export const fetchUsersFromShift = (post_id: number, shift_id: number) => async (dispatch: Redux.Dispatch) => {
    try{
        dispatch({type: USERS_FROM_SHIFT_FETCH_START})

        const response = await new Database().fetchUsersFromShift(post_id, shift_id);
        console.log(response)

        dispatch({type: USERS_FROM_SHIFT_FETCH_SUCCESS, payload: response.data.data.plannings})
    } catch(error){
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: USERS_FROM_SHIFT_FETCH_FAIL, payload: error.response.data.plannings})
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }
    }
}
