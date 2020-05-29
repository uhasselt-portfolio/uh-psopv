import {UsersActions} from "./UserAction";
import {AnyAction} from "redux";
import State, {initialState} from '../../Redux/State';

/**
 * the reducer for redux to handle all the updates comming from UserActions generated by UserPage
 * @param state the current state of the application
 * @param action the action that has been performed
 * @author Wouter Grootjans
 */
export default function (state : State = initialState, action : AnyAction) : State{
    switch(action.type) {
        case UsersActions.USERS_FETCH_START:
            return {...state, loading: true, isUsersFetched: false, errorMessage: ""}
        case UsersActions.USERS_FETCH_SUCCES:
            return {
                ...state, 
                loading: false, 
                isUsersFetched: true,
                users: action.payload,
                errorMessage: ''}
        case UsersActions.USERS_FETCH_FAIL:
            return {...state, loading: false, isUsersFetched: false, errorMessage: action.payload}
        default:
            return state
    }
}