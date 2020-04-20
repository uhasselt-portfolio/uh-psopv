import {MESSAGE_ADD_FAIL, MESSAGE_ADD_START, MESSAGE_ADD_SUCCESS, USER_FETCH_FAIL, USER_FETCH_START, USER_FETCH_SUCCESS} from "./SendMessageAction";
import {AnyAction} from "redux";

export default function (state = {}, action : AnyAction) {
    switch(action.type) {
        case MESSAGE_ADD_START:
            return {...state, loading: true, areMessagesSend: false, errorMessage: ""}
        case MESSAGE_ADD_SUCCESS:
            return {...state, loading: false, areMessagesSend: action.payload, errorMessage: ""}
        case MESSAGE_ADD_FAIL:
            return {...state, loading: false, areMessagesSend: false, errorMessage: action.payload}

        case USER_FETCH_START:
            return {...state, loading: true, areUsersFetched: false, errorMessage: ""}
        case USER_FETCH_SUCCESS:
            return {...state, loading: false, areUsersFetched: action.payload, errorMessage: ""}
        case USER_FETCH_FAIL:
            return {...state, loading: false, areUsersFetched: false, errorMessage: action.payload}
        default:
            return state
    }
}