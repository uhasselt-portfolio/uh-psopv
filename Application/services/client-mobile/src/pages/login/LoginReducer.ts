import {USER_LOGIN_START, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS,
USER_EXISTS_START, USER_EXISTS_SUCCESS, USER_EXISTS_FAIL,
USER_LOGOUT_SUCCESS} from "./LoginAction";
import {AnyAction} from "redux";

export default function (state = {}, action : AnyAction) {
    switch(action.type) {
        case USER_LOGIN_START:
            return {...state, process: true, isUserLoggedIn: false, errorMessage: ""}
        case USER_LOGIN_SUCCESS:
            console.log("LOGIN SUCCESS" , action.payload);
            return {...state, process: false, isUserLoggedIn: action.payload, errorMessage: ""}
        case USER_LOGIN_FAIL:
            return {...state, process: false, isUserLoggedIn: false, errorMessage: action.payload}
        case USER_EXISTS_START:
            return {...state, process: true, doesUserExist: undefined, errorMessage: ""}
        case USER_EXISTS_SUCCESS:
            return {...state, process: false, doesUserExist: action.payload, errorMessage: ""}
        case USER_EXISTS_FAIL:
            return {...state, process: false, doesUserExist: null, errorMessage: action.payload}
        case USER_LOGOUT_SUCCESS:
            return {... state, process: false, isUserLoggedIn: false, errorMessage: ""}
        default:
            return state
    }
}