import {PostActions} from "./ProblemAction";
import {AnyAction} from "redux";
import State, {initialState} from '../../Redux/State';

export default function (state : State = initialState, action : AnyAction) : State{
    switch(action.type) {
        case PostActions.PROBLEM_FETCH_START:
            return {...state, loading: true, isProblemFetched: false, errorMessage: ""}
        case PostActions.PROBLEM_FETCH_SUCCESS:
            return {
                ...state, 
                loading: false, 
                isProblemFetched: true, 
                problems: action.payload,
                errorMessage: ''}
        case PostActions.PROBLEM_FETCH_FAIL:
            return {...state, loading: false, isProblemFetched: false, errorMessage: action.payload}
        default:
            return state
    }
}