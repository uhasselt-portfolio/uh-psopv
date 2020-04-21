import {POST_FETCH_PLANNING_FAIL, POST_FETCH_PLANNING_START, POST_FETCH_PLANNING_SUCCESS} from "./PostAction";
import {AnyAction} from "redux";

export default function (state = {}, action : AnyAction) {
    switch(action.type) {
        case POST_FETCH_PLANNING_START:
            return {...state, loading: true, arePlanningsFormPostFetched: false, errorMessage: ""}
        case POST_FETCH_PLANNING_SUCCESS:
            return {...state, loading: false, arePlanningsFormPostFetched: action.payload, errorMessage: ""}
        case POST_FETCH_PLANNING_FAIL:
            return {...state, loading: false, arePlanningsFormPostFetched: false, errorMessage: action.payload}
        default:
            return state
    }
}