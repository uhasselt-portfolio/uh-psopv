import Redux from 'redux';
import ProblemDataInterface from '../../interfaces/ProblemDataInterface';
import UserDataInterface from '../../interfaces/UserDataInterface';
import Database from '../../Redux/Database';


export enum MapActions {
    MAP_FETCH_START = 'MAP_FETCH_STRART',
    MAP_FETCH_SUCCES = 'MAP_FETCH_SUCCES',
    MAP_FETCH_FAIL = 'MAP_FETCH_FAIL'
};

/**
 * gets all the necessary data from the database to show on the map
 * all the problems, users, posts
 */
export const fetchMap = () => async (dispatch : Redux.Dispatch) => {
    console.log("in map fetch");
    try {
        dispatch({
            type: MapActions.MAP_FETCH_START
        });

        let database : Database = new Database();

        let problems: ProblemDataInterface[] = await database.fetchProblems();
        let users: UserDataInterface[] = await database.fetchusers();
        let posts = await database.fetchPosts();

        dispatch({
            type: MapActions.MAP_FETCH_SUCCES,
            payload: {
                problems: problems,
                users: users,
                posts: posts
            }
        });
    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: MapActions.MAP_FETCH_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    }
}