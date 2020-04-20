import axios from "axios"
import Redux from 'redux';
import Database from '../../../database/Database'

export const MESSAGE_ADD_START = 'MESSAGE_ADD_START'
export const MESSAGE_ADD_SUCCESS = 'MESSAGE_ADD_SUCCESS'
export const MESSAGE_ADD_FAIL = 'MESSAGE_ADD_FAIL'

export const addMessage = (title: string | undefined,
     message: string | undefined,
     created_by_id: number,
     send_to_id: number,
     priority: number) => async (dispatch: Redux.Dispatch) => {
    try{
        dispatch({type: MESSAGE_ADD_START})

        const response = await new Database().addMessage(title, message, created_by_id, send_to_id, priority);

        dispatch({type: MESSAGE_ADD_SUCCESS})
    } catch(error){
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: MESSAGE_ADD_FAIL, payload: error.response.data.message})
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }
    }
}

export const USER_FETCH_START = 'USER_FETCH_START'
export const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS'
export const USER_FETCH_FAIL = 'USER_FETCH_FAIL'

export const fetchUsers = () => async (dispatch: Redux.Dispatch) => {
    try{
        dispatch({type: USER_FETCH_START})

        const response = await new Database().fetchUsers();

        console.log("fetchUSERSSSSS", response.data)
        dispatch({type: USER_FETCH_SUCCESS, payload: response.data.data.users})
    } catch(error){
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: USER_FETCH_FAIL, payload: error.response.data.users})
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }
    }
}
