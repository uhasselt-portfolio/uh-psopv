import {USERS_FETCH_SUCCESS} from "./ContactAction";
import {AnyAction} from "redux";

export default function (state = {}, action : AnyAction) {
    switch(action.type) {
        case USERS_FETCH_SUCCESS:
            return {...state, loading: false, areUsersFetched: action.payload, errorMessage: ""}
        default:
            return state
    }
}