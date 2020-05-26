import Redux from 'redux';
import UserDataInterface from '../interfaces/UserDataInterface';
import DataBase from '../Redux/Database';


export enum ComponentActions {
    PROBLEM_SOLVED_POST_START = 'PROBLEM_SOLVED_POST_START',
    PROBLEM_SOLVED_POST_SUCCES = 'PROBLEM_SOLVED_POST_SUCCES',
    PROBLEM_SOLVED_POST_FAIL = 'PROBLEM_SOLVED_POST_FAIL',
    USER_FETCH_START = 'USER_FETCH_START',
    USER_FETCH_SUCCES = 'USER_FETCH_SUCCES',
    USER_FETCH_FAIL = 'USER_FETCH_FAIL',
    USER_POST_CONNECTION_CHANGED_START = 'USER_POST_CONNECTION_CHANGED_START',
    USER_POST_CONNECTION_CHANGED_SUCCES = 'USER_POST_CONNECTION_CHANGED_SUCCES',
    USER_POST_CONNECTION_CHANGED_FAIL = 'USER_POST_CONNECTION_CHANGED_FAIL'
};

/**
 * lets the database update to indicate that the problem is solved
 * @param problemID
 */
export const problemSolved = (problemID: number) => async (dispatch : Redux.Dispatch) => {
    console.log("in problem solved post");
    try {
        dispatch({
            type: ComponentActions.PROBLEM_SOLVED_POST_START
        });

        const response = await new DataBase().patchProblemSolved(problemID);

        console.log(response);

        dispatch({
            type: ComponentActions.PROBLEM_SOLVED_POST_SUCCES,
            payload: problemID
        });
    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: ComponentActions.PROBLEM_SOLVED_POST_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    }
}

/**
 * lets the database fetch all the users
 */
export const fetchuser = () => async (dispatch: Redux.Dispatch) => {
    console.log("in fetch user");
    try {
        dispatch({
            type: ComponentActions.USER_FETCH_START
        });

        let users: UserDataInterface[] = await new DataBase().fetchUsers();

        dispatch({
            type: ComponentActions.USER_FETCH_SUCCES,
            payload: users
        });
    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: ComponentActions.USER_FETCH_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    }
}

/**
 * lets the database update the connection of the user
 * @param userid the id of the user to change the connection
 * @param connection the new connection status
 */
export const changeConnection = (userid: number, connection: boolean) => async (dispatch: Redux.Dispatch) => {
    console.log("in user connection changes post");
    try {
        dispatch({
            type: ComponentActions.USER_POST_CONNECTION_CHANGED_START
        });

        await new DataBase().patchUserConnection(userid);

        dispatch({
            type: ComponentActions.USER_POST_CONNECTION_CHANGED_SUCCES,
            payload: userid
        });
    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: ComponentActions.USER_POST_CONNECTION_CHANGED_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    }
}