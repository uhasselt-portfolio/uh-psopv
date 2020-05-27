import {ADD_PROBLEM_SUCCESS, REMOVE_PROBLEM_SUCCESS,
    POST_FETCH_PLANNING_FAIL, POST_FETCH_PLANNING_START, POST_FETCH_PLANNING_SUCCESS, ITEM_TOGGLE_SUCCESS, PROBLEM_TOGGLE_SUCCESS} from "./PostAction";
import {AnyAction} from "redux";

import { toggle } from "ionicons/icons";


export default function (state = {}, action : AnyAction) {
    switch(action.type) {
        case POST_FETCH_PLANNING_START:
            return {...state, loading: true, arePlanningsFormPostFetched: false, errorMessage: ""}
        case POST_FETCH_PLANNING_SUCCESS:
            return {...state, loading: false, localStorage: action.payload, errorMessage: ""}
        case POST_FETCH_PLANNING_FAIL:
            return {...state, loading: false, arePlanningsFormPostFetched: false, errorMessage: action.payload}
        case ITEM_TOGGLE_SUCCESS:
            return {...state, localStorage: action.payload, loading: false, errorMessage: ""}
        case PROBLEM_TOGGLE_SUCCESS:
            return {...state, localStorage: action.payload, loading: false, errorMessage: ""}
        case ADD_PROBLEM_SUCCESS:
            return {...state, localStorage: action.payload, loading: false, errorMessage: ""}
        case REMOVE_PROBLEM_SUCCESS:
            return {...state, localStorage: action.payload, loading: false, errorMessage: ""}

        default:
            return state
    }
}