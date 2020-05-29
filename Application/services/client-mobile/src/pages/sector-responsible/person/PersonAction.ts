import Redux from 'redux';
import {getListLocalStorage} from "../../save/saveFunction";

export const USER_FETCH_START = 'USER_FETCH_START'
export const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS'
export const USER_FETCH_FAIL = 'USER_FETCH_FAIL'

export const fetchUserById = (user_id: number) => async (dispatch: Redux.Dispatch) => {
    try{
        let volunteers = await getListLocalStorage('my_volunteers');
        let nonVolunteers = await getListLocalStorage('contacts');
        let list = volunteers.concat(nonVolunteers);
        let user_info = list.find((user: any) => { return user_id == user.user_id })
    
        dispatch({type: USER_FETCH_SUCCESS, payload: user_info})
    } catch(error){
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: USER_FETCH_FAIL, payload: error.response.data.users})
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }
    }
}
