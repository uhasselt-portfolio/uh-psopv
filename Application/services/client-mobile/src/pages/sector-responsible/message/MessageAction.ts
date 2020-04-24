import axios from "axios"
import Redux from 'redux';
import Database from '../../../database/Database'

export const MESSAGE_FETCH_START = 'MESSAGE_FETCH_START'
export const MESSAGE_FETCH_SUCCESS = 'MESSAGE_FETCH_SUCCESS'
export const MESSAGE_FETCH_FAIL = 'MESSAGE_FETCH_FAIL'


function sortMessagesByDate(a: any, b: any){
    var a_data = new Date(a.created_at)
    var b_data = new Date(b.created_at)

    if(a_data < b_data){
        return -1
    }
    else if(a_data > b_data){
        return 1
    } else{
        return 0
    }
}

export const fetchMessagesOf = (id: number) => async (dispatch: Redux.Dispatch) => {
    try{
        dispatch({type: MESSAGE_FETCH_START})

        const response = await new Database().fetchMessagesFrom(id);
        let messages = response.data.data.messages;
        
        messages.sort(sortMessagesByDate)

        dispatch({type: MESSAGE_FETCH_SUCCESS, payload: response.data.data.messages})
    } catch(error){
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: MESSAGE_FETCH_FAIL, payload: error.response.data.message})
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }
    }
}

export const MESSAGE_TOGGLE_SEEN_START = 'MESSAGE_TOGGLE_SEEN_START'
export const MESSAGE_TOGGLE_SEEN_SUCCESS = 'MESSAGE_TOGGLE_SEEN_SUCCESS'
export const MESSAGE_TOGGLE_SEEN_FAIL = 'MESSAGE_TOGGLE_SEEN_FAIL'

export const MessageToggle = (message_id: number) => async (dispatch: Redux.Dispatch) => {
    try{
        dispatch({type: MESSAGE_TOGGLE_SEEN_START})

        const response = await new Database().MessageToggle(message_id); // TODO GETUSERID
        console.log("MESSAGE TOGGLEEDDD")
        dispatch({type: MESSAGE_TOGGLE_SEEN_SUCCESS})
    } catch(error){
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: MESSAGE_TOGGLE_SEEN_FAIL, payload: error.response.data.message})
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }
    }
}



