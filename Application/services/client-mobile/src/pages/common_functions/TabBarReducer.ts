import {MESSAGES_AMOUNT_FETCH_SUCCESS} from "./TabBarAction";
import {AnyAction} from "redux";

export default function (state = {}, action : AnyAction) {
    switch(action.type) {
        case MESSAGES_AMOUNT_FETCH_SUCCESS:
            return {...state, loading: true, isAmountFetched: action.payload, errorMessage: ""}
        default:
            return state
    }
}