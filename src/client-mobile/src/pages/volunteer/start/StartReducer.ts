import {
    START_CHECK_USER_IN_POST_FAIL,
    START_CHECK_USER_IN_POST_START,
    START_CHECK_USER_IN_POST_SUCCESS,
    START_FETCH_ACTIVE_PLANNING_FAIL,
    START_FETCH_ACTIVE_PLANNING_START,
    START_FETCH_ACTIVE_PLANNING_SUCCESS,
    START_FETCH_USER_PLANNINGS_FAIL,
    START_FETCH_USER_PLANNINGS_START,
    START_FETCH_USER_PLANNINGS_SUCCESS,
    START_REPORT_USER_FAIL,
    START_REPORT_USER_START,
    START_REPORT_USER_SUCCESS,
    START_UPDATE_CHECK_IN_STATUS_FAIL,
    START_UPDATE_CHECK_IN_STATUS_START,
    START_UPDATE_CHECK_IN_STATUS_SUCCESS
} from "./StartAction";
import {AnyAction} from "redux";

export default function (state = {}, action : AnyAction) {
    switch(action.type) {
        case START_FETCH_ACTIVE_PLANNING_START:
            return {...state, loading: true, isActivePlanningFetched: undefined, errorMessage: ""}
        case START_FETCH_ACTIVE_PLANNING_SUCCESS:
            return {...state, loading: false, isActivePlanningFetched: action.payload, errorMessage: ""}
        case START_FETCH_ACTIVE_PLANNING_FAIL:
            return {...state, loading: false, isActivePlanningFetched: false, errorMessage: action.payload}

        case START_UPDATE_CHECK_IN_STATUS_START:
            return {...state, loading: true, errorMessage: ""}
        case START_UPDATE_CHECK_IN_STATUS_SUCCESS:
            return {...state, loading: false, isCheckInStatusUpdated: action.payload, errorMessage: ""}
        case START_UPDATE_CHECK_IN_STATUS_FAIL:
            return {...state, loading: false, isCheckInStatusUpdated: false, errorMessage: action.payload}

        case START_CHECK_USER_IN_POST_START:
            return {...state, loading: true, errorMessage: ""}
        case START_CHECK_USER_IN_POST_SUCCESS:
            return {...state, loading: false, isUserOnPost: action.payload, errorMessage: ""}
        case START_CHECK_USER_IN_POST_FAIL:
            return {...state, loading: false, isUserOnPost: false, errorMessage: action.payload}

        case START_REPORT_USER_START:
            return {...state, loading: true, errorMessage: ""}
        case START_REPORT_USER_SUCCESS:
            return {...state, loading: false, isUserReported: action.payload, errorMessage: ""}
        case START_REPORT_USER_FAIL:
            return {...state, loading: false, isUserReported: false, errorMessage: action.payload}

        case START_FETCH_USER_PLANNINGS_START:
            return {...state, loading: true, errorMessage: ""}
        case START_FETCH_USER_PLANNINGS_SUCCESS:
            return {...state, loading: false, isUserPlanningFetched: action.payload, errorMessage: ""}
        case START_FETCH_USER_PLANNINGS_FAIL:
            return {...state, loading: false, isUserPlanningFetched: false, errorMessage: action.payload}
        default:
            return state
    }
}