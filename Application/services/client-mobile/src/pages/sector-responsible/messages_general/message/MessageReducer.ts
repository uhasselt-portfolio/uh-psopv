import {MESSAGE_LOAD_SUCCES, MESSAGE_FETCH_FAIL, MESSAGE_FETCH_START, MESSAGE_FETCH_SUCCESS, MESSAGE_TOGGLE_SEEN_FAIL, MESSAGE_TOGGLE_SEEN_START, MESSAGE_TOGGLE_SEEN_SUCCESS} from "./MessageAction";
import {AnyAction} from "redux";

export default function (state = {}, action : AnyAction) {
    switch(action.type) {
        case MESSAGE_FETCH_START:
            return {...state, loading: true, areMessagesOfIdFetched: false, errorMessage: ""}
        case MESSAGE_FETCH_SUCCESS:
            console.log(action.payload)
            return {...state, loading: false, areMessagesOfIdFetched: action.payload, errorMessage: ""}
        case MESSAGE_LOAD_SUCCES:
            return {...state, loading: false, areMessagesOfIdFetched: action.payload, errorMessage: ""}
        case MESSAGE_FETCH_FAIL:
            return {...state, loading: false, areMessagesOfIdFetched: false, errorMessage: action.payload}
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