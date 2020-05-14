import axios from "axios"
import Redux from 'redux';
import Database from '../../../database/Database'
import { getDefaultSector, getListLocalStorage } from "../../save/saveFunction";


export const PLANNING_FETCH_START = 'PLANNING_FETCH_START'
export const PLANNING_FETCH_SUCCESS = 'PLANNING_FETCH_SUCCESS'
export const PLANNING_FETCH_FAIL = 'PLANNING_FETCH_FAIL'

export const fetchPosts = () => async (dispatch: Redux.Dispatch) => {
    try{

        let postsData = await getListLocalStorage('postsData');

        dispatch({type: PLANNING_FETCH_SUCCESS, payload: postsData})
    } catch(error){
        let postsData = await getListLocalStorage('postsData');

        dispatch({type: PLANNING_FETCH_SUCCESS, payload: postsData})
    }
}