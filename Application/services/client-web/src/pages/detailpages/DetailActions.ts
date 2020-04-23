import Redux from 'redux';
import ItemDataInterface from '../../interfaces/ItemDataInterface';
import ShiftDatainterface from '../../interfaces/ShiftDataInterface';
import Database from '../../Redux/Database';


export enum DetailActions {
    DETAIL_PLANNING_FETCH_START = 'DETAIL_PLANNING_FETCH_STRART',
    DETAIL_PLANNING_FETCH_SUCCES = 'DETAIL_PLANNING_FETCH_SUCCES',
    DETAIL_PLANNING_FETCH_FAIL = 'DETAIL_PLANNING_FETCH_FAIL',
    PROBLEM_SOLVED_POST_START = 'PROBLEM_SOLVED_POST_START',
    PROBLEM_SOLVED_POST_SUCCES = 'PROBLEM_SOLVED_POST_SUCCES',
    PROBLEM_SOLVED_POST_FAIL = 'PROBLEM_SOLVED_POST_FAIL',
};

export const fetchPlanning = () => async (dispatch : Redux.Dispatch) => {
    console.log("in Detail fetch");
    try {
        dispatch({
            type: DetailActions.DETAIL_PLANNING_FETCH_START
        });

        let shifts: ShiftDatainterface[] = await new Database().fetchPlanning();
        let items: ItemDataInterface[] = await new Database().fetchItems();;

        dispatch({
            type: DetailActions.DETAIL_PLANNING_FETCH_SUCCES,
            payload: {
                shifts: shifts,
                items: items
            }
        });
    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: DetailActions.DETAIL_PLANNING_FETCH_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    }
}

export const problemSolved = (Problemid: Number) => async (dispatch : Redux.Dispatch) => {
    console.log("in problem solved post");
    try {
        dispatch({
            type: DetailActions.PROBLEM_SOLVED_POST_START
        });

        const response = await new Database().patchProblemSolved(Problemid);

        console.log(response);

        dispatch({
            type: DetailActions.PROBLEM_SOLVED_POST_SUCCES,
            payload: Problemid
        });
    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: DetailActions.PROBLEM_SOLVED_POST_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    }
}
