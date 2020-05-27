import axios from "axios"
import Redux from 'redux';
import Database from '../../database/Database'

export const USER_LOGIN_START = 'USER_LOGIN_START'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAILED'

export const loginUser = (email: string | undefined, password: string | undefined) => async (dispatch: Redux.Dispatch) => {

    try {
        dispatch({type: USER_LOGIN_START})

        const response = await new Database().loginUser(email, password);

        const token = response.data.data.jwt;
        localStorage.setItem('token', token);

        dispatch({type: USER_LOGIN_SUCCESS, payload: response.data.data})
    } catch (error) {
        dispatch({type: USER_LOGIN_FAIL, payload: error.message})
    }
}


export const USER_LOGOUT_SUCCESS = 'USER_LOGIN_SUCCESS'
export const logoutUser = () => async (dispatch: Redux.Dispatch) => {

    localStorage.removeItem('token');

    console.log("LOG OUT ACTION CALLED");

    dispatch({type: USER_LOGOUT_SUCCESS})
}


export const USER_EXISTS_START = 'USER_EXISTS_START'
export const USER_EXISTS_SUCCESS = 'USER_EXISTS_SUCCESS'
export const USER_EXISTS_FAIL = 'USER_EXISTS_FAILED'

export const checkUserExists = (phoneNumber: string) => async (dispatch: Redux.Dispatch) => {
    try {
        dispatch({type: USER_EXISTS_START});
        const response = await new Database().fetchUserByPhoneNumber(phoneNumber);
        dispatch({type: USER_EXISTS_SUCCESS, payload: response.data.data.user});
    } catch (error) {
        dispatch({type: USER_EXISTS_FAIL})
    }
}