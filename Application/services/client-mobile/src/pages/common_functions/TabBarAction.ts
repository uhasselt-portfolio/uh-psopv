import axios from "axios"
import Redux from 'redux';
import { getListLocalStorage } from "../save/saveFunction";

export const MESSAGES_AMOUNT_FETCH_SUCCESS = 'MESSAGES_AMOUNT_FETCH_SUCCESS'

export const getAmountMessage = () => async (dispatch: Redux.Dispatch) => {
    try{
        let msg = await getListLocalStorage('messages');
        msg = msg.filter((element: any) => {
        return (element.solved == false)
        })

        let problems = await getListLocalStorage('problems');
        problems = problems.filter((element: any) => {
        return (element.solved == false)
        })
        let total = msg.length + problems.length;

        dispatch({type: MESSAGES_AMOUNT_FETCH_SUCCESS, payload: {total: total}})
    } catch(error){
        console.log(error)
        // let msg_messages = await getListLocalStorage('messages');
        // let first_5_msg = msg_messages.slice(0, 5);
        // await setListLocalStorage('msg_end_index', 5)
        // dispatch({type: MESSAGE_FETCH_SUCCESS, payload: first_5_msg}) 
    }
}
