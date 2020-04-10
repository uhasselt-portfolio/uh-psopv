import PostDataInterface from '../components/interfaces/PostDataInterface';
import Redux from 'redux';
import { Component } from 'react';
import axios from 'axios';



// export const fetchUser = () => async (dispatch: Redux.Dispatch) => {
//     const result = await Axios.get("https://psopv.herokuapp.com/user/fetch/all");
//     dispatch({ type: "FETCH_USER", payload: result.data});
// };

// export const setNotificationRead = (data: boolean) => async (dispatch: Redux.Dispatch) => {
//     dispatch({type: "UPDATE_NOTIFICATION_READ", payload: data});
// };

/*
 * action types
 */

export const SET_NOTIFICATION_READ = 'SET_NOTIFICATION_READ'
export const GET_NOTIFICATION_STATUS = 'GET_NOTIFICATION_STATUS'

export const fetchNoticationData = () => async (dispatch: Redux.Dispatch) => {
    const result = await axios.get("https://psopv.herokuapp.com/user/fetch/all");
}



// export function getNotificationStatus() {
//     return { type: GET_NOTIFICATION_STATUS }
// }
export const setNotificationStatus = (read: boolean) => {
    return {
        type: SET_NOTIFICATION_READ,
        payload: read
    }
}


