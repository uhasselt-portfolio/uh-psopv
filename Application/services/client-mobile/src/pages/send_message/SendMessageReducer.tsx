import {MESSAGE_ADD_FAIL, MESSAGE_ADD_START, MESSAGE_ADD_SUCCESS} from "./SendMessageAction";
import {AnyAction} from "redux";

export default function (state = {}, action : AnyAction) {
    switch(action.type) {
        case MESSAGE_ADD_START:
            return {...state, loading: true, areMessagesSend: false, errorMessage: ""}
        case MESSAGE_ADD_SUCCESS:
            console.log("action.payload", action.payload)
            return {...state, loading: false, areMessagesSend: action.payload, errorMessage: ""}
        case MESSAGE_ADD_FAIL:
            return {...state, loading: false, areMessagesSend: false, errorMessage: action.payload}
        default:
            return state
    }
}