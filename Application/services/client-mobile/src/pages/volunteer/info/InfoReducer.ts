import {PLANNING_FROM_ID_FETCH_FAIL, PLANNING_FROM_ID_FETCH_START, PLANNING_FROM_ID_FETCH_SUCCESS,
    USER_UPDATE_GEOLOCATION_SUCCESS, USER_UPDATE_GEOLOCATION_START, USER_UPDATE_GEOLOCATION_FAIL } from "./InfoAction";
import {AnyAction} from "redux";


export default function (state = {}, action : AnyAction) {
    switch(action.type) {
        case PLANNING_FROM_ID_FETCH_START:
            return {...state, loading: true, arePlanningsFromIdFetched: [], errorMessage: ""};
        case PLANNING_FROM_ID_FETCH_SUCCESS:
            return {...state, loading: false, arePlanningsFromIdFetched: action.payload, errorMessage: ""};
        case PLANNING_FROM_ID_FETCH_FAIL:
            return {...state, loading: false, arePlanningsFromIdFetched: [], errorMessage: action.payload};

        case USER_UPDATE_GEOLOCATION_START:
            return {...state, loading: true, isLocationUpdated: false, errorMessage: ""};
        case USER_UPDATE_GEOLOCATION_SUCCESS:
            console.log('Geolocation update success')
            return {...state, loading: false, isLocationUpdated: action.payload, errorMessage: ""};
        case USER_UPDATE_GEOLOCATION_FAIL:
            return {...state, loading: false, isLocationUpdated: false, errorMessage: action.payload};
        default:
            return state
    }
}