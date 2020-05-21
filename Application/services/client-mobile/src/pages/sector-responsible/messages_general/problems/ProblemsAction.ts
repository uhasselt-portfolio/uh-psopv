import axios from "axios"
import Redux from 'redux';
import Database from '../../../../database/Database'
import { getListLocalStorage, setListLocalStorage } from "../../../save/saveFunction";

export const PROBLEMS_FETCH_SUCCESS = 'PROBLEMS_FETCH_SUCCESS'

export const fetchProblemsOf = () => async (dispatch: Redux.Dispatch) => {
    try{
        let loaded = false;
        let problems = await getListLocalStorage('problems');
        let first_5_problems = problems.slice(0, 5);
        await setListLocalStorage('problem_end_index', 5)

        if(first_5_problems.length == problems.length){
            loaded = true;
        }

        dispatch({type: PROBLEMS_FETCH_SUCCESS, payload: {problems: first_5_problems, loaded: loaded}})
    } catch(error){
       console.log("error", error)
       let problems = await getListLocalStorage('problems');
       dispatch({type: PROBLEMS_FETCH_SUCCESS, payload: problems})   
    }
}

export const PROBLEM_LOAD_SUCCES = 'PROBLEM_LOAD_SUCCES'

export const loadProblem = (current_list: any) => async (dispatch: Redux.Dispatch) => {
    try{
        let loaded = false;
        let problems = await getListLocalStorage('problems');
        let end_index = await getListLocalStorage('problem_end_index');
        let new_end_index = Number(end_index) + 5;
        await setListLocalStorage('problem_end_index', new_end_index)
        let first_msgs = problems.slice(0, new_end_index);

        if(first_msgs.length == problems.length){
            loaded = true;
        }

        dispatch({type: PROBLEM_LOAD_SUCCES, payload: {problems: first_msgs, loaded: loaded}})

    } catch(error){
       console.log("error", error)
    //    let msg_messages = await getListLocalStorage('messages');
    //     let end_index = await getListLocalStorage('msg_end_index');
    //     let new_end_index = Number(end_index) + 5;
    //     console.log(new_end_index)
    //     await setListLocalStorage('msg_end_index', new_end_index)

    //     let first_msgs = msg_messages.slice(0, new_end_index);
    //     dispatch({type: MESSAGE_FETCH_SUCCESS, payload: first_msgs})
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



