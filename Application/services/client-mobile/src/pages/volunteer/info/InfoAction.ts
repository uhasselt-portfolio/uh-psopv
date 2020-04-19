import axios from "axios"
import Redux from 'redux';
import Database from '../../../database/Database'


export const PLANNING_FETCH_START = 'PLANNING_FETCH_START'
export const PLANNING_FETCH_SUCCESS = 'PLANNING_FETCH_SUCCESS'
export const PLANNING_FETCH_FAIL = 'PLANNING_FETCH_FAIL'

export const fetchPlannings = () => async (dispatch: Redux.Dispatch) => {
    try{
        dispatch({type: PLANNING_FETCH_START})

        const response =  await new Database().fetchPlannings();

        let plannings =response.data.data.plannings;
        let planning = plannings.filter((planning_info: any, index: number) => plannings[index].user_id === 1);

        dispatch({type: PLANNING_FETCH_SUCCESS, payload: planning})
    } catch(error){
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: PLANNING_FETCH_FAIL, payload: error.response.data.data.plannings})
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }
    }
}