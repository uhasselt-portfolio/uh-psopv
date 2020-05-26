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

        const result = await new Database().toggleUserCheckInStatus(id);

        dispatch({type: START_UPDATE_CHECK_IN_STATUS_SUCCESS, payload: result.data.data.planning});
    } catch(error){
        dispatch({type: START_UPDATE_CHECK_IN_STATUS_FAIL, payload: false})
    }
}

export const START_CHECK_USER_IN_POST_START = 'START_CHECK_USER_IN_POST_START'
export const START_CHECK_USER_IN_POST_SUCCESS = 'START_CHECK_USER_IN_POST_SUCCESS'
export const START_CHECK_USER_IN_POST_FAIL = 'START_CHECK_USER_IN_POST_FAIL'

export const checkIfUserInPost = (id: number) => async (dispatch: Redux.Dispatch) => {
    try{
        dispatch({type: START_CHECK_USER_IN_POST_START})

        const result = await new Database().toggleUserCheckInStatus(id);

        dispatch({type: START_CHECK_USER_IN_POST_SUCCESS, payload: result.data.data.isUserOnPost});
    } catch(error){
        dispatch({type: START_CHECK_USER_IN_POST_FAIL, payload: false})
    }
}

export const START_REPORT_USER_START = 'START_REPORT_USER_START'
export const START_REPORT_USER_SUCCESS = 'START_REPORT_USER_SUCCESS'
export const START_REPORT_USER_FAIL = 'START_REPORT_USER_FAIL'

export const reportUserNotInPost = (id: number) => async (dispatch: Redux.Dispatch) => {
    try{
        dispatch({type: START_REPORT_USER_START})

        const result = await new Database().reportUser(id);

        dispatch({type: START_REPORT_USER_SUCCESS, payload: result.data.data.problem});
    } catch(error){
        dispatch({type: START_REPORT_USER_FAIL, payload: false})
    }
}