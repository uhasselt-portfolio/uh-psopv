import {PLANNING_POST_ID_FETCH_FAIL, PLANNING_POST_ID_FETCH_SUCCESS, PLANNING_POST_ID_FETCH_START} from "./PostAction";
import {AnyAction} from "redux";

export default function (state = {}, action : AnyAction) {
    switch(action.type) {
        case PLANNING_POST_ID_FETCH_START:
            return {...state, loading: true, arePlanningsFetched: false, errorMessage: ""}
        case PLANNING_POST_ID_FETCH_SUCCESS:
            return {...state, loading: false, arePlanningsFetched: action.payload, errorMessage: ""}
        case PLANNING_POST_ID_FETCH_FAIL:
            return {...state, loading: false, arePlanningsFetched: false, errorMessage: action.payload}
        default:
            return state
    }
}