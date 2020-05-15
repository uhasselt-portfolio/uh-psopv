import {USER_LOGIN_START, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS,
USER_EXISTS_START, USER_EXISTS_SUCCESS, USER_EXISTS_FAIL} from "./LoginAction";
import {AnyAction} from "redux";

export default function (state = {}, action : AnyAction) {
    switch(action.type) {
        case USER_LOGIN_START:
            return {...state, process: true, isUserLoggedIn: false, errorMessage: ""}
        case USER_LOGIN_SUCCESS:
            return {...state, process: false, isUserLoggedIn: action.payload, errorMessage: ""}
        case USER_LOGIN_FAIL:
            return {...state, process: false, isUserLoggedIn: false, errorMessage: action.payload}
        case USER_EXISTS_START:
            return {...state, process: true, doesUserExist: null, errorMessage: ""}
        case USER_EXISTS_SUCCESS:
            return {...state, process: false, doesUserExist: action.payload, errorMessage: ""}
        case USER_EXISTS_FAIL:
            return {...state, process: false, doesUserExist: false, errorMessage: action.payload}
        default:
            return state
    }
}