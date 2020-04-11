import axios from "axios"
import Redux from 'redux';

export const USER_LOGIN_START = 'USER_LOGIN_START'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAILED'

export const loginUser = (email: string | undefined, password: string | undefined) => async (dispatch: Redux.Dispatch) => {

    try {
        dispatch({type: USER_LOGIN_START})

        const response = await axios.post('http://localhost/api/user/authenticate', {
            email: email,
            password: password
        })

        const token = response.data.data.jwt;
        localStorage.setItem('token', token);

        dispatch({type: USER_LOGIN_SUCCESS})

    } catch (error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: USER_LOGIN_FAIL, payload: error.response.data.message})
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }
    }
}