import {PLANNING_FETCH_FAIL, PLANNING_FETCH_START, PLANNING_FETCH_SUCCESS } from "./ListAction";
import {AnyAction} from "redux";

export default function (state = {}, action : AnyAction) {
    switch(action.type) {
        case PLANNING_FETCH_START:
            return {...state, loading: true, arePostsFetched: false, errorMessage: ""}
        case PLANNING_FETCH_SUCCESS:
            return {...state, loading: false, arePostsFetched: action.payload, errorMessage: ""}
        case PLANNING_FETCH_FAIL:
            return {...state, loading: false, arePostsFetched: false, errorMessage: action.payload}
        default:
            return state
    }
}