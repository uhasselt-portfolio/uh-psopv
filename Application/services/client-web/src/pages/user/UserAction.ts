import Redux from 'redux';
import UserDataInterface from '../../interfaces/UserDataInterface';
import Database from '../../Redux/Database';

/**
 * @author Wouter Grootjans
 */
export enum UsersActions {
    USERS_FETCH_START = 'USERS_FETCH_STRART',
    USERS_FETCH_SUCCES = 'USERS_FETCH_SUCCES',
    USERS_FETCH_FAIL = 'USERS_FETCH_FAIL',
};


export const fetchUsers = () => async (dispatch : Redux.Dispatch) => {
    try {
        dispatch({type: UsersActions.USERS_FETCH_START});

        let users: UserDataInterface[] = await new Database().fetchUsers();

        dispatch({
            type: UsersActions.USERS_FETCH_SUCCES,
            payload: users
        });

    } catch(error) {
        dispatch({type: UsersActions.USERS_FETCH_FAIL, payload: error.response.data.message});
    }
}