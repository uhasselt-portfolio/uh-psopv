import axios from "axios"
import Redux from 'redux';
import Database from '../../../../database/Database'
import { getListLocalStorage } from "../../../save/saveFunction";

export const PROBLEMS_FETCH_SUCCESS = 'PROBLEMS_FETCH_SUCCESS'

export const fetchProblemsOf = () => async (dispatch: Redux.Dispatch) => {
    try{
        let problems = await getListLocalStorage('problems');
        dispatch({type: PROBLEMS_FETCH_SUCCESS, payload: problems})
    } catch(error){
       console.log("error", error)
       let problems = await getListLocalStorage('problems');
       dispatch({type: PROBLEMS_FETCH_SUCCESS, payload: problems})   
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



