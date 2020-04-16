import axios from "axios";
import Redux from 'redux';
import UserDataInterface from '../../interfaces/UserDataInterface';

export enum UsersActions {
    USERS_FETCH_START = 'USERS_FETCH_STRART',
    USERS_FETCH_SUCCES = 'USERS_FETCH_SUCCES',
    USERS_FETCH_FAIL = 'USERS_FETCH_FAIL',
};


export const fetchUsers = () => async (dispatch : Redux.Dispatch) => {
    console.log("in settings fetch");
    try {
        dispatch({type: UsersActions.USERS_FETCH_START});

        const respone = await axios.get('http://localhost/api/user/fetch/all');

        let users: UserDataInterface[] = [];
        for (let i = 0; i < respone.data.data.users.length; ++i) {
            users.push({
                id: respone.data.data.users[i].id,
                name: respone.data.data.users[i].first_name,
                lastname: respone.data.data.users[i].last_name,
                has_internet: respone.data.data.users[i].is_connected,
                gsmNumber: respone.data.data.users[i].phone_number,
                email: respone.data.data.users[i].email,
                permission: respone.data.data.users[i].permission_type_id,
                association: respone.data.data.users[i].association.name,
                latitude: respone.data.data.users[i].current_latitude,
                longitude: respone.data.data.users[i].current_longitude
            })
        }

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