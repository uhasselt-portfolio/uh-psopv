import axios from "axios"
import Redux from 'redux';
import Database from '../../../../database/Database'
import { getListLocalStorage, addObjectToActionList, setListLocalStorage } from "../../../save/saveFunction";

export const MESSAGE_FETCH_START = 'MESSAGE_FETCH_START'
export const MESSAGE_FETCH_SUCCESS = 'MESSAGE_FETCH_SUCCESS'
export const MESSAGE_FETCH_FAIL = 'MESSAGE_FETCH_FAIL'


export const fetchMessagesOf = (id: number) => async (dispatch: Redux.Dispatch) => {
    try{
        let loaded = false;
        let msg_messages = await getListLocalStorage('messages');
        let first_msgs = msg_messages.slice(0, 5);
        await setListLocalStorage('msg_end_index', 5)

        if(first_msgs.length >= msg_messages.length){
            loaded = true;
        }

        console.log("first_msgs",first_msgs)

        dispatch({type: MESSAGE_FETCH_SUCCESS, payload: {messages: first_msgs, loaded: loaded}})
    } catch(error){
        console.log(error)
        // let msg_messages = await getListLocalStorage('messages');
        // let first_5_msg = msg_messages.slice(0, 5);
        // await setListLocalStorage('msg_end_index', 5)
        // dispatch({type: MESSAGE_FETCH_SUCCESS, payload: first_5_msg}) 
    }
}

export const MESSAGE_LOAD_SUCCES = 'MESSAGE_LOAD_SUCCES'

export const loadMessages = (current_list: any) => async (dispatch: Redux.Dispatch) => {
    try{
        let loaded = false;
        let msg_messages = await getListLocalStorage('messages');
        let end_index = await getListLocalStorage('msg_end_index');
        let new_end_index = Number(end_index) + 5;
        await setListLocalStorage('msg_end_index', new_end_index)
        let first_msgs = msg_messages.slice(0, new_end_index);

        if(first_msgs.length == msg_messages.length){
            loaded = true;
        }

        dispatch({type: MESSAGE_FETCH_SUCCESS, payload: {messages: first_msgs, loaded: loaded}})
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
        addObjectToActionList('https://psopv.herokuapp.com/api/message/toggle-seen/' + message_id, null);

        dispatch({type: MESSAGE_TOGGLE_SEEN_SUCCESS})

    }
}



