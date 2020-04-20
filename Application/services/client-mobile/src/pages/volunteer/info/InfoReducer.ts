import {PLANNING_FETCH_FAIL, PLANNING_FETCH_START, PLANNING_FETCH_SUCCESS,
    USER_UPDATE_GEOLOCATION_SUCCESS, USER_UPDATE_GEOLOCATION_START, USER_UPDATE_GEOLOCATION_FAIL } from "./InfoAction";
import {AnyAction} from "redux";


export default function (state = {}, action : AnyAction) {
    switch(action.type) {
        case PLANNING_FETCH_START:
            return {...state, loading: true, arePlanningsFetched: [], errorMessage: ""};
        case PLANNING_FETCH_SUCCESS:
            return {...state, loading: false, arePlanningsFetched: action.payload, errorMessage: ""};
        case PLANNING_FETCH_FAIL:
            return {...state, loading: false, arePlanningsFetched: [], errorMessage: action.payload};
        case USER_UPDATE_GEOLOCATION_START:
            return {...state, loading: true, isLocationUpdated: false, errorMessage: ""};
        case USER_UPDATE_GEOLOCATION_SUCCESS:
            return {...state, loading: false, isLocationUpdated: action.payload, errorMessage: ""};
        case USER_UPDATE_GEOLOCATION_FAIL:
            return {...state, loading: false, isLocationUpdated: false, errorMessage: action.payload};
        default:
            return state
    }
}