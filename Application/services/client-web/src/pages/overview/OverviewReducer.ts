import {OverviewActions} from './OverviewAction';
import {AnyAction} from 'redux';
import State, {initialState} from '../../Redux/State';

export default function (state: State = initialState, action : AnyAction): State {
    switch(action.type) {
        case OverviewActions.OVERVIEW_FETCH_START:
            return {...state, loading: true, isOverviewFetched: false, errorMessage: ""}
        case OverviewActions.OVERVIEW_FETCH_FAIL:
            return {...state, loading: false, isOverviewFetched: false, errorMessage: action.payload}   
        case OverviewActions.OVERVIEW_PROBLEM_FETCH_SUCCES:
            return {...state, 
                    loading: false, 
                    isOverviewFetched: true,
                    problems: action.payload,
                    errorMessage: ""}
        case OverviewActions.OVERVIEW_MESSAGE_FETCH_SUCCES : 
            return {
                ...state,
                loading: false,
                isOverviewFetched: true,
                messages: action.payload,
                errorMessage: ""
            }
        case OverviewActions.OVERVIEW_FETCH_SUCCES : 
            return {
                ...state, 
                loading: false, 
                isOverviewFetched: true,
                users: action.payload.users,
                problems: action.payload.problems,
                posts: action.payload.posts, 
                errorMessage: ""
            }
        case OverviewActions.OVERVIEW_POST_NEW_MESSAGE_SUCCES : 
            return {
                ...state,
                loading: false,
                isOverviewFetched: true,
                errorMessage: ""
            }
        case OverviewActions.OVERVIEW_POST_MESSAGE_READ_SUCCES : 
            return {
                ...state,
                loading: false,
                isOverviewFetched: true,
                errorMessage: ""
            }
        default:
            return state
    }
}