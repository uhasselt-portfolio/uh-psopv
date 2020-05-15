import axios from "axios"
import Redux from 'redux';
import Database from '../../../database/Database'

export const VR_MESSAGE_ADD_START = 'VR_MESSAGE_ADD_START'
export const VR_MESSAGE_ADD_SUCCESS = 'VR_MESSAGE_ADD_SUCCESS'
export const VR_MESSAGE_ADD_FAIL = 'VR_MESSAGE_ADD_FAIL'

export const VRSendMessage = (title: string | undefined,
     message: string | undefined,
     created_by_id: number,
     send_to_id: number,
     priority: number) => async (dispatch: Redux.Dispatch) => {
    try{
        dispatch({type: VR_MESSAGE_ADD_START})

        const response = await new Database().addMessage(title, message, created_by_id, send_to_id, priority);


        dispatch({type: VR_MESSAGE_ADD_SUCCESS})
    } catch(error){
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: VR_MESSAGE_ADD_FAIL, payload: error.response.data.message})
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }
    }
}

export const FETCH_USER_FROM_SECTOR_START = 'FETCH_USER_FROM_SECTOR_START'
export const FETCH_USER_FROM_SECTOR_SUCCESS = 'FETCH_USER_FROM_SECTOR_SUCCESS'
export const FETCH_USER_FROM_SECTOR_FAIL = 'FETCH_USER_FROM_SECTOR_FAIL'

export const fetchUserFromSector = (user_id: number) => async (dispatch: Redux.Dispatch) => {
    try{
        dispatch({type: FETCH_USER_FROM_SECTOR_START})

        const response = await new Database().fetchUserById(user_id); // TODO USERID sector-verantwoordelijke
        console.log(response)

        dispatch({type: FETCH_USER_FROM_SECTOR_SUCCESS, payload: response.data.data.user})
    } catch(error){
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: FETCH_USER_FROM_SECTOR_FAIL, payload: error.response.data.user})
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }
    }
}
