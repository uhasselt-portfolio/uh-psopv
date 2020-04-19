import PostDataInterface from '../components/interfaces/PostDataInterface';
import Redux from 'redux';
import { Component } from 'react';
import axios from 'axios';


// export const fetchNoticationData = () => async (dispatch: Redux.Dispatch) => {
//     const result = await axios.get("https://jsonplaceholder.typicode.com/posts");
//     dispatch({ type: "FETCH_MESSAGE", payload: result.data});
// }
// export const setNotificationRead = (data: boolean) => async (dispatch: Redux.Dispatch) => {
//     dispatch({type: "UPDATE_NOTIFICATION_READ", payload: data});
// };

/*
 * action types
 */

export const SET_NOTIFICATION_READ = 'SET_NOTIFICATION_READ'
export const GET_NOTIFICATION_STATUS = 'GET_NOTIFICATION_STATUS'
export const FETCH_MESSAGE = 'FETCH_MESSAGE'
export const ADD_MESSAGE = 'ADD_MESSAGE'


export const fetchNoticationData = () => async (dispatch: Redux.Dispatch) => {
    const result = await axios.get("https://jsonplaceholder.typicode.com/posts");
    dispatch({ type: "FETCH_MESSAGE", payload: result.data});
}
    



export function getNotificationStatus() {
    return { type: GET_NOTIFICATION_STATUS }
}

export const setNotificationStatus = (data: any) => {
    return {
        type: SET_NOTIFICATION_READ,
        payload: data
    }
}

export const addMessage = (data: any) => {
    return {
        type: ADD_MESSAGE,
        payload: data
    }
}


