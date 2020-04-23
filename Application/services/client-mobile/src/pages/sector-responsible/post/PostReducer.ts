import {POST_FETCH_PLANNING_FAIL, POST_FETCH_PLANNING_START, POST_FETCH_PLANNING_SUCCESS, ITEM_TOGGLE_FAIL, ITEM_TOGGLE_SUCCESS, ITEM_TOGGLE_START,
PROBLEM_TOGGLE_FAIL, PROBLEM_TOGGLE_START, PROBLEM_TOGGLE_SUCCESS} from "./PostAction";
import {AnyAction} from "redux";

export default function (state = {}, action : AnyAction) {
    switch(action.type) {
        case POST_FETCH_PLANNING_START:
            return {...state, loading: true, arePlanningsFormPostFetched: false, errorMessage: ""}
        case POST_FETCH_PLANNING_SUCCESS:
            return {...state, loading: false, arePlanningsFormPostFetched: action.payload, errorMessage: ""}
        case POST_FETCH_PLANNING_FAIL:
            return {...state, loading: false, arePlanningsFormPostFetched: false, errorMessage: action.payload}
        
        case ITEM_TOGGLE_START:
            return {...state, loading: true, isItemToggled: false, errorMessage: ""}
        case ITEM_TOGGLE_SUCCESS:
            return {...state, loading: false, isItemToggled: action.payload, errorMessage: ""}
        case ITEM_TOGGLE_FAIL:
            return {...state, loading: false, isItemToggled: false, errorMessage: action.payload}

        case PROBLEM_TOGGLE_START:
            return {...state, loading: true, isProblemToggled: false, errorMessage: ""}
        case PROBLEM_TOGGLE_SUCCESS:
            return {...state, loading: false, isProblemToggled: action.payload, errorMessage: ""}
        case PROBLEM_TOGGLE_FAIL:
            return {...state, loading: false, isProblemToggled: false, errorMessage: action.payload}
        default:
            return state
    }
}