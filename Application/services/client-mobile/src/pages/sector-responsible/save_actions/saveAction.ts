import axios from "axios"
import Redux from 'redux';
import Database from '../../../database/Database'
import {resetActionList, getActionList, addObjectToActionList} from './saveFunction'



export const UNROLL_ACTIONS = 'UNROLL_ACTIONS'  

export const doDatabase = (todoCommands: any) => async (dispatch: Redux.Dispatch) => {
    try{
        todoCommands.forEach(async (element: any) => {
            const result = await axios.patch(element.url);
        });

        resetActionList();
        dispatch({type: UNROLL_ACTIONS})

    } catch(error){
    }
}