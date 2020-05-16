import {PROBLEMS_FETCH_SUCCESS,MESSAGE_TOGGLE_SEEN_FAIL, MESSAGE_TOGGLE_SEEN_START, MESSAGE_TOGGLE_SEEN_SUCCESS} from "./ProblemsAction";
import {AnyAction} from "redux";

export default function (state = {}, action : AnyAction) {
    switch(action.type) {
        case PROBLEMS_FETCH_SUCCESS:
            console.log("action.payload", action.payload)
            return {...state, loading: false, areProblemsFetched: action.payload, errorMessage: ""}
        case MESSAGE_TOGGLE_SEEN_START:
            return {...state, loading: true, toggleMessage: false, errorMessage: ""}
        case MESSAGE_TOGGLE_SEEN_SUCCESS:
            console.log("action.payload", action.payload)
            return {...state, loading: false, toggleMessage: action.payload, errorMessage: ""}
        case MESSAGE_TOGGLE_SEEN_FAIL:
            return {...state, loading: false, toggleMessage: false, errorMessage: action.payload}
        default:
            return state
    }
}