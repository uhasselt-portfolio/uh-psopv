import {PLANNING_FETCH_FAIL, PLANNING_FETCH_START, PLANNING_FETCH_SUCCESS } from "./ListAction";
import {AnyAction} from "redux";


export default function (state = {}, action : AnyAction) {
    switch(action.type) {
        case PLANNING_FETCH_SUCCESS:
            return {...state, loading: false, localStorage: action.payload, errorMessage: ""}
        case PLANNING_FETCH_FAIL:
            return {...state, loading: true, localStorage: action.payload, errorMessage: ""}

        default:
            return state
    }
}