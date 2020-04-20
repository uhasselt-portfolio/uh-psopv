import axios from "axios"
import Redux from 'redux';
import Database from '../../../database/Database'

export const PLANNING_POST_ID_FETCH_START = 'PLANNING_POST_ID_FETCH_START'
export const PLANNING_POST_ID_FETCH_SUCCESS = 'PLANNING_POST_ID_FETCH_SUCCESS'
export const PLANNING_POST_ID_FETCH_FAIL = 'PLANNING_POST_ID_FETCH_FAIL'

export const fetchPlanningsWithPostId = (id: number) => async (dispatch: Redux.Dispatch) => {
    try{
        dispatch({type: PLANNING_POST_ID_FETCH_START})

        const response = await new Database().fetchPlanningsWithPostId(id);

        console.log(response.data.data.plannings)
        dispatch({type: PLANNING_POST_ID_FETCH_SUCCESS, payload: response.data.data.plannings})
        
    } catch(error){
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: PLANNING_POST_ID_FETCH_FAIL, payload: error.response.data.plannings})
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }
    }
}
