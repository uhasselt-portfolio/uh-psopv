import axios from "axios"
import Redux from 'redux';

export const MESSAGE_FETCH_START = 'MESSAGE_FETCH_START'
export const MESSAGE_FETCH_SUCCESS = 'MESSAGE_FETCH_SUCCESS'
export const MESSAGE_FETCH_FAIL = 'MESSAGE_FETCH_FAIL'


export const fetchMessages = (id: number | undefined) => async (dispatch: Redux.Dispatch) => {
    try{
        dispatch({type: MESSAGE_FETCH_START})

        const response = await axios.get('http://localhost/api/message/fetch/all/');

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

