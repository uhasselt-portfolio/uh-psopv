import {PLANNING_FETCH_FAIL, PLANNING_FETCH_START, PLANNING_FETCH_SUCCESS } from "./InfoAction";
import {AnyAction} from "redux";


export default function (state = {}, action : AnyAction) {
    switch(action.type) {
        case PLANNING_FETCH_START:
            return {...state, loading: true, arePlanningsFetched: false, errorMessage: ""}
        case PLANNING_FETCH_SUCCESS:
            return {...state, loading: false, arePlanningsFetched: action.payload, errorMessage: ""}
        case PLANNING_FETCH_FAIL:
            return {...state, loading: false, arePlanningsFetched: false, errorMessage: action.payload}
        default:
            return state
    }
}