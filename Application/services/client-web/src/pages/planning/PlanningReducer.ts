import {PlanningActions} from './PlanningAction';
import {AnyAction} from "redux";
import State, {initialState} from '../../Redux/State';

export default function (state : State = initialState, action : AnyAction) : State {
    switch(action.type) {
        case PlanningActions.PLANNING_FETCH_START:
            return {...state, loading: true, isPlanningFetched: false, errorMessage: ""}
        case PlanningActions.PLANNING_FETCH_SUCCES:
            return {...state, 
                    loading: false, 
                    isPlanningFetched: true,
                    items: action.payload.items, 
                    planning: action.payload.shifts,
                    users: action.payload.users,
                    posts: action.payload.posts,
                    errorMessage: ""}
        case PlanningActions.PLANNING_FETCH_FAIL:
            return {...state, loading: false, isPlanningFetched: false, errorMessage: action.payload}
        default:
            return state
    }
}