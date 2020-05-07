import {DetailActions} from './DetailActions';
import {AnyAction} from "redux";
import State, {initialState} from '../../Redux/State';

export default function (state : State = initialState, action : AnyAction) : State {
    switch(action.type) {
        case DetailActions.DETAIL_PLANNING_FETCH_START:
            return {...state, loading: true, isPlanningFetched: false, errorMessage: ""}
        case DetailActions.DETAIL_PLANNING_FETCH_SUCCES:
            return {...state, 
                    loading: false, 
                    isPlanningFetched: true,
                    planning: action.payload.shifts,
                    items: action.payload.items,
                    errorMessage: ""}
        case DetailActions.DETAIL_PLANNING_FETCH_FAIL:
            return {...state, loading: false, isPlanningFetched: false, errorMessage: action.payload}
        default:
            return state
    }
}