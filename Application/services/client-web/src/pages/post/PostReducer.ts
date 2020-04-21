import {PostActions} from './PostAction';
import {AnyAction} from "redux";
import State, {initialState} from '../../Redux/State';

export default function (state : State = initialState, action : AnyAction) : State {
    switch(action.type) {
        case PostActions.POST_FETCH_START:
            return {...state, loading: true, isPostFetched: false, errorMessage: ""}
        case PostActions.POST_FETCH_SUCCES:
            return {...state, 
                    loading: false, 
                    isPostFetched: true,
                    posts: action.payload,
                    errorMessage: ""}
        case PostActions.POST_FETCH_FAIL:
            return {...state, loading: false, isPostFetched: false, errorMessage: action.payload}
        default:
            return state
    }
}