import Redux from 'redux';
import UserDataInterface from '../../interfaces/UserDataInterface';
import Database from '../../Redux/Database';

export enum UsersActions {
    USERS_FETCH_START = 'USERS_FETCH_STRART',
    USERS_FETCH_SUCCES = 'USERS_FETCH_SUCCES',
    USERS_FETCH_FAIL = 'USERS_FETCH_FAIL',
};


export const fetchUsers = () => async (dispatch : Redux.Dispatch) => {
    console.log("in settings fetch");
    try {
        dispatch({type: UsersActions.USERS_FETCH_START});

        let users: UserDataInterface[] = await new Database().fetchusers();

        dispatch({
            type: UsersActions.USERS_FETCH_SUCCES,
            payload: users
        });

    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: UsersActions.USERS_FETCH_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    }
}