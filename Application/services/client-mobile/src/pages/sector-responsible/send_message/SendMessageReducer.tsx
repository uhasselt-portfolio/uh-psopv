import {MESSAGE_ADD_FAIL, USERS_FETCH_SUCCESS, MESSAGE_ADD_SUCCESS} from "./SendMessageAction";
import {AnyAction} from "redux";

export default function (state = {}, action : AnyAction) {
    switch(action.type) {
        case MESSAGE_ADD_SUCCESS:
            return {...state, loading: false, areMessagesSend: action.payload, errorMessage: ""}
        case MESSAGE_ADD_FAIL:
            return {...state, loading: false, areMessagesSend: false, errorMessage: action.payload}
        case USERS_FETCH_SUCCESS:
            return {...state, loading: false, areUsersFetched: action.payload, errorMessage: ""}
        default:
            return state
    }
}