import Redux from 'redux';
import {getListLocalStorage} from "../../save/saveFunction";


export const USERS_FETCH_SUCCESS = 'USERS_FETCH_SUCCESS'

export const fetchContacts = () => async (dispatch: Redux.Dispatch) => {
    try {
        let volunteers = await getListLocalStorage('my_volunteers');
        let nonVolunteers = await getListLocalStorage('contacts');

        let data = {my_volunteers: volunteers, contacts: nonVolunteers}

        dispatch({type: USERS_FETCH_SUCCESS, payload: data})
    }
    catch (error) {
        console.log(error)
    }
}
