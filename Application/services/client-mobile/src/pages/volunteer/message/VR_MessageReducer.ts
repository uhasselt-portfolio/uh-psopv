import {MESSAGE_FETCH_FAIL, MESSAGE_FETCH_START, MESSAGE_FETCH_SUCCESS, MESSAGE_TOGGLE_SEEN_FAIL, MESSAGE_TOGGLE_SEEN_START, MESSAGE_TOGGLE_SEEN_SUCCESS} from "./VR_MessageAction";
import {AnyAction} from "redux";

export default function (state = {}, action : AnyAction) {
    switch(action.type) {
        case MESSAGE_FETCH_START:
            return {...state, loading: true, areMessagesFetched: false, errorMessage: ""}
        case MESSAGE_FETCH_SUCCESS:
            return {...state, loading: false, areMessagesFetched: action.payload, errorMessage: ""}
        case MESSAGE_FETCH_FAIL:
            return {...state, loading: false, areMessagesFetched: false, errorMessage: action.payload}
        case MESSAGE_TOGGLE_SEEN_START:
            return {...state, loading: true, toggleMessage: false, errorMessage: ""}
        case MESSAGE_TOGGLE_SEEN_SUCCESS:
            return {...state, loading: false, toggleMessage: action.payload, errorMessage: ""}
        case MESSAGE_TOGGLE_SEEN_FAIL:
            return {...state, loading: false, toggleMessage: false, errorMessage: action.payload}
        default:
            return state
    }
}