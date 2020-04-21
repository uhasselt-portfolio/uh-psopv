import {MapActions} from './MapAction';
import {AnyAction} from "redux";
import State, {initialState} from '../../Redux/State';

export default function (state : State = initialState, action : AnyAction) : State {
    switch(action.type) {
        case MapActions.MAP_FETCH_START:
            return {...state, loading: true, isMapFetched: false, errorMessage: ""}
        case MapActions.MAP_FETCH_SUCCES:
            return {...state, 
                    loading: false, 
                    isMapFetched: true,
                    users: action.payload.users,
                    problems: action.payload.problems,
                    posts: action.payload.posts, 
                    errorMessage: ""}
        case MapActions.MAP_FETCH_FAIL:
            return {...state, loading: false, isMapFetched: false, errorMessage: action.payload}
        default:
            return state
    }
}