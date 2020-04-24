import {USERS_FETCH_FAIL, USERS_FETCH_START, USERS_FETCH_SUCCESS} from "./ContactAction";
import {AnyAction} from "redux";

export default function (state = {}, action : AnyAction) {
    switch(action.type) {
        case USERS_FETCH_START:
            return {...state, loading: true, areUsersFetched: false, errorMessage: ""}
        case USERS_FETCH_SUCCESS:
            return {...state, loading: false, areUsersFetched: action.payload, errorMessage: ""}
        case USERS_FETCH_FAIL:
            return {...state, loading: false, areUsersFetched: false, errorMessage: action.payload}
        default:
            return state
    }
}