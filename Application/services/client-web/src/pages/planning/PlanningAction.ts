import Redux from 'redux';
import ShiftDatainterface from '../../interfaces/ShiftDataInterface';
import ItemDataInterface from '../../interfaces/ItemDataInterface';
import UserDataInterface from '../../interfaces/UserDataInterface';
import PostDataInterface from '../../interfaces/PostDataInterface';
import Database from '../../Redux/Database';

/**
 * @author Wouter Grootjans
 */
export enum PlanningActions {
    PLANNING_FETCH_START = 'PLANNING_FETCH_STRART',
    PLANNING_FETCH_SUCCES = 'PLANNING_FETCH_SUCCES',
    PLANNING_FETCH_FAIL = 'PLANNINGP_FETCH_FAIL',
    SHIFTCHANGE_POST_START = 'SHIFTCHANGE_POST_START',
    SHIFTCHANGE_POST_SUCCES = 'SHIFTCHANGE_POST_SUCCES',
    SHIFTCHANGE_POST_FAIL = 'SHIFTCHANGE_POST_FAIL'
};

/**
 * gets the latest planning( shifts, items, users , post) from the database
 */
export const fetchPlanning = () => async (dispatch : Redux.Dispatch) => {
    console.log("in planning fetch");
    try {
        dispatch({
            type: PlanningActions.PLANNING_FETCH_START
        });

        let database : Database = new Database();

        let shifts: ShiftDatainterface[] = await database.fetchPlanning();
        let items: ItemDataInterface[] = await database.fetchItems();
        let users: UserDataInterface[] = await database.fetchUsers();
        let posts: PostDataInterface[] = await database.fetchPosts();

        dispatch({
            type: PlanningActions.PLANNING_FETCH_SUCCES,
            payload: {
                shifts: shifts,
                items: items,
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

            dispatch({type: PlanningActions.PLANNING_FETCH_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    }
}