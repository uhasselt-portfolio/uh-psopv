import {USERS_FROM_SHIFT_FETCH_FAIL, USERS_FROM_SHIFT_FETCH_START, USERS_FROM_SHIFT_FETCH_SUCCESS} from "./ShiftAction";
import {AnyAction} from "redux";

export default function (state = {}, action : AnyAction) {
    switch(action.type) {
        case USERS_FROM_SHIFT_FETCH_START:
            return {...state, loading: true, areUsersFromShiftFetched: false, errorMessage: ""}
        case USERS_FROM_SHIFT_FETCH_SUCCESS:
            return {...state, loading: false, areUsersFromShiftFetched: action.payload, errorMessage: ""}
        case USERS_FROM_SHIFT_FETCH_FAIL:
            return {...state, loading: false, areUsersFromShiftFetched: false, errorMessage: action.payload}
        default:
            return state
    }
}