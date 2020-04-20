import {MESSAGE_FETCH_FAIL, MESSAGE_FETCH_START, MESSAGE_FETCH_SUCCESS} from "./MessageAction";
import {AnyAction} from "redux";

export default function (state = {}, action : AnyAction) {
    switch(action.type) {
        case MESSAGE_FETCH_START:
            return {...state, loading: true, areMessagesFetched: false, errorMessage: ""}
        case MESSAGE_FETCH_SUCCESS:
            console.log("action.payload", action.payload)
            return {...state, loading: false, areMessagesFetched: action.payload, errorMessage: ""}
        case MESSAGE_FETCH_FAIL:
            return {...state, loading: false, areMessagesFetched: false, errorMessage: action.payload}
        default:
            return state
    }
}