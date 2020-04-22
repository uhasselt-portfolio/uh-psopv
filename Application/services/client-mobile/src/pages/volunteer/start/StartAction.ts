import Redux from 'redux';
import Database from "../../../database/Database";

export const START_FETCH_ACTIVE_PLANNING_START = 'START_FETCH_ACTIVE_PLANNING_START'
export const START_FETCH_ACTIVE_PLANNING_SUCCESS = 'START_FETCH_ACTIVE_PLANNING_SUCCESS'
export const START_FETCH_ACTIVE_PLANNING_FAIL = 'START_FETCH_ACTIVE_PLANNING_FAIL'

export const fetchActivePlanningOfUser = (id: number) => async (dispatch: Redux.Dispatch) => {
    try{
        dispatch({type: START_FETCH_ACTIVE_PLANNING_START})

        const response = await new Database().fetchActivePlanning(id);

        dispatch({type: START_FETCH_ACTIVE_PLANNING_SUCCESS, payload: response.data.data.planning});
    } catch(error){
        dispatch({type: START_FETCH_ACTIVE_PLANNING_FAIL, payload: error.response.data.message})
    }
}

export const START_UPDATE_CHECK_IN_STATUS_START = 'START_UPDATE_CHECK_IN_STATUS_START'
export const START_UPDATE_CHECK_IN_STATUS_SUCCESS = 'START_UPDATE_CHECK_IN_STATUS_SUCCESS'
export const START_UPDATE_CHECK_IN_STATUS_FAIL = 'START_UPDATE_CHECK_IN_STATUS_FAIL'

export const updateUserCheckInStatus = (id: number) => async (dispatch: Redux.Dispatch) => {
    try{
        dispatch({type: START_UPDATE_CHECK_IN_STATUS_START})

        const result = await new Database().updateUserCheckInStatus(id);

        dispatch({type: START_UPDATE_CHECK_IN_STATUS_SUCCESS, payload: result.data.data.planning});
    } catch(error){
        dispatch({type: START_UPDATE_CHECK_IN_STATUS_FAIL, payload: false})
    }
}