import Redux from 'redux';
import ProblemDataInterface from '../../interfaces/ProblemDataInterface';
import UserDataInterface from '../../interfaces/UserDataInterface';
import Database from '../../Redux/Database';

/**
 * @author Wouter Grootjans
 */
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
    try {
        dispatch({
            type: MapActions.MAP_FETCH_START
        });

        let database : Database = new Database();

        let problems: ProblemDataInterface[] = await database.fetchProblems();
        let users: UserDataInterface[] = await database.fetchUsers();
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
        dispatch({type: MapActions.MAP_FETCH_FAIL, payload: error.response.data.message});
    }
}