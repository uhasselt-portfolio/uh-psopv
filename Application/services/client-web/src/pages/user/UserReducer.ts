import {UsersActions} from "./UserAction";
import {AnyAction} from "redux";
import State, {initialState} from '../../Redux/State';

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