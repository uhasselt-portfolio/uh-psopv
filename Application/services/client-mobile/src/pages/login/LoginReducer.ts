import {USER_LOGIN_START, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS} from "./LoginAction";
import {AnyAction} from "redux";

export default function (state = {}, action : AnyAction) {
    switch(action.type) {
        case USER_LOGIN_START:
            return {...state, process: true, isUserLoggedIn: false, errorMessage: ""}
        case USER_LOGIN_SUCCESS:
            return {...state, process: false, isUserLoggedIn: true, errorMessage: ""}
        case USER_LOGIN_FAIL:
            return {...state, process: false, isUserLoggedIn: false, errorMessage: action.payload}
        default:
            return state
    }
}