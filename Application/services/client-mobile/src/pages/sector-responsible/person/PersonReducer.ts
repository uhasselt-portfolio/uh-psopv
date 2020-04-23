import {USER_FETCH_FAIL, USER_FETCH_START, USER_FETCH_SUCCESS} from "./PersonAction";
import {AnyAction} from "redux";

export default function (state = {}, action : AnyAction) {
    switch(action.type) {
        case USER_FETCH_START:
            return {...state, loading: true, isUserFetched: false, errorMessage: ""}
        case USER_FETCH_SUCCESS:
            return {...state, loading: false, isUserFetched: action.payload, errorMessage: ""}
        case USER_FETCH_FAIL:
            return {...state, loading: false, isUserFetched: false, errorMessage: action.payload}
        default:
            return state
    }
}