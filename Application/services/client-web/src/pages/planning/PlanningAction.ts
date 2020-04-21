import axios from 'axios';
import Redux from 'redux';
import ShiftDatainterface from '../../interfaces/ShiftDataInterface';
import ItemDataInterface from '../../interfaces/ItemDataInterface';
import Database from '../../Redux/Database';


export enum PlanningActions {
    PLANNING_FETCH_START = 'PLANNING_FETCH_STRART',
    PLANNING_FETCH_SUCCES = 'PLANNING_FETCH_SUCCES',
    PLANNING_FETCH_FAIL = 'PLANNINGP_FETCH_FAIL',
    SHIFTCHANGE_POST_START = 'SHIFTCHANGE_POST_START',
    SHIFTCHANGE_POST_SUCCES = 'SHIFTCHANGE_POST_SUCCES',
    SHIFTCHANGE_POST_FAIL = 'SHIFTCHANGE_POST_FAIL'
};

export const fetchPlanning = () => async (dispatch : Redux.Dispatch) => {
    console.log("in planning fetch");
    try {
        dispatch({
            type: PlanningActions.PLANNING_FETCH_START
        });

        let shifts: ShiftDatainterface[] = await new Database().fetchPlanning();
        let items: ItemDataInterface[] = await new Database().fetchItems();

        dispatch({
            type: PlanningActions.PLANNING_FETCH_SUCCES,
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

//TODO
export const postShiftChange = (shiftId: Number,newUser: string) => async (dispatch: Redux.Dispatch) => {
    console.log("in shift change post");
    try {
        dispatch({
            type: PlanningActions.SHIFTCHANGE_POST_START
        });

        const response= await axios.get('http://localhost/api/shift/modify/:id'); //TODO correct parameters

        console.log(response);

        dispatch({
            type: PlanningActions.SHIFTCHANGE_POST_SUCCES,
        });
    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: PlanningActions.SHIFTCHANGE_POST_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    }
}